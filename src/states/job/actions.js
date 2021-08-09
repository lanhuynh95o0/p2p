import * as types from './constants';

export const createJobDocuments = (payload, callbackSuccess) => ({
  type: types.CREATE_JOB_DOCUMENTS,
  payload,
  callbackSuccess,
});

export const getJob = (payload, callbackSuccess) => ({
  type: types.GET_JOB,
  payload,
  callbackSuccess,
});

export const createJob = (payload, callbackSuccess) => ({
  type: types.CREATE_JOB,
  payload,
  callbackSuccess,
});

export const updateJob = (payload, callbackSuccess) => ({
  type: types.UPDATE_JOB,
  payload,
  callbackSuccess,
});

export const removeJob = (payload, callbackSuccess) => ({
  type: types.REMOVE_JOB,
  payload,
  callbackSuccess,
});

export const invitePartnerForJob = (payload, callbackSuccess) => ({
  type: types.INVITE_PARTNER,
  payload,
  callbackSuccess,
});

export const jobValidateName = (payload, callbackSuccess, callbackFail) => ({
  type: types.JOB_VALIDATE_NAME,
  payload,
  callbackSuccess,
  callbackFail,
});

export const getJobInvitation = (payload, callbackSuccess, callbackFail) => ({
  type: types.GET_JOB_DETAIL_INVITATION,
  payload,
  callbackSuccess,
  callbackFail,
});

export const deleteJobInvitation = (payload, callbackSuccess) => ({
  type: types.DELETE_JOB_INVITATION,
  payload,
  callbackSuccess,
});

export const updateJobInvitation = (payload, callbackSuccess) => ({
  type: types.UPDATE_JOB_INVITATION,
  payload,
  callbackSuccess,
});

export const getAssignedJob = (payload) => ({
  type: types.GET_ASSIGNED_JOBS,
  payload,
});

export const getAssignedJobSuccess = (payload) => ({
  type: types.GET_ASSIGNED_JOBS_SUCCESS,
  payload,
});

export const removeParticipantJob = (payload, callbackSuccess) => ({
  type: types.REMOVE_PARTICIPANT_JOB,
  payload,
  callbackSuccess,
});

export const getAssignedJobDetail = (payload, callbackSuccess) => ({
  type: types.GET_ASSIGNED_JOB_DETAIL,
  payload,
  callbackSuccess,
});

export const completeJob = (payload, callbackSuccess) => ({
  type: types.COMPLETE_JOB,
  payload,
  callbackSuccess,
});

export const getSharedJobDetail = (payload, callbackSuccess) => ({
  type: types.GET_SHARED_JOB_DETAIL,
  payload,
  callbackSuccess,
});

export const updateJobDuration = (payload, callbackSuccess) => ({
  type: types.JOB_UPDATE_DURATION,
  payload,
  callbackSuccess,
});
