import * as types from './constants';
import {
  GET_ALL_FINANCE_REPORT,
  SAVE_FINANCE_REPORT,
} from 'states/project/constants';

export const getAllProject = () => ({
  type: types.GET_ALL_PROJECT,
});

export const getAllProjectSuccessful = (payload) => ({
  type: types.GET_ALL_PROJECT_SUCCESSFUL,
  payload,
});

export const getProjects = (payload) => ({
  type: types.GET_PROJECTS,
  payload,
});

export const getProjectsSuccess = (payload) => ({
  type: types.GET_PROJECTS_SUCCESS,
  payload,
});

export const getOwnProjectsSuccess = (payload) => ({
  type: types.GET_OWN_PROJECTS_SUCCESS,
  payload,
});

export const getOwnProjectJobs = (payload, callbackSuccess) => ({
  type: types.GET_OWN_PROJECT_JOBS,
  payload,
  callbackSuccess,
});

export const createProject = (payload, callbackSuccess) => ({
  type: types.CREATE_PROJECT,
  payload,
  callbackSuccess,
});

export const updateProject = (payload, callbackSuccess) => ({
  type: types.UPDATE_PROJECT,
  payload,
  callbackSuccess,
});

export const deleteProject = (payload, callbackSuccess) => ({
  type: types.DELETE_PROJECT,
  payload,
  callbackSuccess,
});

export const getProjectDetail = (payload, callbackSuccess) => ({
  type: types.GET_PROJECT_DETAIL,
  payload,
  callbackSuccess,
});

export const createProjectDocuments = (payload, callbackSuccess) => ({
  type: types.CREATE_PROJECT_DOCUMENTS,
  payload,
  callbackSuccess,
});

export const projectValidateName = (
  payload,
  callbackSuccess,
  callbackFail
) => ({
  type: types.PROJECT_VALIDATE_NAME,
  payload,
  callbackSuccess,
  callbackFail,
});

export const toggleFinanceReportModal = (payload) => ({
  type: types.TOGGLE_FINANCE_REPORT_MODAL,
  payload,
});

export const getAllFinanceReport = (payload) => ({
  type: GET_ALL_FINANCE_REPORT.PROCESS,
  payload,
});

export const setFinanceReportLoading = (payload) => ({
  type: GET_ALL_FINANCE_REPORT.LOADING,
  payload,
});

export const getAllFinanceReportSuccess = (payload) => ({
  type: GET_ALL_FINANCE_REPORT.SUCCESS,
  payload,
});

export const saveFinanceReport = (payload) => ({
  type: SAVE_FINANCE_REPORT,
  payload,
});

export const getOwnProject = (payload) => ({
  type: types.GET_OWN_PROJECT,
  payload,
});

export const getOwnProjectSuccessful = (payload) => ({
  type: types.GET_OWN_PROJECT_SUCCESSFUL,
  payload,
});

export const inviteClientToProject = (payload, callbackSuccess) => ({
  type: types.INVITE_CLIENT_TO_PROJECT,
  payload,
  callbackSuccess,
});

export const getSharedProjectDetail = (
  payload,
  callbackSuccess,
  callbackFail
) => ({
  type: types.GET_SHARED_PROJECT_DETAIL,
  payload,
  callbackSuccess,
  callbackFail,
});

export const getEmployeeProject = (id) => ({
  type: types.GET_EMPLOYEE_PROJECT,
  id,
});

export const getEmployeeProjectSuccessful = (payload) => ({
  type: types.GET_EMPLOYEE_PROJECT_SUCCESSFUL,
  payload,
});
