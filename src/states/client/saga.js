import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import * as types from './constants';
import * as actions from './actions';
import * as qs from 'querystring';

function* getClientDetail({ payload, callbackSuccess }) {
  try {
    const { id } = payload;
    if (id) {
      const { data } = yield call(() => axios.get(`${API.CLIENT}/${id}`));
      if (callbackSuccess) callbackSuccess(data);
      yield put(actions.getClientDetailSuccess(data));
    } else {
      yield put(actions.getClientDetailSuccess(null));
    }
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getClients({ payload }) {
  try {
    const queryStr = qs.stringify(payload);
    const { data } = yield call(() => axios.get(`${API.CLIENT}?${queryStr}`));
    yield put(actions.getClientsSuccess(data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createClient({ payload, callbackSuccess }) {
  try {
    let url = payload.inquiryId
      ? API.CLIENT_FROM_INQUIRY(payload.inquiryId)
      : API.CLIENT;

    yield call(() => axios.post(url, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateClient({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.put(`${API.CLIENT}/${payload.id}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* deleteClient({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.CLIENT}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* clientReject({ payload, callbackSuccess, callbackFail }) {
  try {
    yield call(() => axios.put(`${API.PROJECT}/client/${payload}`));
    callbackSuccess();
  } catch (err) {
    callbackFail(ErrorHandler.getErrorData(err));
  }
}

function* checkClientName({
  payload: { name, id },
  callbackSuccess,
  callbackFail,
}) {
  try {
    yield call(() =>
      axios.get(`${API.VALIDATE_CLIENT_NAME}?id=${id}&name=${name}`)
    );
    callbackSuccess();
  } catch (err) {
    callbackFail(ErrorHandler.getErrorData(err));
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_CLIENT_DETAIL, getClientDetail);
  yield takeLatest(types.GET_CLIENTS, getClients);
  yield takeLatest(types.CREATE_CLIENT, createClient);
  yield takeLatest(types.UPDATE_CLIENT, updateClient);
  yield takeLatest(types.DELETE_CLIENT, deleteClient);
  yield takeLatest(types.CLIENT_REJECT, clientReject);
  yield takeLatest(types.CHECK_CLIENT_NAME, checkClientName);
}
