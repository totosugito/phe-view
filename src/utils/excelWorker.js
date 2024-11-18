import * as XLSX from "xlsx";
import {excelDateToJSDate} from "./utils.js";

function groupAndSummarize(data, parentIndex, groupIndex, startCol, endCol) {
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
  return Object.keys(groupedData).map(name => {
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
      const rowData = [];
      let iCol = 0
      for (let col = colStart; col <= colEnd; col++) {
        const cellAddress = XLSX.utils.encode_cell({r: row, c: col});
        const cell = sheet[cellAddress];

        let v;
        if (iCol === 1) {
          v = excelDateToJSDate(cell ? cell.v : 0)
        } else {
          v = cell ? cell.v : undefined
        }
        rowData.push(v); // Get cell value or empty string

        iCol += 1;
      }

      // skip the data when AREA is empty
      if (rowData[0] === undefined) {
        continue;
      }

      jsonData.push(rowData);
    }

    // ------------ create well summary ------------
    const parentIndex = 0; // Area Name
    const groupIndex = 2; // Well Name
    const startCol = 3; // Start column for summary
    const endCol = 11; // End column for summary
    const wellSummary = groupAndSummarize(jsonData, parentIndex, groupIndex, startCol, endCol);

    // ------------ create area summary ------------

    const obj = {
      columns: columns,
      area: [],
      well: wellSummary,
      stats: {}
    }
    console.log(jsonData)
    console.log(obj)

    // Send the parsed data back to the main thread
    self.postMessage({status: "success", data: jsonData});
  } catch (error) {
    console.log("errror")
    self.postMessage({status: "error", error: error.message});
  }
};
