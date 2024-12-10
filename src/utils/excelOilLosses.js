export const fillGeojsonDataWithSummary = (geoPoints, summary) => {
  let result = []

  for (let i = 0; i < geoPoints.length; i++) {
    let geoPoint = geoPoints[i];
    let summaryData = summary.data[geoPoint.name];
    if(summaryData) {
      geoPoint.rate = summaryData.rate;
      geoPoint.trend = summaryData.trend;
      geoPoint.daily_actual_oil_losses = summaryData.rows[7];
      geoPoint.daily_actual_oil_losses_sma7 = summaryData.rows[8];
      geoPoint.daily_actual_oil_losses_sma30 = summaryData.rows[9];

      result.push(geoPoint);
    }
  }

  return result;
}

export const computeDataSummary = (data, colIndex, colValue) => {
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
    "daily_actual_oil_losses": 1e+10,  // daily actual oil losses
    "daily_actual_oil_losses_sma7": 1e+10,  // daily actual oil losses SMA7
    "daily_actual_oil_losses_sma30": 1e+10,  // daily actual oil losses SMA30
  }
  let max_ = {
    "daily_actual_oil_losses": 0,
    "daily_actual_oil_losses_sma7": 0,
    "daily_actual_oil_losses_sma30": 0,
  }

  for (let key in dataFound) {
    let row = dataFound[key];

    min_["daily_actual_oil_losses"] = Math.min(min_["daily_actual_oil_losses"], row[7]);
    min_["daily_actual_oil_losses_sma7"] = Math.min(min_["daily_actual_oil_losses_sma7"], row[8]);
    min_["daily_actual_oil_losses_sma30"] = Math.min(min_["daily_actual_oil_losses_sma30"], row[9]);

    max_["daily_actual_oil_losses"] = Math.max(max_["daily_actual_oil_losses"], row[7]);
    max_["daily_actual_oil_losses_sma7"] = Math.max(max_["daily_actual_oil_losses_sma7"], row[8]);
    max_["daily_actual_oil_losses_sma30"] = Math.max(max_["daily_actual_oil_losses_sma30"], row[9]);
  }

  // --------------------------------------------------------------------------------
  // 3. compute the summary
  // --------------------------------------------------------------------------------
  let summary = {};
  let deltaDailyActualOilLosses = (max_["daily_actual_oil_losses"] - min_["daily_actual_oil_losses"]) / 4.0;
  for (let key in dataFound) {
    let rows = dataFound[key];

    // compute rate
    let rate = 0;
    let curPd = rows[7] - min_["daily_actual_oil_losses"];
    if(curPd < deltaDailyActualOilLosses) {
      rate = 3;
    }
    else if(curPd < deltaDailyActualOilLosses * 2) {
      rate = 2;
    }
    else if(curPd < deltaDailyActualOilLosses * 3) {
      rate = 1;
    }
    else {
      rate = 0;
    }
    // console.log(deltaDailyActualOilLosses, min_["daily_actual_oil_losses"], max_["daily_actual_oil_losses"], key, rows[7], curPd, rate)

    // compute trend
    let trend = 0;
    let pd = rows[7];
    let sma7 = rows[8];
    let sma30 = rows[9];
    if((sma7 > sma30) && (pd > sma7)) {
      trend = 0;
    }
    else if((sma7 > sma30) && (pd < sma7)) {
      trend = 1;
    }
    else if((sma7 < sma30) && (pd > sma7)) {
      trend = 2;
    }
    else {
      trend = 3;
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