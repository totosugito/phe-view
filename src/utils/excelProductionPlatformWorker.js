import * as XLSX from "xlsx";
import {createObjectListFromMap, excelDateToDateObject, excelsCreateGroups} from "src/utils/utils-excel.js";
import {movingAverage} from "src/utils/smoothing.js";

const computePlatformsData = (data, idxData, idxSma7, idxSma30) => {
    for (let key in data) {
        let rows = data[key].rows;
        let rowsCount = data[key].count;

        let actual_oil = [];
        for (let i = 0; i < rowsCount; i++) {
            let row = rows[i];
            // if(!row[idxData]) {
            //     continue;
            // }
            actual_oil.push(row[idxData]);
        }
        const actual_oil_sma7 = movingAverage(actual_oil, 7);
        const actual_oil_sma30 = movingAverage(actual_oil, 30);

        // fill the data
        for (let i = 0; i < rowsCount; i++) {
            let row = rows[i];
            row[idxSma7] = actual_oil_sma7[i];  // actual oil SMA7
            row[idxSma30] = actual_oil_sma30[i];  // actual oil SMA30
        }
    }
    return data;
}

self.onmessage = function (e) {
    const {fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd, idxData, idxSma7, idxSma30} = e.data;

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

            // skip the data when platform name is empty
            if (rowData["0"] === undefined) {
                continue;
            }

            jsonData.push(rowData);
        }

        let platforms = excelsCreateGroups(jsonData, 0);  // grouping data by platform
        const keys = createObjectListFromMap(platforms); // create list of keys from platforms list.
        platforms = computePlatformsData(platforms, idxData, idxSma7, idxSma30);

        // ------------ create data summary ------------
        const obj = {
            columns: columns,
            groups: platforms,
            summary: {
                keys: keys,
                total: jsonData.length,
            }
        }
        // console.log(obj)

        // Send the parsed data back to the main thread
        self.postMessage({status: true, data: obj});
    } catch (error) {
        console.log("error")
        self.postMessage({status: false, error: error.message});
    }
}