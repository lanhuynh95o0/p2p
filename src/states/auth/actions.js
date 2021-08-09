import * as types from './constants';

export const getUserInfo = () => ({
  type: types.GET_USER_INFO,
});

export const saveUserInfo = (payload) => ({
  type: types.SAVE_USER_INFO,
  payload,
});

export const verifyEmailOrPhone = (payload, callbackSuccess) => ({
  type: types.VERIFY_EMAIL_OR_PHONE,
  payload,
  callbackSuccess
});

export const confirmVerifyEmailOrPhone = (payload, callbackSuccess) => ({
  type: types.CONFIRM_VERIFY_EMAIL_OR_PHONE,
  payload,
  callbackSuccess
});

export const registerUser = (payload, callbackSuccess) => ({
  type: types.REGISTER_USER,
  payload,
  callbackSuccess
});

export const login = (payload, callbackSuccess, callbackError) => ({
  type: types.LOGIN,
  payload,
  callbackSuccess,
  callbackError
});

export const loginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
});

export const requestForgotPassword = (payload, callbackSuccess) => ({
  type: types.REQUEST_FORGOT_PASSWORD,
  payload,
  callbackSuccess
});

export const requestConfirmUser = (payload, callbackSuccess) => ({
  type: types.REQUEST_CONFIRM_USER,
  payload,
  callbackSuccess
});

export const confirmUser = (payload, callbackSuccess) => ({
  type: types.CONFIRM_USER,
  payload,
  callbackSuccess
});

export const resetPassword = (payload, callbackSuccess) => ({
  type: types.RESET_PASSWORD,
  payload,
  callbackSuccess
});

export const getCurrentUser = callbackSuccess => ({
  type: types.GET_CURRENT_USER_PROFILE,
  callbackSuccess
});

export const getCurrentUserSuccess = payload => ({
  type: types.GET_CURRENT_USER_PROFILE_SUCCESS,
  payload
});

export const getEmailByPhone = (payload, callbackSuccess) => ({
  type: types.GET_EMAIL_BY_PHONE,
  payload,
  callbackSuccess
});

export const requestGetEmailByPhone = (payload, callbackSuccess) => ({
  type: types.REQUEST_GET_EMAIL_BY_PHONE,
  payload,
  callbackSuccess
});