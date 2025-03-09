/**
 * Usage:
 * calculateDueDate(submitDate, turnaround) -> Date | null
 * Input:
 *  - submitDate: Date and time the issue is submitted. Assume input is in unix time (ms),
 *      since a real ticket submission would likely use Date.now() or equivalent
 *  - turnaround: Lifetime of the issue, in hours
 * Output (Date):
 *  - Due date and time for the issue
 * Example:
 * - calculateDueDate(Date("03-08-2025", 1148), 19)
 *  - Input:
 *      - submitDate: March 10, 2025, 11:48 AM
 *      - turnaround: 19 hours
 *  - Output:
 *      - dueDate: March 12, 2025, 2:48 PM
 */

// Might add TypeScript later
// interface DateTime{

// }

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

function calculateDueDate(submitDate, turnaround) {
  // Input validation, use a helper function
  if (!isValidDate(submitDate) || turnaround <= 0) {
    return null;
  }

  let submitDateObj = new Date(submitDate);

  // Perform due date calculation
  // - Divide turnaround by 8 to get number of working days to add
  // - Add remainder
  let elapsedDays = Math.floor(turnaround / 8);
  let remainingHours = turnaround % 8;

  // Move date by remaining hours
  let hour = submitDateObj.getHours();

  // Pass 5 PM: move to next day 9 AM and add the extra hours
  if (hour + remainingHours > 17) {
    // Move to 5 PM
    submitDate += (17 - hour) * 3600000;
    // Check if Friday, move to Monday, keep minutes and seconds
    if (submitDateObj.getDay() == 5) {
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

  // Add elapsed weeks
  //   let day = new Date(submitDate).getDay();
  while (elapsedDays >= 5) {
    // For every 5 days we want to add, add 7
    submitDate += 7 * 86400000;
    elapsedDays -= 5;
  }

  // Add remaining elapsed days
  if (elapsedDays > 0) {
    submitDate += elapsedDays * 86400000;
  }
  return new Date(submitDate);
  //   if (day + elapsedDays > 5) {
  //     // Move to Friday, skip the weekend, then the rest of elapsedDays
  //     let moveToFriday = 5 - day;
  //     submitDate += ((day + elapsedDays) % 5) * 86400000;
  //     submitDate += 3 * 86400000;
  //     submitDate += elapsedDays - (day + elapsedDays - 5);
  //   }

  //   return new Date(submitDate);

  // Move date by remaining days

  // Move date by elapsed days
  //   let day = new Date(submitDate).getDay();
  //   let dueDay = ((day - 1 + elapsedDays) % 5) + 1;

  // Based on given time and turnaround, add another day if it passes 5 PM

  // Return due date
}

module.exports = { calculateDueDate, isValidDate };
