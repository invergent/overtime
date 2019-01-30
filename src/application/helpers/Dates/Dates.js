class Dates {
  static previousYearMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return new Date(year, month, 0);
  }

  static countWeekdaysAndWeekendsOfAMonth() {
    const previousMonth = this.previousYearMonth().getMonth();
    const yearOfPreviousMonth = this.previousYearMonth().getFullYear();
    const numberOfDaysInPreviousMonth = this.previousYearMonth().getDate();
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
    const previousYearMonth = this.previousYearMonth().toDateString().split(' ');
    const month = previousYearMonth[1];
    const year = previousYearMonth[3];
    return `${month}, ${year}`;
  }
}

export default Dates;
