import moment from 'moment';

export default class Period {

  // constructor(props: any) {
  //   super(props);
  // }

  // getPreviousNight(): number {
  //   const date = new Date();
  //   date.setHours(0, 0, 0, 0); // previous night
  //   var _millis = new Date(date);
  //   return _millis.valueOf();
  // }

  // getNextNight(): number {
  //   const date = new Date();
  //   date.setHours(23, 59, 59, 0); // end of day
  //   var _millis = new Date(date);
  //   return _millis.valueOf();
  // }

  public static getTodayStartTime(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // previous night
    var _millis = new Date(date);
    return _millis;
  }

  public static getTodayEndTime(): Date {
    const date = new Date();
    date.setHours(23, 59, 59, 0); // end of day
    var _millis = new Date(date);
    return _millis;
  }

  public static getDayStartTime(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // previous night
    var _millis = new Date(date);
    return _millis;
  }

  public static getDayEndTime(): Date {
    const date = new Date();
    date.setHours(23, 59, 59, 0); // end of day
    var _millis = new Date(date);
    return _millis;
  }

  public static getPreviousSevenDaysItsFirstDay(): Date {
    // use moment
    const date = moment().subtract(6, 'd').startOf('day').valueOf();
    return new Date(date);
  }

  public static displayRangeDate(start_time: number, end_time: number) {
    var range = "";
    const start_date = new Date(start_time);
    const end_date = new Date(end_time);

    if (start_date.getDate() === end_date.getDate() &&
     start_date.getMonth() + 1 === end_date.getMonth() + 1 && 
     start_date.getFullYear() === end_date.getFullYear()) {
      range = 
      ((new Date(start_date)).getDate() === (new Date()).getDate() &&
      (new Date(start_date)).getMonth() === (new Date()).getMonth() &&
      (new Date(start_date)).getFullYear() === (new Date()).getFullYear() ?
      "Today" : start_date.toDateString()) + " at [ " + 
      this.getDisplayTime(start_date.getHours()) + ":" +
      this.getDisplayTime(start_date.getMinutes()) + ":" + 
      this.getDisplayTime(start_date.getSeconds()) + " -- " + 
      this.getDisplayTime(end_date.getHours()) + ":" + 
      this.getDisplayTime(end_date.getMinutes()) + ":" + 
      end_date.getSeconds() + " ]"; 
    }
    else {
      range =  " " + 
      start_date.toDateString() + " to " + 
      start_date.toDateString() + " at [ " +
      this.getDisplayTime(start_date.getHours()) + ":" + 
      this.getDisplayTime(start_date.getMinutes()) + ":" + 
      this.getDisplayTime(start_date.getSeconds()) + " -- " + 
      this.getDisplayTime(end_date.getHours()) + ":" + 
      this.getDisplayTime(end_date.getMinutes()) + ":" + 
      this.getDisplayTime(end_date.getSeconds()) + " ]";
    }

    return range;
  }

  public static displayLastDate(last_time: number) {
    const last_date = new Date(last_time);
    // current =  "[ " + last_date.toTimeString() + " ] at " + last_date.toDateString();
    var current = 
    ((new Date(last_time)).getDate() === (new Date()).getDate() &&
    (new Date(last_time)).getMonth() === (new Date()).getMonth() &&
    (new Date(last_time)).getFullYear() === (new Date()).getFullYear() ?
    "Today" : last_date.toDateString()) + " at  " + 
    this.getDisplayTime(last_date.getHours()) + ":" + 
    this.getDisplayTime(last_date.getMinutes()) + ":" + 
    this.getDisplayTime(last_date.getSeconds()); 

    return current;
  }

  public static getDisplayTime(input_int: number) {
    return input_int < 10 ? ("0" + input_int) : input_int;
  }

  public static isToday(_given_date: number): boolean {
    const given_date = new Date(_given_date);
    const today = new Date();
  
    return today.getDate() === given_date.getDate() && 
    today.getMonth() === given_date.getMonth() && 
    today.getFullYear() === given_date.getFullYear();
  }

  public static isInSameTime(start_time: number, end_time: number): boolean {
    const start_date = new Date(start_time);
    const end_date = new Date(end_time);
  
    return start_date.getDate() === end_date.getDate() && 
    start_date.getMonth() === end_date.getMonth() && 
    start_date.getFullYear() === end_date.getFullYear() && 
    start_date.getHours() === end_date.getHours();
  }
}