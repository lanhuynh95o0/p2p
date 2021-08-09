import * as types from './constants';

export const inviteEmployee = (payload, callbackSuccess) => ({
  type: types.INVITE_EMPLOYEE,
  payload,
  callbackSuccess,
});

export const getInviteEmployeeInfo = (payload, callbackSuccess) => ({
  type: types.GET_INVITE_EMPLOYEE_INFO,
  payload,
  callbackSuccess,
});

export const registerInviteEmployee = (payload, callbackSuccess) => ({
  type: types.REGISTER_INVITE_EMPLOYEE,
  payload,
  callbackSuccess,
});

export const getEmployees = (payload) => ({
  type: types.GET_EMPLOYEES,
  payload,
});

export const getEmployeesSuccess = (payload) => ({
  type: types.GET_EMPLOYEES_SUCCESS,
  payload,
});

export const deleteEmployee = (payload, callbackSuccess) => ({
  type: types.DELETE_EMPLOYEE,
  payload,
  callbackSuccess,
});

export const addEmployeeToProject = (payload, callbackSuccess) => ({
  type: types.ADD_EMPLOYEE_TO_PROJECT,
  payload,
  callbackSuccess,
});

export const editEmployee = (payload, callbackSuccess) => ({
  type: types.EDIT_EMPLOYEE,
  payload,
  callbackSuccess,
});
