import { USER_ROLE } from 'constants/common';

export const checkFormAntInvalid = (form, requiredField = []) => {
  let isEmptyObjects = false;
  const errors = form.getFieldsError().filter(({ errors }) => errors.length)
    .length;
  if (requiredField.length) {
    const dataFields = form.getFieldsValue() || {};
    isEmptyObjects = !checkRequiredFieldHasValue(dataFields, requiredField);
  }
  return errors || isEmptyObjects;
};

/*
 @param { 1: '', 2: {3: ''} } object
 @param ['1', '3'] requiredField: array of keys in object
 @return false . Check all requiredField have value
*/
const checkRequiredFieldHasValue = (object, requiredField) => {
  if (!object || object === null) return false;
  return (
    Object.entries(object).every(([key, data]) => {
      if (data && typeof data === 'object') {
        return checkRequiredFieldHasValue(data, requiredField);
      }
      if (requiredField?.indexOf(key) !== -1) {
        return !!data;
      }
      return true;
    }) || false
  );
};

export const checkStatusSuccess = (num) => {
  return num.toString().match(/2../);
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

let timer;
const DEFAULT_TIMEOUT = 300;
export const debounced = (fn) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, DEFAULT_TIMEOUT);
};

export const getFileExtension = (fileName) => {
  if (!fileName) {
    return {};
  }
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  const name = fileName.replace(/\.[^/.]+$/, '');
  return { extension, name };
};

export const lowerCaseKey = (info) => {
  if (!info) return;
  let obj = {};
  for (let key in info) {
    if (info.hasOwnProperty(key)) {
      const ketNew = key.toLowerCase();
      obj = Object.assign({}, obj, {
        [ketNew]: info[key],
      });
    }
  }
  return obj;
};

export const getEmailHide = (email) => {
  if (!email) {
    return '';
  }
  return `${email.substring(0, 3)}•••••${email.slice(email.length - 4)}`;
};

export const getPhoneHide = (phone) => {
  if (!phone) {
    return '';
  }
  return `•••••${phone.slice(phone.length - 4)}`;
};

export const getPhoneNumber = (phone) => {
  if (phone?.charAt(0) == 0) {
    return phone.substr(1);
  }
  return phone;
};

export class ValidateRequireField {
  field = [];
  constructor(validate) {
    this.field = Object.entries(validate).reduce((acc, [key, value]) => {
      if (value.find((_) => _.required)) {
        acc.push(key);
      }
      return acc;
    }, []);
  }

  check(form) {
    const values = form.getFieldsValue(this.field);
    return Object.values(values).some((_) => !_) || checkFormAntInvalid(form);
  }
}

export const findById = (id, array) => {
  return array.find((_) => _.id === id);
};

export const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const convertCentToDollar = (value) => {
  if (!value) return;
  return parseInt(value) * 0.01;
};

export const startTimer = async (duration = 59, display) => {
  return new Promise((resolve) => {
    let timer = duration,
      minutes,
      seconds;
    const x = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      if (+minutes) {
        display.textContent = `(${minutes} : ${seconds}s)`;
      } else {
        display.textContent = `(${seconds}s)`;
      }
      timer--;

      if (timer < 0) {
        display.textContent = '';
        resolve(true);
        clearInterval(x);
      }
    }, 1000);
  });
};

export const dedupe = (list) => {
  const uniq = new Set(list.map((e) => JSON.stringify(e)));

  return Array.from(uniq).map((e) => JSON.parse(e));
};

export const createMarkup = (string = '') => {
  return { __html: string };
};

export const loadjs = (file, onLoad) => {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = file;
  script.async = true;
  script.onload = function () {
    onLoad();
  };
  document.body.appendChild(script);
};

//gets the type of browser
export const detectBrowser = () => {
  if (
    (navigator.userAgent.indexOf('Opera') ||
      navigator.userAgent.indexOf('OPR')) != -1
  ) {
    return 'Opera';
  } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    return 'Chrome';
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    return 'Safari';
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    return 'Firefox';
  } else if (
    navigator.userAgent.indexOf('MSIE') != -1 ||
    !!document.documentMode == true
  ) {
    return 'IE'; //crap
  } else {
    return 'Unknown';
  }
};

export const isVideo = (filename) => {
  const { extension } = getFileExtension(filename);
  switch (extension.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
    case 'mov':
      // etc
      return true;
  }
  return false;
};

export const isNotEmployee = (partnerInfo) => {
  return (
    partnerInfo && partnerInfo.role && partnerInfo.role !== USER_ROLE.EMPLOYEE
  );
};

export const autoPlayVideo = (videoId) => {
  let video = document.getElementById(videoId);
  let promise = video.play();
  if (promise !== undefined) {
    promise
      .then((_) => {
        // Autoplay started!
      })
      .catch((error) => {
        // Autoplay not allowed!
        // Mute video and try to play again
        video.muted = true;
        video.play();
        // Show something in the UI that the video is muted
      });
  }
};
