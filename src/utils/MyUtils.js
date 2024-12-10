import {format as formatDateFns, parse as parseDateFns, parseISO} from "date-fns";

export const excelDateToJSDate = (serial) => {
  const excelEpoch = new Date(1900, 0, 1); // January 1, 1900
  const daysOffset = serial - 1; // Excel considers January 1, 1900, as day 1
  return new Date(excelEpoch.getTime() + daysOffset * 86400000);
}

export function create_random_int(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function to_formatted_money(v, prefix = "$", precision = 2, default_neg = "N/A") {
  v = v * 1;
  if (v < 0)
    return (default_neg);

  if (v === 0) {
    return ("0");
  } else if (v < 0)
    return (default_neg);
  else if (v < 0.00001)
    return (`${prefix}${v.toFixed(precision + 5)}`);
  else if (v < 0.0001)
    return (`${prefix}${v.toFixed(precision + 4)}`);
  else if (v < 0.001)
    return (`${prefix}${v.toFixed(precision + 3)}`);
  else if (v < 0.01)
    return (`${prefix}${v.toFixed(precision + 2)}`);
  else if (v < 0.1)
    return (`${prefix}${v.toFixed(precision + 1)}`);
  else if (v < 1000)
    return (`${prefix}${v.toFixed(precision)}`);
  else if (v < 1e+6)
    return (`${prefix}${(v / 1e+3).toFixed(precision)}K`);
  else if (v < 1e+9)
    return (`${prefix}${(v / 1e+6).toFixed(precision)}M`);
  else if (v < 1e+12)
    return (`${prefix}${(v / 1e+9).toFixed(precision)}B`);
  else
    return (`${prefix}${v}`);
}

export function to_money_formatted(value) {
  if (value === "") return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function to_decimal_formatted(value, precision=2) {
  const formattedNumber = new Intl.NumberFormat('en', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value);
  return(formattedNumber);
}
export function string_gmt_to_date(value, format_date = "yyyy/MM/dd") {
  try {
    const dateObject = parseISO(value);
    // const dateObject = parseDateFns(value.substr(0, 16), 'yyyy-MM-dd HH:mm', new Date());
    return (formatDateFns(dateObject, format_date));
  } catch (e) {
    return (formatDateFns(new Date(), format_date));
  }
}

export function string_gmt_to_date_v2(value, format_date = "yyyy/MM/dd") {
  try {
    const dateObject = parseDateFns(value.substr(0, 15), "EEE MMM dd yyyy", new Date());
    return (formatDateFns(dateObject, format_date));
  } catch (e) {
    return (formatDateFns(new Date(), format_date));
  }
}

export function date_to_string(value, format_date = "yyyy-MM-dd") {
  try {
    return (formatDateFns(value, format_date));
  } catch (e) {
    return (formatDateFns(new Date(), format_date));
  }
}

export const getUniqueValuesByKey = (data, key) => {
  const uniqueValues = [...new Set(data.map(item => item[key]))];
  return uniqueValues.map(value => ({ value, label: value }));
}

export function filterData(data, filterCriteria) {
  return data.filter(item =>
    Object.entries(filterCriteria).every(([key, values]) =>
      values.includes(item[key])
    )
  );
}

export function getMaxList(data, key) {
  const idx = data.reduce((maxIdx, item, idx, arr) =>
    item[key] > arr[maxIdx][key] ? idx : maxIdx, 0
  )

  if(idx > -1) {
    return data[idx];
  }
  return null;
}

export function getMaxObject(data) {
  return Object.entries(data).reduce((max, entry) =>
    entry[1] > max[1] ? entry : max
  );
}

export function getMinObject(data) {
  return Object.entries(data).reduce((max, entry) =>
    entry[1] < max[1] ? entry : max
  );
}

export function computeObjectValueCount(data) {
  return(Object.values(data).reduce((accumulator, value) => accumulator + value, 0));
}

export function sumTheList(data, key) {
  const { sum, count } = data.reduce(
    (accumulator, item) => {
      const value = item[key];
      if (value !== undefined) {
        accumulator.sum += value;
        accumulator.count += 1;
      }
      return accumulator;
    },
    { sum: 0, count: 0 }
  );

  return {sum: sum, count: count};
}

export function computeAverage(data, key) {
  const { sum, count } = data.reduce(
    (accumulator, item) => {
      const value = item[key];
      if (value !== undefined) {
        accumulator.sum += value;
        accumulator.count += 1;
      }
      return accumulator;
    },
    { sum: 0, count: 0 }
  );

  return(count > 0 ? sum / count : 0);
}

export function groupDataCount(data, key_) {
  const result = data.reduce((acc, item) => {
    const key = item[key_]; // Change 'type' to the key you want to group by
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return(result);
}

export function filterObjectByListKeys(obj, keys) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
}
