/**
 * Usage:
 * calculateDueDate(submitDate, turnaround) -> Date
 * Input:
 *  - submitDate: Date and time the issue is submitted
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
}

function calculateDueDate(submitDate, turnaround) {
  // Input validation, use a helper function
  // Perform due date calculation
  // - Divide turnaround by 8 to get number of working days to add
  // - Add remainder
  // Return due date
}

module.exports = calculateDueDate, isValidDate;
