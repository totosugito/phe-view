import * as XLSX from "xlsx";
import {excelDateToDateObject} from "src/utils/utils-excel.js";
import {movingAverage} from "shared/utils/smoothing.js";

function areaSummary(data) {
  // Initialize an empty object to store the summary
  const aggregatedSummary = {};

  // Iterate through each entry in the data
  data.forEach(entry => {
    const { summary } = entry;

    // Iterate through each key in the summary
    Object.keys(summary).forEach(key => {
      // If the key is not already in the aggregated summary, initialize it
      if (!aggregatedSummary[key]) {
        aggregatedSummary[key] = {
          sum: 0,
          count: 0,
          valid: 0,
          min: Infinity,
          max: -Infinity
        };
      }

      // Aggregate the values for this key
      aggregatedSummary[key].sum += summary[key].sum;
      aggregatedSummary[key].count += summary[key].count;
      aggregatedSummary[key].valid += summary[key].valid;
      aggregatedSummary[key].min = Math.min(aggregatedSummary[key].min, summary[key].min);
      aggregatedSummary[key].max = Math.max(aggregatedSummary[key].max, summary[key].max);
    });
  });

  // Calculate the averages for each key
  Object.keys(aggregatedSummary).forEach(key => {
    const { sum, valid } = aggregatedSummary[key];
    aggregatedSummary[key].avg = valid > 0 ? sum / valid : 0;
  });

  return aggregatedSummary;
}


function areaGroupAndSummarize(data) {
  // Group data by area
  const groupedByArea = data.reduce((acc, entry) => {
    const { area, summary } = entry;

    if (!acc[area]) {
      acc[area] = {
        area,
        count: 1,
        summary: {}
      };
    } else {
      acc[area].count += 1;
    }

    // Merge summary for keys "3" to "11"
    for (const key in summary) {
      if (!acc[area].summary[key]) {
        acc[area].summary[key] = {
          sum: 0,
          count: 0,
          valid: 0,
          min: Infinity,
          max: -Infinity
        };
      }

      acc[area].summary[key].sum += summary[key].sum;
      acc[area].summary[key].count += summary[key].count;
      acc[area].summary[key].valid += summary[key].valid;
      acc[area].summary[key].min = Math.min(acc[area].summary[key].min, summary[key].min);
      acc[area].summary[key].max = Math.max(acc[area].summary[key].max, summary[key].max);
    }

    return acc;
  }, {});

  // Finalize summary: calculate averages and convert to array format
  return Object.values(groupedByArea).map(areaSummary => {
    for (const key in areaSummary.summary) {
      const { sum, valid } = areaSummary.summary[key];
      areaSummary.summary[key].avg = valid > 0 ? sum / valid : 0;
    }
    return areaSummary;
  });
}

function wellGroupAndSummarize(data, parentIndex, groupIndex, startCol, endCol) {
  // Group the data by the specified column
  const groupedData = data.reduce((acc, row, index) => {
    const name = row[groupIndex]; // Group key
    if (!acc[name]) {
      acc[name] = { rows: [], start: index, end: index };
    }
    acc[name].area = row[parentIndex];
    acc[name].rows.push(row);
    acc[name].end = index; // Update the end index
    return acc;
  }, {});

  // Generate the summary for each group
  const results = Object.keys(groupedData).map(name => {
    const group = groupedData[name];
    const summary = {};

    for (let col = startCol; col <= endCol; col++) {
      const values = group.rows.map(row => row[col]).filter(value => value !== null && value !== undefined);
      const colNameId = col.toString();
      summary[colNameId] = {
        sum: values.reduce((sum, val) => sum + val, 0),
        count: group.rows.length,
        valid: values.length,
        min: values.length > 0 ? Math.min(...values) : 0,
        max: values.length > 0 ? Math.max(...values) : 0,
        avg: values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
      };
    }

    return {
      well: name,
      area: group.area,
      start: group.start,
      end: group.end,
      summary
    };
  });
  return(results)
}

