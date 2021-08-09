import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';
import * as actions from './actions';
import { objectToQueryString } from 'utilities/stringHelper';

function* getPartnerAll({ payload, callbackSuccess }) {
  try {
    const res = yield call(() =>
      axios.post(`${API.PARTNER_PROFILE}/all`, payload)
    );
    callbackSuccess && callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getProfile({ payload }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.PARTNER_PROFILE}/${payload}`)
    );
    yield put(actions.getPartnerProfileSuccess(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getAssignedProjects() {
  try {
    const res = yield call(() => axios.get(`${API.PARTNER_PROFILE}/projects`));
    yield put(actions.getPartnerAssignedProjectsSuccess(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getAssignedJobs({ payload, callbackSuccess }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.PARTNER_PROFILE}/projects/${payload}/jobs`)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updatePartner({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.put(`${API.REGISTER_USER}`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getPartnerBySubdomain({ payload, callbackSuccess, callbackError }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.PARTNER_PROFILE}/sub?subDomain=${payload}`)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackError(errData);
  }
}

function* getPartnerParticipants({ payload }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.PARTNER_PROFILE}/participants`)
    );
    yield put(actions.getPartnerParticipantSuccess(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* validateSubdomain({ payload, callbackSuccess, callbackFail }) {
  try {
    yield call(() =>
      axios.get(
        `${API.PARTNER_PROFILE}/validate/subdomain?subdomain=${payload}`
      )
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* validateEmail({ payload, callbackSuccess, callbackFail }) {
  try {
    yield call(() =>
      axios.get(`${API.PARTNER_PROFILE}/validate/email?email=${payload}`)
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* validatePhone({ payload, callbackSuccess, callbackFail }) {
  try {
    const { code, phone } = payload;
    yield call(() =>
      axios.get(
        `${
          API.PARTNER_PROFILE
        }/validate/phone?phone=${phone}&code=${code.replace('+', '%2B')}`
      )
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* reviewPartner({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.JOB}/review`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* partnerAddJob({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.PARTNER_PROFILE}/jobs/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* partnerRemoveJob({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.PARTNER_PROFILE}/jobs/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* partnerGetInfo({ cb }) {
  try {
    const res = yield call(() => axios.get(`${API.PARTNER_PROFILE}/info`));
    cb(res.data);
    yield put(actions.partnerGetInfoSuccess(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_PARTNER_PROFILE, getProfile);
  yield takeLatest(types.GET_PARTNER_ASSIGNED_PROJECTS, getAssignedProjects);
  yield takeLatest(types.GET_PARTNER_ASSIGNED_JOBS, getAssignedJobs);
  yield takeLatest(types.GET_PARTNER_ALL, getPartnerAll);
  yield takeLatest(types.UPDATE_PARTNER, updatePartner);
  yield takeLatest(
    types.GET_PARTNER_PROFILE_BY_SUBDOMAIN,
    getPartnerBySubdomain
  );
  yield takeLatest(types.GET_PARTNER_PARTICIPANTS, getPartnerParticipants);
  yield takeLatest(types.PARTNER_VALIDATE_SUBDOMAIN, validateSubdomain);
  yield takeLatest(types.PARTNER_VALIDATE_EMAIL, validateEmail);
  yield takeLatest(types.PARTNER_VALIDATE_PHONE, validatePhone);
  yield takeLatest(types.REVIEW_PARTNER, reviewPartner);
  yield takeLatest(types.PARTNER_ADD_JOB, partnerAddJob);
  yield takeLatest(types.PARTNER_REMOVE_JOB, partnerRemoveJob);
  yield takeLatest(types.PARTNER_GET_INFO, partnerGetInfo);
}
