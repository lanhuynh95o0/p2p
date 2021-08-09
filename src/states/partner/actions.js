import * as types from './constants';

export const getPartnerAll = (payload, callbackSuccess) => ({
  type: types.GET_PARTNER_ALL,
  payload,
  callbackSuccess,
});

export const getPartnerBySubdomain = (
  payload,
  callbackSuccess,
  callbackError
) => ({
  type: types.GET_PARTNER_PROFILE_BY_SUBDOMAIN,
  payload,
  callbackSuccess,
  callbackError,
});

export const getPartnerProfile = (payload) => ({
  type: types.GET_PARTNER_PROFILE,
  payload,
});

export const getPartnerProfileSuccess = (payload) => ({
  type: types.GET_PARTNER_PROFILE_SUCCESS,
  payload,
});

export const getPartnerAssignedProjects = () => ({
  type: types.GET_PARTNER_ASSIGNED_PROJECTS,
});

export const getPartnerAssignedProjectsSuccess = (payload) => ({
  type: types.GET_PARTNER_ASSIGNED_PROJECTS_SUCCESS,
  payload,
});

export const getPartnerAssignedJobs = (payload, callbackSuccess) => ({
  type: types.GET_PARTNER_ASSIGNED_JOBS,
  payload,
  callbackSuccess,
});

export const updatePartner = (payload, callbackSuccess) => ({
  type: types.UPDATE_PARTNER,
  payload,
  callbackSuccess,
});

export const getPartnerParticipant = () => ({
  type: types.GET_PARTNER_PARTICIPANTS,
});

export const getPartnerParticipantSuccess = (payload) => ({
  type: types.GET_PARTNER_PARTICIPANTS_SUCCESS,
  payload,
});

export const partnerValidateSubdomain = (
  payload,
  callbackSuccess,
  callbackFail
) => ({
  type: types.PARTNER_VALIDATE_SUBDOMAIN,
  payload,
  callbackSuccess,
  callbackFail,
});

export const partnerValidateEmail = (
  payload,
  callbackSuccess,
  callbackFail
) => ({
  type: types.PARTNER_VALIDATE_EMAIL,
  payload,
  callbackSuccess,
  callbackFail,
});

export const partnerValidatePhone = (
  payload,
  callbackSuccess,
  callbackFail
) => ({
  type: types.PARTNER_VALIDATE_PHONE,
  payload,
  callbackSuccess,
  callbackFail,
});

export const reviewPartner = (payload, callbackSuccess) => ({
  type: types.REVIEW_PARTNER,
  payload,
  callbackSuccess,
});

export const partnerAddJob = (payload, callbackSuccess) => ({
  type: types.PARTNER_ADD_JOB,
  payload,
  callbackSuccess,
});

export const partnerRemoveJob = (payload, callbackSuccess) => ({
  type: types.PARTNER_REMOVE_JOB,
  payload,
  callbackSuccess,
});

export const partnerGetInfo = (cb = (f) => f) => ({
  type: types.PARTNER_GET_INFO,
  cb,
});

export const partnerGetInfoSuccess = (payload) => ({
  type: types.PARTNER_GET_INFO_SUCCESS,
  payload,
});
