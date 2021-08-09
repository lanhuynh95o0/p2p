import { call, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';

function* getComment({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.COMMENT}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createComment({ payload, callbackSuccess }) {
  try {
    let url = payload.isPublic ? API.COMMENT_ANONYMOUS : API.COMMENT;

    yield call(() => axios.post(`${url}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeComment({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.COMMENT}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateComment({ payload, callbackSuccess }) {
  try {
    const { id, content } = payload;
    yield call(() => axios.put(`${API.COMMENT}/${id}`, { id, content }));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_COMMENT, getComment);
  yield takeLatest(types.CREATE_COMMENT, createComment);
  yield takeLatest(types.REMOVE_COMMENT, removeComment);
  yield takeLatest(types.UPDATE_COMMENT, updateComment);
}
