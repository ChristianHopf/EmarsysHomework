function isValidDate(date) {
  // submitDate must be
  // - between 9AM and 5PM
  // - between Mon and Fri
  let submitDate = new Date(date);
  let hour = submitDate.getHours();
  let day = submitDate.getDay();

  if (hour < 9 || hour > 17) {
    return false;
  }
  // If hour is 5 PM, time must be exactly 5 PM
  else if (hour == 17) {
    return submitDate.getMinutes() == 0 && submitDate.getSeconds() == 0;
  }

  // Date object days are 0 (Sunday) through 6 (Saturday), so 1 <= day <= 5
  return 1 <= day && day <= 5;
}

function moveByRemainingHours(submitDate, remainingHours) {
  let submitDateObj = new Date(submitDate);
  let hour = submitDateObj.getHours();
  let day = submitDateObj.getDay();

  if (hour + remainingHours > 17) {
    // Move to 5 PM
    submitDate += (17 - hour) * 3600000;
    // Check if Friday, move to Monday, keep minutes and seconds
    if (day == 5) {
      // From 5 PM Friday to 9 AM Monday = 64 hours
      submitDate += 64 * 3600000;
    }
    // Else move to next day
    else {
      submitDate += 16 * 3600000;
    }

    let extra = hour + remainingHours - 17;
    submitDate += extra * 3600000;
  } else {
    submitDate += remainingHours * 3600000;
  }

  return submitDate;
}

function moveByDays(submitDate, elapsedDays) {
  let submitDateObj = new Date(submitDate);

  while (elapsedDays >= 5) {
    // For every 5 days we want to add, add 7
    submitDate += 7 * 86400000;
    elapsedDays -= 5;
  }

  // Add remaining elapsed days
  if (elapsedDays > 0) {
    // elapsedDays will be < 5, but we still need to check if we're crossing a weekend
    let day = submitDateObj.getDay();
    if (day + elapsedDays > 5) {
      submitDate += (elapsedDays + 2) * 86400000;
    } else {
      submitDate += elapsedDays * 86400000;
    }
  }
  return submitDate;
}

/**
 * Usage:
 * calculateDueDate(submitDate, turnaround) -> Date | null
 * Input:
 *  - submitDate: Date and time the issue is submitted. Assume input is a unix timestamp,
 *      since a real ticket submission would likely use Date.now() or equivalent
 *  - turnaround: Lifetime of the issue, in hours
 * Output (Date):
 *  - Due date and time for the issue as a Date object
 * Example:
 * - calculateDueDate(1741367136000, 19)
 * - calculateDueDate(Date.parse("March 10, 2025 12:05:36"), 19)
 *  => Date("March 12, 2025 15:05:36")
 */
function calculateDueDate(submitDate, turnaround) {
  // Input validation, use a helper function
  if (!isValidDate(submitDate) || turnaround <= 0) {
    return null;
  }

  // Perform due date calculation
  // - Divide turnaround by 8 to get number of working days to add
  // - Add remainder
  let elapsedDays = Math.floor(turnaround / 8);
  let remainingHours = turnaround % 8;

  // Move date by remaining hours
  submitDate = moveByRemainingHours(submitDate, remainingHours);

  // Add elapsed weeks
  submitDate = moveByDays(submitDate, elapsedDays);

  return new Date(submitDate);
}

module.exports = {
  isValidDate,
  moveByRemainingHours,
  moveByDays,
  calculateDueDate,
};
