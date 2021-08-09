import * as types from './constants';

export const getNote = (payload, callbackSuccess) => ({
  type: types.GET_NOTE,
  payload,
  callbackSuccess,
});

export const getNoteShare = (payload, callbackSuccess) => ({
  type: types.GET_NOTE_SHARE,
  payload,
  callbackSuccess,
});

export const createNote = (payload, callbackSuccess) => ({
  type: types.CREATE_NOTE,
  payload,
  callbackSuccess,
});

export const updateNote = (payload, callbackSuccess) => ({
  type: types.UPDATE_NOTE,
  payload,
  callbackSuccess,
});

export const removeNote = (payload, callbackSuccess) => ({
  type: types.REMOVE_NOTE,
  payload,
  callbackSuccess,
});
