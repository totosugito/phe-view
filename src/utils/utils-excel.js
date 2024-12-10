export const excelDateToDateObject = (serial, asDay=true) => {
  const excelEpoch = new Date(1900, 0, 1); // January 1, 1900
  const daysOffset = serial - 1; // Excel considers January 1, 1900, as day 1

  let day = new Date(excelEpoch.getTime() + daysOffset * 86400000);
  if(asDay) {
    day.setHours(0,0,0,0);
  }

  return day;
}

export const createObjectListFromMap = (array, key) => {
  let result = [];
  for (const key in array) {
    result.push({value: key, label: key});
  }
  return result;
}

export const excelsCreateGroups = (rows, groupIndex) =>  {
  const result = rows.reduce((acc, row, index) => {
    const name = row[groupIndex]; // Group key
    if (!acc[name]) {
      acc[name] = { rows: [], start: index, end: index };
    }
    acc[name].rows.push(row);
    acc[name].end = index; // Update the end index
    acc[name].count = acc[name].rows.length;
    acc[name].name = name;
    return acc;
  }, {});

  return(result);
}