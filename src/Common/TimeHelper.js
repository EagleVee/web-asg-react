import moment from "moment";
// import moment from 'moment-timezone'

export default class TimeHelper {
  static getMillisecondFromTimeString(dateString, format = "DD-MM-YYYY") {
    return moment(dateString, format).valueOf() / 1000;
  }

  static diffFromNowInSecond(datetime) {
    const date = moment(datetime);
    const durationFromNow = moment.duration(moment().diff(date));
    return durationFromNow.as("seconds");
  }

  static diffFromNowInHour(datetime) {
    const date = moment(datetime);
    const durationFromNow = moment.duration(moment().diff(date));
    return durationFromNow.as("hours");
  }

  static formatDateTime(datetime, format = "DD/MM/YYYY HH:mm") {
    return moment.unix(datetime).format(format);
  }

  static getDayFromDate(datetime) {
    return moment.unix(datetime).format("DD/MM/YYYY");
  }

  static getHourFromDate(datetime) {
    return moment.unix(datetime).format("HH:mm");
  }

  static formatUnix(datetime) {
    return moment(datetime).format("DD/MM/YYYY HH:mm");
  }

  static diffFromNowInDay(datetime) {
    const given = moment.unix(datetime);
    const current = moment().startOf("day");
    return Math.ceil(moment.duration(given.diff(current)).asDays());
  }

  static calendarTime(datetime) {
    return moment().calendar(datetime * 1000, {
      sameDay: "[Hôm nay]",
      nextDay: "[Ngày mai]",
      nextWeek: "DD/MM",
      lastDay: "[Hôm qua]",
      lastWeek: "DD/MM",
      sameElse: "DD/MM"
    });
  }

  static formatDateTimeFromMySQLDate(sqlDate, format = "DD/MM/YYYY HH:mm") {
    return moment
      .utc(new Date(sqlDate))
      .utcOffset(7)
      .format(format)
      .toString();
  }

  static formatMessageTimestamp(time) {
    moment.locale("vi");
    const date = moment.utc(time);
    const dateVN = date.utc().utcOffset(420);
    const durationFromNow = moment.duration(moment().diff(date));
    if (durationFromNow.as("hours") < 1) {
      return dateVN.fromNow();
    } else if (durationFromNow.as("days") < 1) {
      return dateVN.format("LT");
    } else if (durationFromNow.as("weeks") < 1) {
      return dateVN.format("dddd LT");
    }

    return dateVN.format("DD-MM-YYYY LT");
  }

  static formatPostTimestamp(time) {
    moment.locale("vi");
    const date = moment.utc(time);
    const dateVN = date.utc().utcOffset(+7);
    const durationFromNow = moment.duration(moment().diff(date));
    if (durationFromNow.as("days") < 1) {
      return dateVN.fromNow();
    } else if (durationFromNow.as("weeks") < 1) {
      return dateVN.format("dddd LT");
    }

    return dateVN.format("DD-MM-YYYY LT");
  }
}
