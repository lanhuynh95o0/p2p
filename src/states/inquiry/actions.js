import * as types from './constants';

export const getInquiry = (payload) => ({
  type: types.GET_INQUIRY,
  payload,
});

export const getInquirySuccess = (payload) => ({
  type: types.GET_INQUIRY_SUCCESS,
  payload,
});

export const changeInquiryStatus = (payload) => ({
  type: types.CHANGE_INQUIRY_STATUS,
  payload,
});
