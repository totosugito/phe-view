export const fillGeojsonDataWithSummary = (geoPoints, summary, idxData, idxSma7, idxSma30) => {
  let result = []

  for (let i = 0; i < geoPoints.length; i++) {
    let geoPoint = geoPoints[i];
    let summaryData = summary.data[geoPoint.name];
    if(summaryData) {
      geoPoint.rate = summaryData.rate;
      geoPoint.trend = summaryData.trend;
      geoPoint.data = summaryData.rows[idxData];
      geoPoint.sma7 = summaryData.rows[idxSma7];
      geoPoint.sma30 = summaryData.rows[idxSma30];

      result.push(geoPoint);
    }
  }

  return result;
}

export const computeDataSummary = (data, colIndex, colValue, idxData, idxSma7, idxSma30) => {
  // --------------------------------------------------------------------------------
  // 1. find the data for the given filter
  // --------------------------------------------------------------------------------
  let dataFound = {}
  for (let key in data) {
    let rows = data[key].rows;

    const firstRow = rows.find(row => {
      const rowDate = row[colIndex]; // extract the date from the row

      // Compare only the date part
      return rowDate.toDateString() === colValue.toDateString();
    });

    if(firstRow) {
      dataFound[key] = firstRow;
    }
  }

  // --------------------------------------------------------------------------------
  // 2. compute min and max data
  // --------------------------------------------------------------------------------
  let min_ = {
    "data": 1e+10,  // daily actual oil losses
    "sma7": 1e+10,  // daily actual oil losses SMA7
    "sma30": 1e+10,  // daily actual oil losses SMA30
  }
  let max_ = {
    "data": 0,
    "sma7": 0,
    "sma30": 0,
  }

  for (let key in dataFound) {
    let row = dataFound[key];

    min_["data"] = Math.min(min_["data"], (row[idxData] !== undefined) ? row[idxData] : 1e+10);
    min_["sma7"] = Math.min(min_["sma7"], (row[idxSma7] !== undefined) ? row[idxSma7] : 1e+10);
    min_["sma30"] = Math.min(min_["sma30"], (row[idxSma30] !== undefined) ? row[idxSma30] : 1e+10);

    max_["data"] = Math.max(max_["data"], (row[idxData] !== undefined) ? row[idxData] : 0);
    max_["sma7"] = Math.max(max_["sma7"], (row[idxSma7] !== undefined) ? row[idxSma7] : 0);
    max_["sma30"] = Math.max(max_["sma30"], (row[idxSma30] !== undefined) ? row[idxSma30] : 0);
  }

  // --------------------------------------------------------------------------------
  // 3. compute the summary
  // --------------------------------------------------------------------------------
  let summary = {};
  let deltaData = (max_["data"] - min_["data"]) / 4.0;
  for (let key in dataFound) {
    let rows = dataFound[key];

    // compute rate
    let rate = 0;
    let curPd = rows[idxData] - min_["data"];
    if(rows[idxData] ===0) {
      rate = 4;
    }
    else {
      if (curPd < deltaData) {
        rate = 0;
      } else if (curPd < deltaData * 2) {
        rate = 1;
      } else if (curPd < deltaData * 3) {
        rate = 2;
      } else {
        rate = 3;
      }
    }
    // console.log(deltaData, min_["data"], max_["data"], key, rows[idxData], curPd, rate)

    // compute trend
    let trend = 0;
    let pd = rows[idxData];
    let sma7 = rows[idxSma7];
    let sma30 = rows[idxSma30];
    if((sma7 > sma30) && (pd > sma7)) {
      trend = 3;
    }
    else if((sma7 > sma30) && (pd < sma7)) {
      trend = 2;
    }
    else if((sma7 < sma30) && (pd > sma7)) {
      trend = 1;
    }
    else {
      trend = 0;
    }
    summary[key] = {
      rows: rows,
      rate: rate,
      trend: trend,
    }
  }

  return {
    data: summary,
    min: min_,
    max: max_,
  };
}