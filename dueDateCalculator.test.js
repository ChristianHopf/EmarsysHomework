const { isValidDate, calculateDueDate } = require("./dueDateCalculator");

/**
 * Test cases:
 * - invalid input
 * - basic functionality
 * - edge cases
 */
// describe("isValidDate", () => {
//   test("time before 9 AM is invalid", () => {
//     const submitDate = new Date("March 10, 2025 03:25:00");
//     const isValidSubmitDate = isValidDate(submitDate);
//     expect(isValidSubmitDate).toBe(false);
//   });

//   test("time after 5 PM is invalid", () => {
//     const submitDate = new Date("March 10, 2025 21:25:00");
//     const isValidSubmitDate = isValidDate(submitDate);

//     expect(isValidSubmitDate).toBe(false);
//   });

//   test("time after 5 PM, before 6 PM is invalid", () => {
//     const submitDate = new Date("March 10, 2025 17:00:38");
//     const isValidSubmitDate = isValidDate(submitDate);

//     expect(isValidSubmitDate).toBe(false);
//   });

//   test("time at exactly 5 PM is valid", () => {
//     const submitDate = new Date("March 10, 2025 17:00:00");
//     const isValidSubmitDate = isValidDate(submitDate);

//     expect(isValidSubmitDate).toBe(true);
//   });

//   test("time between 9 AM and 5 PM is valid", () => {
//     const submitDate = new Date("March 10, 2025 17:00:00");
//     const isValidSubmitDate = isValidDate(submitDate);

//     expect(isValidSubmitDate).toBe(true);
//   });

//   test("date on saturday or sunday is invalid", () => {
//     const saturday = new Date("March 8, 2025 12:05:36");
//     const sunday = new Date("March 9, 2025 14:05:36");
//     const isValidSaturday = isValidDate(saturday);
//     const isValidSunday = isValidDate(sunday);

//     expect(isValidSaturday).toBe(false);
//     expect(isValidSunday).toBe(false);
//   });

//   test("dates monday through friday are valid", () => {
//     // using valid times, since day validation takes place after time
//     const monday = new Date("March 3, 2025 12:05:36");
//     const tuesday = new Date("March 4, 2025 14:05:36");
//     const wednesday = new Date("March 5, 2025 14:05:36");
//     const thursday = new Date("March 6, 2025 14:05:36");
//     const friday = new Date("March 7, 2025 14:05:36");

//     const isValidMonday = isValidDate(monday);
//     const isValidTuesday = isValidDate(tuesday);
//     const isValidWednesday = isValidDate(wednesday);
//     const isValidThursday = isValidDate(thursday);
//     const isValidFriday = isValidDate(friday);

//     expect(isValidMonday).toBe(true);
//     expect(isValidTuesday).toBe(true);
//     expect(isValidWednesday).toBe(true);
//     expect(isValidThursday).toBe(true);
//     expect(isValidFriday).toBe(true);
//   });
// });

describe("calculateDueDate", () => {
  //   test("invalid submit date returns null", () => {
  //     const invalidTime = new Date("March 10, 2025 04:05:36");
  //     const invalidDay = new Date("March 8, 2025 12:05:36");
  //     const turnaround = 32;
  //     const dueDate1 = calculateDueDate(invalidTime, turnaround);
  //     const dueDate2 = calculateDueDate(invalidDay, turnaround);

  //     expect(dueDate1).toBe(null);
  //     expect(dueDate2).toBe(null);
  //   });

  //   test("invalid turnaround returns null", () => {
  //     const submitDate = new Date("March 10, 2025 12:05:36");
  //     const turnaround = -5;
  //     const dueDate = calculateDueDate(submitDate, turnaround);

  //     expect(dueDate).toBe(null);
  //   });

  test("date correctly moves forward by remainder hours", () => {
    // March 10, 2025 15:05:36
    const dueDate1 = calculateDueDate(1741633536000, 7);
    // March 7, 2025 12:05:36
    const dueDate2 = calculateDueDate(1741367136000, 7);

    expect(dueDate1).toStrictEqual(new Date("March 11, 2025 14:05:36"));
    expect(dueDate2).toStrictEqual(new Date("March 10, 2025 12:05:36")); // DST
  });

  test("valid input returns correct same day due date", () => {
    // March 17, 2025 09:05:36
    const dueDate = calculateDueDate(1742216736000, 7);

    expect(dueDate).toStrictEqual(new Date("March 17, 2025, 16:05:36"));
  });

  // test("valid input returns correct next day due date", () => {
  //   const submitDate = new Date("March 10, 2025 12:05:36");
  //   const turnaround = 9;
  //   const dueDate = calculateDueDate(submitDate, turnaround);

  //   expect(dueDate).toBe(new Date("March 11, 2025, 13:05:36"));
  // });

  //   test("valid input returns correct due date, skipping weekends", () => {
  //     const submitDate = new Date("March 7, 2025 12:05:36");
  //     const turnaround = 10;
  //     const dueDate = calculateDueDate(submitDate, turnaround);

  //     expect(dueDate).toBe(new Date("March 10, 2025, 14:05:36"));
  //   });
});
