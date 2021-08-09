import { takeLatest } from 'redux-saga/effects';
import * as types from 'states/document/constants';
import { GET_ALL_FILE } from 'states/document/constants';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { API } from 'constants/api';
import axios from 'utilities/axios';
import { call, put } from '@redux-saga/core/effects';
import { callActionWithStatus } from 'states/common/actions';
import { JOB_DETAIL } from 'routers/route-path';

function* getAllFiles({ payload, successCallback, errorCallback }) {
  try {
    const { data } = yield call(() =>
      axios.get(API.FILES.GET_JOB_FILE(payload.id))
    );
    yield put(callActionWithStatus(GET_ALL_FILE.SUCCESS, data));
  } catch (e) {
    const errData = ErrorHandler.getErrorData(e);
    showModalError({ content: errData.message });
    errorCallback(errData);
  }
}

function* deleteFile({
  payload,
  successCallback = () => {},
  errorCallback = () => {},
}) {
  const { history } = payload;
  try {
    yield call(() => axios.delete(`${API.FILE}?slug=${payload.file.slug}`));
    history.push(JOB_DETAIL.replace(':id', payload.job.id));
    successCallback();
  } catch (e) {
    const errData = ErrorHandler.getErrorData(e);
    showModalError({ content: errData.message });
    errorCallback();
  }
}

function* updateFile({
  payload,
  successCallback = () => {},
  errorCallback = () => {},
}) {
  try {
    yield call(() =>
      axios.put(API.FILES.UPDATE_JOB_FILE(payload.jobId, payload.fileId), {
        ...payload,
      })
    );
    successCallback();
  } catch (e) {
    const errData = ErrorHandler.getErrorData(e);
    showModalError({ content: errData.message });
    errorCallback();
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_ALL_FILE.PROCESS, getAllFiles);
  yield takeLatest(types.DELETE_FILE.PROCESS, deleteFile);
  yield takeLatest(types.UPDATE_JOB_DOCUMENT_FILE, updateFile);
}
