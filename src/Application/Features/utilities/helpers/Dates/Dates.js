class Dates {
  static getPreviousYearMonth() {
    const { year, month } = Dates.getCurrentYearMonth();
    return new Date(year, month, 0);
  }

  static getCurrentYearMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return { year, month };
  }

  static countWeekdaysAndWeekendsOfAMonth() {
    const previousMonth = this.getPreviousYearMonth().getMonth();
    const yearOfPreviousMonth = this.getPreviousYearMonth().getFullYear();
    const numberOfDaysInPreviousMonth = this.getPreviousYearMonth().getDate();
    let numberOfWeekdays = 0;
    let numberOfWeekdends = 0;

    for (let i = 0; i < numberOfDaysInPreviousMonth; i += 1) {
      const day = new Date(yearOfPreviousMonth, previousMonth, i).getDay();
      if ([0, 6].includes(day)) {
        numberOfWeekdends += 1;
      } else {
        numberOfWeekdays += 1;
      }
    }
    return [numberOfWeekdays, numberOfWeekdends];
  }

  static convertPreviousYearMonthToString() {
    const previousYearMonth = this.getPreviousYearMonth().toDateString().split(' ');
    const month = previousYearMonth[1];
    const year = previousYearMonth[3];
    return `${month}, ${year}`;
  }
}

export default Dates;
