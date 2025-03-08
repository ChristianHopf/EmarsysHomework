const { isValidDate, calculateDueDate } = require("./dueDateCalculator");

/**
 * Test cases:
 * - invalid input
 * - basic functionality
 * - edge cases
 */
describe("isValidDate", () => {
  test("time before 9 AM is invalid", () => {
    const submitDate = new Date("March 8, 2025 03:25:00");
    const isValidSubmitDate = isValidDate(submitDate);
    expect(isValidSubmitDate).toBe(false);
  });

  test("time after 5 PM is invalid", () => {
    const submitDate = new Date("March 8, 2025 21:25:00");
    const isValidSubmitDate = isValidDate(submitDate);
    expect(isValidSubmitDate).toBe(false);
  });

  test("date on saturday or sunday is invalid", () => {});
});

describe("calculateDueDate", () => {
  test("invalid submit date throws error", () => {});

  test("time is tracked only over working hours", () => {});
});
