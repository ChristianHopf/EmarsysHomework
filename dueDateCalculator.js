/**
 * Validates a given date
 * @param {date} submitDate - unix timestamp of issue submission
 * @returns {boolean} - returns whether the date is within working hours
 * Examples:
 * - isValidDate(Date.parse("March 10, 2025 12:05:36")) -> true
 * - isValidDate(Date.parse("March 8, 2025 12:05:36")) -> false
 */
function isValidDate(submitDate) {
  // submitDate must be
  // - between 9AM and 5PM
  // - between Mon and Fri
  let submitDateObj = new Date(submitDate);
  let hour = submitDateObj.getHours();
  let day = submitDateObj.getDay();

  // If hour is not between 9 AM and 5 PM, return false
  if (hour < 9 || hour > 17) {
    return false;
  }
  // If hour is 5 PM, time must be exactly 5 PM
  else if (hour == 17) {
    return submitDateObj.getMinutes() == 0 && submitDateObj.getSeconds() == 0;
  }

  // Date object days are 0 (Sunday) through 6 (Saturday), so 1 <= day <= 5
  return 1 <= day && day <= 5;
}

/**
 *
 * @param {number} dueDate - unix timestamp of the current due date
 * @param {number} remainingHours - number of hours by which to advance the due date
 * @returns {number} - the updated due date
 * Example:
 * - moveByRemainingHours(Date.parse("March 7, 2025 12:05:36"), 2) -> (timestamp equivalent to March 7, 2025 14:05:36)
 */
function moveByRemainingHours(dueDate, remainingHours) {
  let dueDateObj = new Date(dueDate);
  let hour = dueDateObj.getHours();
  let day = dueDateObj.getDay();

  if (hour + remainingHours > 17) {
    // Move to 5 PM
    dueDate += (17 - hour) * 3600000;
    // Check if Friday, move to Monday, keep minutes and seconds
    if (day == 5) {
      // From 5 PM Friday to 9 AM Monday = 64 hours
      dueDate += 64 * 3600000;
    }
    // Else move to next day
    else {
      dueDate += 16 * 3600000;
    }

    let extra = hour + remainingHours - 17;
    dueDate += extra * 3600000;
  } else {
    dueDate += remainingHours * 3600000;
  }

  return dueDate;
}

/**
 *
 * @param {number} dueDate - unix timestamp of the current due date
 * @param {number} elapsedDays - number of full working days by which to advance the due date
 * @returns {number} - the updated due date
 * Examples:
 * - moveByDays(Date.parse("March 10, 2025 12:05:36"), 2) -> (timestamp equivalent to March 12, 2025 12:05:36)
 * - moveByDays(Date.parse("March 14, 2025 12:05:36"), 2) -> (timestamp equivalent to March 18, 2025 12:05:36)
 */
function moveByDays(dueDate, elapsedDays) {
  while (elapsedDays >= 5) {
    // For every 5 days we want to add, add 7
    dueDate += 7 * 86400000;
    elapsedDays -= 5;
  }

  // Add remaining elapsed days
  if (elapsedDays > 0) {
    // elapsedDays will be < 5, but we still need to check if we're crossing a weekend
    let day = new Date(dueDate).getDay();
    if (day + elapsedDays > 5) {
      dueDate += (elapsedDays + 2) * 86400000;
    } else {
      dueDate += elapsedDays * 86400000;
    }
  }
  return dueDate;
}

/**
 * Calculate due date
 * @param {number} submitDate - unix timestamp of issue submission
 * @param {number} turnaround - issue turnaround in hours
 * @returns {Date} - the calculated due date as a Date object
 * Examples:
 * - calculateDueDate(1741367136000, 19)
 * - calculateDueDate(Date.parse("March 10, 2025 12:05:36"), 19)
 *  => Date("March 12, 2025 15:05:36")
 */
function calculateDueDate(submitDate, turnaround) {
  // Input validation, use a helper function
  if (!isValidDate(submitDate) || turnaround <= 0) {
    return null;
  }

  let dueDate = submitDate;
  // Perform due date calculation
  // - Divide turnaround by 8 to get number of working days to add
  // - Add remainder
  let elapsedDays = Math.floor(turnaround / 8);
  let remainingHours = turnaround % 8;

  // Move date by remaining hours
  dueDate = moveByRemainingHours(dueDate, remainingHours);

  // Add elapsed weeks
  dueDate = moveByDays(dueDate, elapsedDays);

  return new Date(dueDate);
}

module.exports = {
  isValidDate,
  moveByRemainingHours,
  moveByDays,
  calculateDueDate,
};
