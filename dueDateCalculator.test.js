const calculateDueDate = require("./dueDateCalculator");

/**
 * Test cases:
 * - invalid input
 * - basic functionality
 * - edge cases
 */
describe("isValidDate", () => {
  test("time before 9 AM is invalid", () => {});

  test("time after 5 PM is invalid", () => {});

  test("date on saturday or sunday is invalid", () => {});
});

describe("calculateDueDate", () => {
  test("invalid submit date throws error", () => {});

  test("time is tracked only over working hours", () => {});
});
