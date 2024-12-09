import * as XLSX from "xlsx";
import {excelDateToJSDate} from "src/utils/MyUtils.js";

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
                    v = excelDateToJSDate(cell ? cell.v : 0)
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
        // ------------ create area summary ------------
        const obj = {
            columns: columns,
            // areas: {
            //     data: areas,
            //     summary: areasSummary
            // },
            // wells: wellSummary,
            // tops: topData
        }

        // Send the parsed data back to the main thread
        self.postMessage({status: "success", data: {data: jsonData, summary: obj}});
    } catch (error) {
        console.log("error")
        self.postMessage({status: "error", error: error.message});
    }
}