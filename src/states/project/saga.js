import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';
import * as actions from './actions';
import {
  getAllFinanceReportSuccess,
  setFinanceReportLoading,
} from 'states/project/actions';
import { message } from 'antd';
import { CLIENTS_RELATIONSHIP } from 'routers/route-path';

function* getAllProject() {
  try {
    const res = yield call(() => axios.get(`${API.PROJECT}`));
    yield put(actions.getAllProjectSuccessful(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message || errData.Message });
  }
}

function* getProjects({ payload }) {
  try {
    const queryString = Object.entries(payload)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const res = yield call(() =>
      axios.get(`${API.PROJECT}/paged?${queryString}`)
    );
    yield put(actions.getProjectsSuccess({ ...res.data, ...payload }));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message || errData.Message });
  }
}

function* getOwnProjectJobs({ payload, callbackSuccess }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.PROJECT}/own/${payload}/jobs`)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message || errData.Message });
  }
}

function* createProject({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(`${API.PROJECT}`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message || errData.Message });
  }
}

function* updateProject({ payload, callbackSuccess }) {
  try {
    const {
      id,
      clientId,
      name,
      description,
      startDate,
      endDate,
      currency,
    } = payload;
    yield call(() =>
      axios.put(`${API.PROJECT}/${id}`, {
        id,
        clientId,
        name,
        description,
        currency,
        startDate,
        endDate,
      })
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message || errData.Message });
  }
}

function* deleteProject({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.PROJECT}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message || errData.Message });
  }
}

function* getProjectDetail({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.PROJECT}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createProjectDocuments({ payload, callbackSuccess }) {
  try {
    const { id, documents } = payload;
    const res = yield call(() =>
      axios.put(`${API.PROJECT}/${id}/documents`, documents)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* validateName({ payload, callbackSuccess, callbackFail }) {
  try {
    yield call(() => axios.get(`${API.PROJECT}/validate/name?name=${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* getOwnProject({ payload }) {
  try {
    const res = yield call(() =>
      axios.get(`${API.PROJECT_OWN}${payload ? `?type=${payload}` : ''}`)
    );
    yield put(actions.getOwnProjectSuccessful(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* inviteClientToProject({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.put(`${API.PROJECT_INVITE}`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    if (errData.message && errData.message.indexOf('{client}') > -1) {
      if (errData.additionaldata) {
        const client = errData.additionaldata.client;
        errData.message = errData.message.replace('{client}',
          `<a target="_blank" href="${CLIENTS_RELATIONSHIP}?client=${client.ClientId}">${client.Name}</a>`);
      }
      else
        errData.message = errData.message.replace('{client}', 'A client');
    }
    showModalError({ content: <span dangerouslySetInnerHTML={{ __html: errData.message }}></span> });
  }
}

function* getAllProjectFinanceReport({ payload }) {
  try {
    yield put(setFinanceReportLoading(true));
    const endPoint = `${API.PROJECTS.GET_FINANCE_REPORT(payload.id)}`;
    const { data } = yield call(() => axios.get(endPoint));
    yield put(getAllFinanceReportSuccess(data));
  } catch (e) {
    const errData = ErrorHandler.getErrorData(e);
    showModalError({ content: errData.message });
  } finally {
    yield put(setFinanceReportLoading(false));
  }
}

function* saveProjectFinanceReport({ payload }) {
  try {
    const endPoint = `${API.PROJECTS.SAVE_FINANCE_REPORT}`;
    const res = yield call(() => axios.post(endPoint, payload));
    const projectState = yield select((state) => {
      return state['PROJECT'];
    });
    const reports = projectState.toJS()['projectsFinanceReport'];
    res.data.forEach((id, idx) => {
      reports[idx].id = id;
    });
    yield put(getAllFinanceReportSuccess(reports));
    message.success('Save Finance Report success!');
  } catch (e) {
    const errData = ErrorHandler.getErrorData(e);
    showModalError({ content: errData.message });
  }
}

function* getSharedProjectDetail({ payload, callbackSuccess, callbackFail }) {
  try {
    const res = yield call(() => axios.get(`${API.PROJECT}/shared/${payload}`));
    callbackSuccess(res.data);
  } catch (e) {
    callbackFail(ErrorHandler.getErrorData(e));
  }
}

function* getEmployeeProject({ id }) {
  try {
    const res = yield call(() => axios.get(API.PROJECTS.PROJECT_EMPLOYEE(id)));
    yield put(actions.getEmployeeProjectSuccessful(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.CREATE_PROJECT, createProject);
  yield takeLatest(types.GET_ALL_PROJECT, getAllProject);
  yield takeLatest(types.GET_PROJECTS, getProjects);
  yield takeLatest(types.DELETE_PROJECT, deleteProject);
  yield takeLatest(types.GET_PROJECT_DETAIL, getProjectDetail);
  yield takeLatest(types.CREATE_PROJECT_DOCUMENTS, createProjectDocuments);
  yield takeLatest(types.UPDATE_PROJECT, updateProject);
  yield takeLatest(types.PROJECT_VALIDATE_NAME, validateName);
  yield takeLatest(types.GET_OWN_PROJECT, getOwnProject);
  yield takeLatest(types.INVITE_CLIENT_TO_PROJECT, inviteClientToProject);
  yield takeLatest(
    types.GET_ALL_FINANCE_REPORT.PROCESS,
    getAllProjectFinanceReport
  );
  yield takeLatest(types.SAVE_FINANCE_REPORT, saveProjectFinanceReport);
  yield takeLatest(types.GET_OWN_PROJECT_JOBS, getOwnProjectJobs);
  yield takeLatest(types.GET_SHARED_PROJECT_DETAIL, getSharedProjectDetail);
  yield takeLatest(types.GET_EMPLOYEE_PROJECT, getEmployeeProject);
}
