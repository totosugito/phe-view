export const excelDateToJSDate = (serial) => {
  const excelEpoch = new Date(1900, 0, 1); // January 1, 1900
  const daysOffset = serial - 1; // Excel considers January 1, 1900, as day 1
  return new Date(excelEpoch.getTime() + daysOffset * 86400000);
};