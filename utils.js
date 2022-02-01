export const COLOR_VARIANTS = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'link',
  'dark',
  'light',
  'white',
];

export const SIZES_ABBR = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

export const SIZES = ['xsmall', 'small', 'medium', 'large'];

export const variantValidator = (variant) => {
  return COLOR_VARIANTS.includes(variant) !== -1;
};

export function humanize(str) {
  if (typeof str === 'string') {
    const cleanStr = str.replace(/_/g, ' ');
    const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
    return upperFirst;
  }
}

export function humanizeHero(str) {
  const cleanStr = str.split('-');
  const upperFirst = cleanStr.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  return upperFirst.join(' ');
}

export function urlize(str) {
  return str.toLowerCase().replace(/ /g, '-');
}

//
// Calendar Utils
//

/**
 * Calculates the number of weeks in the current month.
 *
 * @param {number} month The month.
 * @param {number} year The year.
 * @returns {number} The number of weeks in the month.
 */
export function weeksInMonth(month, year) {
  // month = # (0 indexed), year = #
  const firstDay = new Date(year, month, 1).getDay(); // day of the week of 1st
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Math.ceil((firstDay + daysInMonth) / 7);
}

/**
 * Generates the string representation of a date.
 *
 * @param {number} month The integer representation of the month.
 * @param {number} day The integer representation of the day of the month.
 * @param {number} year The integer representation of the year.
 * @returns {string} The date as a string.
 */
export function getStringDate(month, day, year) {
  const mm = month < 10 ? '0' + month : month;
  const dd = day < 10 ? '0' + day : day;
  return year + '-' + mm + '-' + dd;
}

export const ALL_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ALL_DAYS_OF_WEEK = [
  'Sun',
  'Mon',
  'Tues',
  'Weds',
  'Thurs',
  'Fri',
  'Sat',
];

export const DISPLAY_YEAR = new Date().getFullYear();

export const DISPLAY_MONTH = new Date().getMonth() + 1;

export const DISPLAY_DAY = new Date().getDate();

export const TODAYS_DATE = getStringDate(
  new Date().getMonth() + 1,
  new Date().getDate(),
  new Date().getFullYear()
);
