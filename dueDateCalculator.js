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

  // Date object days are 0 (Sunday) through 6 (Saturday)
  return day > 0 && day < 6;
}

function calculateDueDate(submitDate, turnaround) {
  // Input validation, use a helper function
  if (!isValidDate(submitDate) || turnaround <= 0) {
    return null;
  }

  // Perform due date calculation
  // - Divide turnaround by 8 to get number of working days to add
  // - Add remainder
  let elapsedDays = turnaround / 8;
  let remainingHours = turnaround % 8;

  let day = new Date(submitDate).getDay();
  let dueDay = ((day - 1 + elapsedDays) % 5) + 1;
  // Based on given time and turnaround, add another day if it passes 5 PM

  // Return due date
}

module.exports = { calculateDueDate, isValidDate };
