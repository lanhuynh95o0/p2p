import * as types from './constants';

export const getComment = (payload, callbackSuccess) => ({
  type: types.GET_COMMENT,
  payload,
  callbackSuccess,
});

export const createComment = (payload, callbackSuccess) => ({
  type: types.CREATE_COMMENT,
  payload,
  callbackSuccess,
});

export const updateComment = (payload, callbackSuccess) => ({
  type: types.UPDATE_COMMENT,
  payload,
  callbackSuccess,
});

export const removeComment = (payload, callbackSuccess) => ({
  type: types.REMOVE_COMMENT,
  payload,
  callbackSuccess,
});