function filterTopBySummary(data, count) {
  // Collect all unique keys from all summaries
  const allKeys = [...new Set(data.flatMap(entry => Object.keys(entry.summary)))];

  // Prepare result object
  const result = {};

  // Process each key
  allKeys.forEach(key => {
    // Filter and sort entries by the current key's `max` value
    result[key] = data
      .filter(entry => entry.summary[key]) // Ensure the key exists
      .sort((a, b) => b.summary[key].max - a.summary[key].max) // Sort by max descending
      .slice(0, count) // Take top 5
      .map(entry => ({
        ...entry,
        summary: entry.summary[key] // Include only the current key in summary
      })); // Assign the top 5 to the result for the current key
  });

  return result;
}

/**
 * Groups data by date and sums the values of the "2" property.
 * @param {Array} data - The input array of objects.
 * @returns {Array} - The grouped data array with total sums per date.
 */
function computeTotalDaily(data) {
  let compute_ = Object.values(
      data.reduce((acc, item) => {
        const date = item["1"];
        const dateKey = date.toISOString().split("T")[0]; // Extract the date (YYYY-MM-DD)

        if (!acc[dateKey]) {
          acc[dateKey] = { "1": date, "3": 0 }; // actual oil
        }

        if(item["3"]) {
          acc[dateKey]["3"] += item["3"];
        }
        return acc;
      }, {})
  );

  let total3 = [];
  for (let i = 0; i < compute_.length; i++) {
    let item = compute_[i];
    total3.push(item["3"]);
  }
  const total3_sma7 = movingAverage(total3, 7);
  const total3_sma30 = movingAverage(total3, 30);

  let result = [];
  for (let i = 0; i < compute_.length; i++) {
    let item = compute_[i];
    item["3-sma7"] = total3_sma7[i];  // actual oil SMA7
    item["3-sma30"] = total3_sma30[i];  // actual oil SMA30
    result.push(item);
  }
  return result;
}

self.onmessage = function (e) {
  const {fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd} = e.data;

  try {
    // Parse the Excel file
    const workbook = XLSX.read(fileContent, {type: "binary"});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Extract data manually without sheet_to_json
    const range = XLSX.utils.decode_range(sheet["!ref"]); // Get the range of the sheet
    const rowStart = Math.max(range.s.r, xlsxRowStart); // Start row
    const rowEnd = Math.min(range.e.r, xlsxRowEnd); // End row
    const colStart = Math.min(range.s.c, xlsxColStart); // Start column
    const colEnd = Math.min(range.e.c, xlsxColEnd); // End column

    // get columns data
    let columns = [];
    for (let col = colStart; col <= colEnd; col++) {
      const cellAddress = XLSX.utils.encode_cell({r: rowStart - 1, c: col});
      const cell = sheet[cellAddress];
      columns.push({id: col.toString(), label: cell ? cell.v.trim() : ""}); // Get cell value or empty string
    }

    // get the data
    const jsonData = [];
    for (let row = rowStart; row <= rowEnd; row++) {
      const rowData = {};
      let iCol = 0
      for (let col = colStart; col <= colEnd; col++) {
        const cellAddress = XLSX.utils.encode_cell({r: row, c: col});
        const cell = sheet[cellAddress];

        let v;
        if (iCol === 1) {
          v = excelDateToDateObject(cell ? cell.v : 0)
        } else {
          v = cell ? cell.v : undefined
        }
        rowData[col.toString()] = v; // Get cell value or empty string

        iCol += 1;
      }

      // skip the data when AREA is empty
      if (rowData["0"] === undefined) {
        continue;
      }

      jsonData.push(rowData);
    }

    // ------------ create well summary ------------
    const parentIndex = 0; // Area Name
    const groupIndex = 2; // Well Name
    const startCol = 3; // Start column for summary
    const endCol = 11; // End column for summary
    const wellSummary = wellGroupAndSummarize(jsonData, parentIndex, groupIndex, startCol, endCol);
    const areas = areaGroupAndSummarize(wellSummary);
    const areasSummary = areaSummary(areas);
    const topData = filterTopBySummary(wellSummary, 5);
    const totalDaily = computeTotalDaily(jsonData);

    // ------------ create area summary ------------
    const obj = {
      columns: columns,
      areas: {
        data: areas,
        summary: areasSummary
      },
      wells: wellSummary,
      tops: topData,
      totalDaily: totalDaily
    }
    // console.log(obj)

    // Send the parsed data back to the main thread
    self.postMessage({status: "success", data: {data: jsonData, summary: obj}});
  } catch (error) {
    console.log("error")
    self.postMessage({status: "error", error: error.message});
  }
};
