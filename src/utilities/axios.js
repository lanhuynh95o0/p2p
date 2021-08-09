import axios from 'axios';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import API_DOMAIN from 'constants/api';
import { LANGUAGE, TOKEN } from 'constants/cookies';
import { get } from 'lodash';
import { lowerCaseKey, detectBrowser } from 'utilities/common';
import 'nprogress/nprogress.css';
import { LOGIN } from 'routers/route-path';
import { showModalError } from './modal';

let requestsCounter = 0;

const instance = axios.create({
  baseURL: `${API_DOMAIN}/`,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  requestsCounter++;
  NProgress.start();
  let token = Cookies.get(TOKEN);
  // if (isLocalHost) {
  //   token = localStorage.getItem(TOKEN);
  // }
  const language = Cookies.get(LANGUAGE) || 'en';

  config.headers.Authorization = token ? `Bearer ${token}` : '';
  config.headers['Accept-Language'] = language ? language : '';

  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (--requestsCounter === 0) {
      NProgress.done();
      if (detectBrowser() === 'Firefox') {
        const nprogress = document.getElementById('nprogress');
        if (nprogress) {
          nprogress.remove();
        }
      }
    }
    return response;
  },
  function (error) {
    // Do something with response error
    // console.log('err', error.toJSON());

    // Object.entries(error).map(([label, value], idx) => {
    //   console.log(`idx ${idx}`, label, value);
    // });
    if (--requestsCounter === 0) {
      NProgress.done();
      if (detectBrowser() === 'Firefox') {
        const nprogress = document.getElementById('nprogress');
        if (nprogress) {
          nprogress.remove();
        }
      }
    }

    const { status } = error.response;
    switch (status) {
      case 401:
        window.location.href = `${window.location.origin}${LOGIN}`;
        break;
      case 403:
      // todo
      case 500:
      default:
        // other case
        break;
    }

    const resp = lowerCaseKey(
      get(error, 'response.data') || { Message: 'Error !' }
    );
    return Promise.reject(resp);
  }
);

const updateProgress = (e) =>
  NProgress.inc(calculatePercentage(e.loaded, e.total));
const calculatePercentage = (loaded, total) => Math.floor(loaded * 1.0) / total;

instance.defaults.onDownloadProgress = updateProgress;
instance.defaults.onUploadProgress = updateProgress;

export default instance;
const CancelToken = axios.CancelToken;
const isCancel = axios.isCancel;
export { CancelToken, isCancel };
