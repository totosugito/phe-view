import * as XLSX from "xlsx";
import {createObjectListFromMap, excelDateToDateObject, excelsCreateGroups} from "src/utils/utils-excel.js";
import {movingAverage} from "shared/utils/smoothing.js";

const computePlatformsData = (data) => {
    for (let key in data) {
        let rows = data[key].rows;
        let rowsCount = data[key].count;

        let daily_actual_oil_losses = [];
        for (let i = 0; i < rowsCount; i++) {
            let row = rows[i];
            row[7] = row[4] / row[2] * 24; // daily actual oil losses

            daily_actual_oil_losses.push(row[7]);
        }
        const daily_actual_oil_losses_sma7 = movingAverage(daily_actual_oil_losses, 7);
        const daily_actual_oil_losses_sma30 = movingAverage(daily_actual_oil_losses, 30);

        // fill the data
        for (let i = 0; i < rowsCount; i++) {
            let row = rows[i];
            row[8] = daily_actual_oil_losses_sma7[i];  // daily actual oil losses SMA7
            row[9] = daily_actual_oil_losses_sma30[i];  // daily actual oil losses SMA30
        }
    }
    return data;
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

            // skip the data when platform name is empty
            if (rowData["0"] === undefined) {
                continue;
            }

            jsonData.push(rowData);
        }

        let platforms = excelsCreateGroups(jsonData, 0);  // grouping data by platform
        const keys = createObjectListFromMap(platforms); // create list of keys from platforms list.
        platforms = computePlatformsData(platforms);

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