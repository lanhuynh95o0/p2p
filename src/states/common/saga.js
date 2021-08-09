import {
  put,
  takeLatest,
  call,
  takeEvery,
  all,
  select,
} from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { uniq } from 'lodash';

import * as types from './constants';
import * as actions from './actions';
import * as qs from 'querystring';
import { checkStatusSuccess, getBase64 } from 'utilities/common';
import { objectToQueryString } from 'utilities/stringHelper';

import { message } from 'antd';

function* getCountries({ isIncludeInActive = false }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.COMMON_COUNTRY}?isIncludeInActive=${isIncludeInActive}`)
    );
    // if (checkStatusSuccess(res.status)) {

    let obj = {};

    res.data.forEach((c) => (obj[c.code] = c.name));

    yield put(actions.getCountriesSuccess({ arr: res.data, obj }));
    // }
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getCities({ payload }) {
  try {
    const res = yield call(() => axios.get(`${API.COMMON_COUNTRY}/${payload}`));
    if (checkStatusSuccess(res.status)) {
      const data = uniq(res.data);
      yield put(actions.getCitiesSuccess(data));
    }
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getPhoneCodes() {
  try {
    const res = yield call(() => axios.get(`${API.COMMON_PHONE_CODE}`));
    if (checkStatusSuccess(res.status)) {
      yield put(actions.getPhoneCodesSuccess(res.data));
    }
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getCategoriesSkills() {
  try {
    const res = yield call(() => axios.get(`${API.COMMON_SKILLS}`));
    if (checkStatusSuccess(res.status)) {
      yield put(actions.getCategoriesSkillsSuccess(res.data));
    }
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getCurrencies() {
  try {
    // const res = yield call(() => axios.get(`${API.COMMON_SKILLS}`));
    yield put(
      actions.getCurrenciesSuccess([
        { id: 'AUD', name: 'AUD' },
        { id: 'NZD', name: 'NZD' },
      ])
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeFile({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.FILE}?slug=${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* uploadFile({ payload, config, callbackSuccess, folder = '' }) {
  try {
    const { name } = payload;
    const fileBase64 = yield call(() => getBase64(payload));
    const data = {
      name,
      displayName: name,
      contentBase64: fileBase64,
      folder,
      isEnableCompressImage: true,
      imageMaxWidthPx: 0,
      imageMaxHeightPx: 0,
    };
    const res = yield call(() => axios.post(API.FILE, data, config || {}));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateFile({ id, payload, config, callbackSuccess }) {
  try {
    const { displayName } = payload;
    const data = {
      displayName,
    };
    const res = yield call(() => axios.put(API.FILES.UPDATE_FILE(id), data, config || {}));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* downloadFile({ payload }) {
  try {
    const { uri, name } = payload;
    const res = yield call(() =>
      axios.get(`${API.FILE}/download?RemoteUri=${uri}&FileName${name}`)
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeBulkFile({ payload, callbackSuccess }) {
  try {
    yield call(() =>
      axios.post(`${API.FILE}/bulk`, { ...payload, physical: true })
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* onGetRoleEmployee() {
  try {
    const { data } = yield call(() => axios.get(API.GET_ROLE_EMPLOYEE));
    yield put(actions.getRoleEmployeeSuccess(data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getConfiguration() {
  try {
    const data = yield all([
      call(() => axios.get(API.GET_COMPANY_ADDRESS)),
      call(() => axios.get(API.GET_CONTACT_EMAIL)),
      call(() => axios.get(API.GET_CONTACT_PHONE)),
      call(() => axios.get(API.GET_CONTACT_POLICY)),
      call(() => axios.get(API.GET_CONTACT_TERM_AND_CONDITION)),
      call(() => axios.get(API.GET_ABOUT_US)),
    ]);
    const [
      addressData,
      emailData,
      phoneData,
      policyData,
      termConditionData,
      aboutUs,
    ] = data;
    yield put(
      actions.getConfigurationSuccess({
        companyAddress: addressData.data,
        contactEmail: emailData.data,
        contactPhone: phoneData.data,
        policy: policyData.data,
        termAndCondition: termConditionData.data,
        aboutUs: aboutUs.data,
      })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getNotificationPaging({ payload }) {
  try {
    const queryStr = qs.stringify(payload);
    const { data } = yield call(() =>
      axios.get(`${API.GET_NOTIFICATION_PAGING}?${queryStr}`)
    );
    // Update local
    const notificationData = yield select((state) =>
      state[types.STATE_NAME].get('notificationData')
    );
    if (notificationData && payload.skip) {
      notificationData.result = [...notificationData.result, ...data.result];
      yield put(actions.getNotificationPagingSuccess({ ...notificationData }));
      return;
    }
    yield put(actions.getNotificationPagingSuccess({ ...data }));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* countUnreadNotifications() {
  try {
    const { data } = yield call(() =>
      axios.get(API.COUNT_UNREAD_NOTIFICATIONS)
    );
    yield put(actions.countUnreadNotificationsSuccess(data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* markNotificationRead({ payload }) {
  try {
    yield call(() =>
      axios.put(API.MARK_NOTIFICATION_READ.replace(':id', payload))
    );
    // Update local
    const notificationData = yield select((state) =>
      state[types.STATE_NAME].get('notificationData')
    );
    notificationData.result = notificationData.result.map((item) => {
      if (item.id !== payload) {
        return item;
      }
      return { ...item, unread: false };
    });
    yield put(
      actions.updateNotificationData({ notificationData, isReadAll: false })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* markAllNotificationRead() {
  try {
    yield call(() => axios.put(API.MARK_ALL_NOTIFICATION_READ));
    // Update local
    const notificationData = yield select((state) =>
      state[types.STATE_NAME].get('notificationData')
    );
    notificationData.result = notificationData.result.map((item) => {
      return { ...item, unread: false };
    });
    yield put(
      actions.updateNotificationData({ notificationData, isReadAll: true })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* deleteNotification({ payload }) {
  try {
    yield call(() =>
      axios.delete(API.DELETE_NOTIFICATION.replace(':id', payload))
    );
    // Update local
    const notificationData = yield select((state) =>
      state[types.STATE_NAME].get('notificationData')
    );
    notificationData.result = notificationData.result.filter(
      (item) => item.id !== payload
    );

    yield put(actions.getNotificationPagingSuccess({ ...notificationData }));
    message.success('Delete notification success!');
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* deleteAllNotification({ payload }) {
  try {
    yield call(() => axios.delete(API.DELETE_ALL_NOTIFICATION));
    // Update local
    yield put(actions.getNotificationPagingSuccess(null));
    message.success('Delete all notification success!');
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* generateAPIKey({
  successCallback = () => { },
  errorCallback = () => { },
}) {
  try {
    const { data } = yield call(() => axios.get(API.GENERATE_API_KEY));
    successCallback(data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
    errorCallback();
  }
}

function* getSkills({ payload }) {
  try {
    const params = { ...payload };
    params.categoryIds = payload.categoryIds?.map((it) => +it);

    const res = yield call(() => axios.post('admins/skills/all', params));
    const { result = [] } = res.data;
    const newData = result.map((it) => ({ ...it, id: it.id + '' }));
    yield put(actions.getSkillsSuccess(newData));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getCategories() {
  try {
    const res = yield call(() => axios.get(`${API.ADMIN_CATEGORIES}`));
    yield put(
      actions.getCategoriesSuccess(
        res.data.map((it) => ({ ...it, id: it.id + '' }))
      )
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_COUNTRIES, getCountries);
  yield takeLatest(types.GET_CITIES, getCities);
  yield takeLatest(types.GET_PHONE_CODES, getPhoneCodes);
  yield takeLatest(types.GET_CATEGORIES_SKILLS, getCategoriesSkills);
  yield takeLatest(types.GET_CURRENCIES, getCurrencies);
  yield takeLatest(types.REMOVE_FILE, removeFile);
  yield takeEvery(types.UPLOAD_FILE, uploadFile);
  yield takeEvery(types.UPDATE_FILE, updateFile);
  yield takeLatest(types.DOWNLOAD_FILE, downloadFile);
  yield takeLatest(types.REMOVE_BULK_FILE, removeBulkFile);
  yield takeLatest(types.GET_ROLE_EMPLOYEE, onGetRoleEmployee);
  yield takeEvery(types.GET_CONFIGURATION, getConfiguration);
  yield takeLatest(types.GET_NOTIFICATION_PAGING, getNotificationPaging);
  yield takeLatest(types.COUNT_UNREAD_NOTIFICATIONS, countUnreadNotifications);
  yield takeLatest(types.MARK_NOTIFICATION_READ, markNotificationRead);
  yield takeLatest(types.MARK_ALL_NOTIFICATION_READ, markAllNotificationRead);
  yield takeLatest(types.DELETE_NOTIFICATION, deleteNotification);
  yield takeLatest(types.DELETE_ALL_NOTIFICATION, deleteAllNotification);
  yield takeLatest(types.GENERATE_API_KEY, generateAPIKey);
  yield takeLatest(types.GET_CATEGORIES, getCategories);
  yield takeLatest(types.GET_SKILLS, getSkills);
}
