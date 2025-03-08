const { isValidDate, calculateDueDate } = require("./dueDateCalculator");

/**
 * Test cases:
 * - invalid input
 * - basic functionality
 * - edge cases
 */
describe("isValidDate", () => {
  test("time before 9 AM is invalid", () => {
    const submitDate = new Date("March 10, 2025 03:25:00");
    const isValidSubmitDate = isValidDate(submitDate);
    expect(isValidSubmitDate).toBe(false);
  });

  test("time after 5 PM is invalid", () => {
    const submitDate = new Date("March 10, 2025 21:25:00");
    const isValidSubmitDate = isValidDate(submitDate);

    expect(isValidSubmitDate).toBe(false);
  });

  test("time after 5 PM, before 6 PM is invalid", () => {
    const submitDate = new Date("March 10, 2025 17:00:38");
    const isValidSubmitDate = isValidDate(submitDate);

    expect(isValidSubmitDate).toBe(false);
  });

  test("time at exactly 5 PM is valid", () => {
    const submitDate = new Date("March 10, 2025 17:00:00");
    const isValidSubmitDate = isValidDate(submitDate);

    expect(isValidSubmitDate).toBe(true);
  });

  test("time between 9 AM and 5 PM is valid", () => {
    const submitDate = new Date("March 10, 2025 17:00:00");
    const isValidSubmitDate = isValidDate(submitDate);

    expect(isValidSubmitDate).toBe(true);
  });

  test("date on saturday or sunday is invalid", () => {
    const saturday = new Date("March 8, 2025 12:05:36");
    const sunday = new Date("March 9, 2025 14:05:36");
    const isValidSaturday = isValidDate(saturday);
    const isValidSunday = isValidDate(sunday);

    expect(isValidSaturday).toBe(false);
    expect(isValidSunday).toBe(false);
  });

  test("dates monday through friday are valid", () => {
    // using valid times, since day validation takes place after time
    const monday = new Date("March 3, 2025 12:05:36");
    const tuesday = new Date("March 4, 2025 14:05:36");
    const wednesday = new Date("March 5, 2025 14:05:36");
    const thursday = new Date("March 6, 2025 14:05:36");
    const friday = new Date("March 7, 2025 14:05:36");

    const isValidMonday = isValidDate(monday);
    const isValidTuesday = isValidDate(tuesday);
    const isValidWednesday = isValidDate(wednesday);
    const isValidThursday = isValidDate(thursday);
    const isValidFriday = isValidDate(friday);

    expect(isValidMonday).toBe(true);
    expect(isValidTuesday).toBe(true);
    expect(isValidWednesday).toBe(true);
    expect(isValidThursday).toBe(true);
    expect(isValidFriday).toBe(true);
  });
});

describe("calculateDueDate", () => {
  test("invalid submit date returns null", () => {
    const submitDate = new Date("March 8, 2025 12:05:36");
    const turnaround = 32;
    const dueDate = calculateDueDate(submitDate, turnaround);

    expect(dueDate).toBe(null);
  });

  test("time is tracked only over working hours", () => {});
});
