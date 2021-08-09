import { call, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';

function* getNote({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.NOTE}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getNoteShare({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.NOTE}/${payload}/shared`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createNote({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.NOTE}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeNote({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.NOTE}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateNote({ payload, callbackSuccess }) {
  try {
    const { id } = payload;
    yield call(() => axios.put(`${API.NOTE}/${id}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_NOTE, getNote);
  yield takeLatest(types.CREATE_NOTE, createNote);
  yield takeLatest(types.REMOVE_NOTE, removeNote);
  yield takeLatest(types.UPDATE_NOTE, updateNote);
  yield takeLatest(types.GET_NOTE_SHARE, getNoteShare);
}
