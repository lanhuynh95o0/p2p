import * as types from './constants';

export const getTask = (payload, callbackSuccess) => ({
  type: types.GET_TASK,
  payload,
  callbackSuccess,
});

export const getAllTasks = (payload, callbackSuccess) => ({
  type: types.GET_ALL_TASKS,
  payload,
  callbackSuccess,
});

export const createTask = (payload, callbackSuccess) => ({
  type: types.CREATE_TASK,
  payload,
  callbackSuccess,
});

export const updateTask = (payload, callbackSuccess) => ({
  type: types.UPDATE_TASK,
  payload,
  callbackSuccess,
});

export const removeTask = (payload, callbackSuccess) => ({
  type: types.REMOVE_TASK,
  payload,
  callbackSuccess,
});

export const getAssignedTaskDetail = (payload, callbackSuccess) => ({
  type: types.PUBLIC_GET_ASSIGNED_TASK_DETAIL,
  payload,
  callbackSuccess
});

export const updateAssignedTask = payload => ({
  type: types.PUBLIC_UPDATE_TASK_ASSIGNED,
  payload
});