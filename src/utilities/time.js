import moment from 'moment';
export const getTimeLocal = (time = new Date()) => {
  return moment.utc(time).local();
};

export const getTimeFormatNormal = (time = new Date()) => {
  return moment.utc(time).local().format('DD/MM/YYYY');
};

export const getTimeFormatDateTime = (time = new Date()) => {
  return moment.utc(time).local().format('LLLL');
};

export const getTimeFromNow = (t = moment()) => {
  const now = moment();
  const time = moment.utc(t).local();
  const timeFromNow = now - time;
  if (timeFromNow <= 3600000) {
    // 3600000  = 1 hour
    return time.fromNow().replace('minute', 'min');
  }
  if (timeFromNow <= 86400000)
    // 86400000 = 1 day
    return time.format('hh:mm a').toLocaleUpperCase();
  return time.format('DD/MM/YYYY');
};

export const setHoursForDate = (time = '', hours = '00:00:00') => {
  const splitHours = hours.split(':');
  return moment.utc(time, 'MM/DD/YYYY HH:mm:ss A').local().set({h: splitHours[0], m: splitHours[1], s: splitHours[2]});
};
