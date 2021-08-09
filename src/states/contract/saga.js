import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';
import { objectToQueryString } from 'utilities/stringHelper';
import * as actions from '../contract/actions';

function* getContract({ payload, callbackSuccess, callbackFail }) {
  try {
    const res = yield call(() => axios.get(`${API.CONTRACT}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* createContract({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.CONTRACT}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateContract({ payload, callbackSuccess }) {
  try {
    const { id, body } = payload;
    yield call(() => axios.put(`${API.CONTRACT}/${id}`, body));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeContract({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.CONTRACT}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getContractPath({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.CONTRACT}/${payload}/path`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* signContract({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.put(`${API.CONTRACT}/sign`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* signContractDocusign({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(`${API.CONTRACT}/sign`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getContracts({ payload }) {
  try {
    const query = objectToQueryString(payload);
    const res = yield call(() => axios.get(`${API.CONTRACT}?${query}`));
    yield put(
      actions.getContractsSuccess({
        total: res.data.total,
        list: res.data.result,
      })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* verifyContract({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(`${API.CONTRACT}/verify`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createContractFromTemplate({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(API.CREATE_CONTRACT_FROM_TEMPLATE, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateContractFromTemplate({ payload, callbackSuccess }) {
  try {
    yield call(() =>
      axios.post(API.UPDATE_CONTRACT_FROM_TEMPLATE(payload.contractId), payload)
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.CREATE_CONTRACT, createContract);
  yield takeLatest(types.REMOVE_CONTRACT, removeContract);
  yield takeLatest(types.UPDATE_CONTRACT, updateContract);
  yield takeLatest(types.GET_CONTRACT, getContract);
  yield takeLatest(types.GET_CONTRACT_PATH, getContractPath);
  yield takeLatest(types.SIGN_CONTRACT, signContract);
  yield takeLatest(types.SIGN_CONTRACT_DOCUSIGN, signContractDocusign);
  yield takeLatest(types.GET_CONTRACTS, getContracts);
  yield takeLatest(types.VERIFY_CONTRACT, verifyContract);
  yield takeLatest(
    types.CREATE_CONTRACT_FROM_TEMPLATE,
    createContractFromTemplate
  );
  yield takeLatest(
    types.UPDATE_CONTRACT_FROM_TEMPLATE,
    updateContractFromTemplate
  );
}
