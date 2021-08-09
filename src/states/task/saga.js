import { call, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { message } from 'antd';

import * as types from './constants';

function* getTask({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.TASK}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getAllTasks({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(`${API.TASK}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createTask({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.TASK}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeTask({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.TASK}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateTask({ payload, callbackSuccess }) {
  try {
    const { id, description } = payload;
    yield call(() => axios.put(`${API.TASK}/${id}`, { ...payload }));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getAssignedTaskDetail({ payload, callbackSuccess }) {
  try {
    const { data } = yield call(() => axios.get(API.PUBLIC_ASSIGNED_TASK_DETAIL.replace(':token', payload)));
    callbackSuccess(data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateAssignedTaskDetail({ payload }) {
  try {
    yield call(() => axios.put(API.PUBLIC_UPDATE_ASSIGNED_TASK, payload));
    message.success('Update status success!');
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_TASK, getTask);
  yield takeLatest(types.CREATE_TASK, createTask);
  yield takeLatest(types.REMOVE_TASK, removeTask);
  yield takeLatest(types.UPDATE_TASK, updateTask);
  yield takeLatest(types.GET_ALL_TASKS, getAllTasks);
  yield takeLatest(types.PUBLIC_GET_ASSIGNED_TASK_DETAIL, getAssignedTaskDetail);
  yield takeLatest(types.PUBLIC_UPDATE_TASK_ASSIGNED, updateAssignedTaskDetail);
}
