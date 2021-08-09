import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { TOKEN } from 'constants/cookies';
import * as types from './constants';
import * as actions from './actions';
import { partnerGetInfo } from '../partner/actions';

const setSession = (
  { accessToken, accountType },
  redirectCallback = () => null
) => {
  // Set token
  Cookies.set(TOKEN, accessToken);
  Cookies.set(TOKEN, accessToken, {
    domain: `.${process.env.REACT_APP_HOST_NAME}`,
  });
  setTimeout(redirectCallback(), 100);
};

function* getUserInfo() {
  try {
    const res = yield call(() => axios.get(API.USER_INFO));
    yield put(actions.saveUserInfo(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* verifyMailOrPhone({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(API.VERIFY_EMAIL_OR_PHONE, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* confirmVerifyMailOrPhone({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.put(API.VERIFY_EMAIL_OR_PHONE, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* registerUser({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(API.REGISTER_USER, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* login({ payload, callbackSuccess, callbackError }) {
  try {
    const res = yield call(() => axios.post(API.LOGIN, payload));
    setSession(res.data, callbackSuccess);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackError(errData.message);
  }
}

function* requestForgotPassword({ payload, callbackSuccess }) {
  try {
    const res = yield call(() =>
      axios.post(API.REQUEST_RESET_PASSWORD, payload)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);

    showModalError({
      content: (
        <div dangerouslySetInnerHTML={{ __html: errData.message }}></div>
      ),
    });
  }
}

function* requestConfirmUser({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(API.REQUEST_CONFIRM_USER, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* confirmUser({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.put(API.REQUEST_CONFIRM_USER, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* resetPassword({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.put(API.RESET_PASSWORD, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getCurrentUser({ callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(API.PARTNER_PROFILE));

    yield put(actions.getCurrentUserSuccess(res.data));
    yield put(partnerGetInfo());
    callbackSuccess && callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getEmailByPhone({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(API.GET_EMAIL_BY_PHONE, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* requestGetEmailByPhone({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(API.REQUEST_GET_EMAIL_BY_PHONE, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_USER_INFO, getUserInfo);
  yield takeLatest(types.VERIFY_EMAIL_OR_PHONE, verifyMailOrPhone);
  yield takeLatest(
    types.CONFIRM_VERIFY_EMAIL_OR_PHONE,
    confirmVerifyMailOrPhone
  );
  yield takeLatest(types.REGISTER_USER, registerUser);
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.REQUEST_FORGOT_PASSWORD, requestForgotPassword);
  yield takeLatest(types.REQUEST_CONFIRM_USER, requestConfirmUser);
  yield takeLatest(types.CONFIRM_USER, confirmUser);
  yield takeLatest(types.RESET_PASSWORD, resetPassword);
  yield takeLatest(types.GET_CURRENT_USER_PROFILE, getCurrentUser);
  yield takeLatest(types.GET_EMAIL_BY_PHONE, getEmailByPhone);
  yield takeLatest(types.REQUEST_GET_EMAIL_BY_PHONE, requestGetEmailByPhone);
}
