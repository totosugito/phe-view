import {format as formatDateFns} from "date-fns";

export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const formatDate = (localeId, dateString) => {
  if (!dateString) return null;

  const options = { year: "numeric", month: "long", day: "numeric" }
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString(localeId, options)
  return `${formattedDate} `
}

export const formatDateToLocale = (localeId, dateString) => {
  if (!dateString) return null;

  const options = {
    // weekday: 'long',    // "Senin", "Selasa", etc.
    year: 'numeric',    // 2024
    month: 'long',      // "September"
    day: 'numeric'      // 19
  };

  return(locateStringToDateTime(localeId, dateString, options));
}

export const formatDateToDate = (localeId, dateString) => {
  if (!dateString) return null;

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return(locateStringToDateTime(localeId, dateString, options).replace('.', ':').replace(',', ''));
}

export const formatDateToDateTime = (localeId, dateString) => {
  if (!dateString) return null;

  const options = {
    // weekday: 'long',    // "Senin", "Selasa", etc.
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  return(locateStringToDateTime(localeId, dateString, options).replace('.', ':').replace(',', ''));
}

export const locateStringToDateTime = (localeId, dateString, options) => {
  if (!dateString) return null;

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString(localeId, options)
  return `${formattedDate} `
}

export default function GetAvgRating(ratingArr) {
  if (ratingArr?.length === 0) return 0
  const totalReviewCount = ratingArr?.reduce((acc, curr) => {
    acc += curr.rating
    return acc
  }, 0)

  const multiplier = Math.pow(10, 1)
  return Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
}

export const isHtmlEmpty = (html) => {
  let text = html.trim();
  if (!text) return true
  return text.replace(/<[^>]*>?/gm, '').trim().length === 0
}

export const isValidAndNotEmpty = (text) => {
  if(!text) {
    return false;
  }

  return text.trim().length > 0;
}

export function to_decimal_formatted(value, precision=2) {
  const formattedNumber = new Intl.NumberFormat('en', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value);
  return(formattedNumber);
}

export function date_to_string(value, format_date = "yyyy-MM-dd") {
  try {
    return (formatDateFns(value, format_date));
  } catch (e) {
    return (formatDateFns(new Date(), format_date));
  }
}

export function timestamp_to_string(value, multiplier = 1000, format_date = "yyyy-MM-dd HH:mm") {
  try {
    return (formatDateFns(new Date(value*multiplier), format_date));
  } catch (e) {
    return (formatDateFns(new Date(), format_date));
  }
}
