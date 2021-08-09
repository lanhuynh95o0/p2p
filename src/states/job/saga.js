import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';

import * as types from './constants';
import { objectToQueryString } from 'utilities/stringHelper';
import * as actions from '../job/actions';

function* getJob({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.JOB}/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createJob({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(`${API.JOB}`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* invitePartner({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.post(`${API.JOB}/invite`, payload));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* completeJob({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.put(`${API.JOB}/${payload}/complete`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateJob({ payload, callbackSuccess }) {
  try {
    const {
      id,
      projectId,
      skills,
      name,
      description,
      startDate,
      endDate,
      estimateCost,
      currency,
      progress,
      participantPartnerId,
    } = payload;
    yield call(() =>
      axios.put(`${API.JOB}/${id}`, {
        id,
        projectId,
        skills,
        name,
        description,
        startDate,
        endDate,
        estimateCost,
        currency,
        progress,
        participantPartnerId,
      })
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeJob({ payload, callbackSuccess }) {
  try {
    yield call(() => axios.delete(`${API.JOB}/${payload}`));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* createJobDocuments({ payload, callbackSuccess }) {
  try {
    const { id, documents, assignedEmail } = payload;
    const res = yield call(() =>
      axios.put(`${API.JOB}/${id}/documents`, {
        assignedEmail,
        attachments: documents,
      })
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* validateName({ payload, callbackSuccess, callbackFail }) {
  try {
    const { name, projectId } = payload;
    yield call(() =>
      axios.get(`${API.JOB}/validate/name?name=${name}&projectId=${projectId}`)
    );
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* getJobInvitation({ payload, callbackSuccess, callbackFail }) {
  try {
    const res = yield call(() => axios.get(`${API.JOB}/get/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    callbackFail(errData.message);
  }
}

function* deleteJobInvitation({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.delete(`${API.JOB}/delete/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateJobInvitation({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.put(`${API.JOB}/update/${payload}`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getAssignedJobs({ payload }) {
  try {
    const query = objectToQueryString(payload);
    const res = yield call(() => axios.get(`${API.JOB}/assigned?${query}`));
    yield put(
      actions.getAssignedJobSuccess({
        total: res.data.total,
        list: res.data.result,
      })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* removeParticipantJob({ payload, callbackSuccess }) {
  try {
    const res = yield call(() =>
      axios.delete(`${API.JOB}/partner/delete/${payload}`)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getAssignedJobDetail({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.JOB}/${payload}/assigned`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getSharedJobDetail({ payload, callbackSuccess }) {
  try {
    const res = yield call(() => axios.get(`${API.JOB}/${payload}/shared`));
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* updateJobDuration({ payload, callbackSuccess }) {
  try {
    const { id, startDate, endDate, projectId } = payload;
    const res = yield call(() =>
      axios.put(`${API.JOB}/${id}/update-duration`, {
        startDate,
        endDate,
        projectId,
      })
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_JOB, getJob);
  yield takeLatest(types.CREATE_JOB, createJob);
  yield takeLatest(types.REMOVE_JOB, removeJob);
  yield takeLatest(types.CREATE_JOB_DOCUMENTS, createJobDocuments);
  yield takeLatest(types.UPDATE_JOB, updateJob);
  yield takeLatest(types.INVITE_PARTNER, invitePartner);
  yield takeLatest(types.JOB_VALIDATE_NAME, validateName);
  yield takeLatest(types.GET_JOB_DETAIL_INVITATION, getJobInvitation);
  yield takeLatest(types.DELETE_JOB_INVITATION, deleteJobInvitation);
  yield takeLatest(types.UPDATE_JOB_INVITATION, updateJobInvitation);
  yield takeLatest(types.GET_ASSIGNED_JOBS, getAssignedJobs);
  yield takeLatest(types.REMOVE_PARTICIPANT_JOB, removeParticipantJob);
  yield takeLatest(types.GET_ASSIGNED_JOB_DETAIL, getAssignedJobDetail);
  yield takeLatest(types.COMPLETE_JOB, completeJob);
  yield takeLatest(types.GET_SHARED_JOB_DETAIL, getSharedJobDetail);
  yield takeLatest(types.JOB_UPDATE_DURATION, updateJobDuration);
}
