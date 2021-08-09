import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';
import * as actions from './actions';
import { getFullName } from 'utilities/stringHelper';

function* inviteEmployee({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.INVITE_USER}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* registerInviteEmployee({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.post(`${API.REGISTER_INVITE_USER}`, payload));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* getInviteEmployeeInfo({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.INVITE_USER}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* getEmployees({ payload }) {
  try {
    const res = yield call(() =>
      axios.post(`${API.PARTNER_EMPLOYEE}`, payload)
    );
    yield put(
      actions.getEmployeesSuccess({
        total: res.data.total,
        list: res.data.result.map((_) => ({
          ..._,
          fullName: getFullName(_.firstName, _.lastName),
        })),
      })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* deleteEmployee({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.PARTNER_EMPLOYEE}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* addEmployeeToProject({ payload, callbackSuccess }) {
  try {
    const { userId, projectId } = payload;
    yield call(() =>
      axios.put(
        API.ADD_EMPLOYEE_TO_PROJECT.replace(':userId', userId).replace(
          ':projectId',
          projectId
        )
      )
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* editEmployee({ payload, callbackSuccess }) {
  try {
    yield call(() =>
      axios.put(`${API.PARTNER_EMPLOYEE}/${payload.id}`, { ...payload })
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_EMPLOYEES, getEmployees);
  yield takeLatest(types.INVITE_EMPLOYEE, inviteEmployee);
  yield takeLatest(types.GET_INVITE_EMPLOYEE_INFO, getInviteEmployeeInfo);
  yield takeLatest(types.REGISTER_INVITE_EMPLOYEE, registerInviteEmployee);
  yield takeLatest(types.DELETE_EMPLOYEE, deleteEmployee);
  yield takeLatest(types.ADD_EMPLOYEE_TO_PROJECT, addEmployeeToProject);
  yield takeLatest(types.EDIT_EMPLOYEE, editEmployee);
}
