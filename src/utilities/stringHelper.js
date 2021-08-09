export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFullName = (firstName, lastName) =>
  [firstName || '', lastName || ''].filter((_) => _).join(' ');

export const getReadableFileSizeString = (fileSizeInBytes) => {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

export const separateCost = function (number = 0, characterSeparator = ',') {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, characterSeparator);
};

export const objectToQueryString = (obj) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};
