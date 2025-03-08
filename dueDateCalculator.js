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
function calculateDueDate() {
  console.log("calculate");
}

module.exports = calculateDueDate;
