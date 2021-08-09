import * as types from './constants';

export const getDynamicReports = (payload, field) => {
  return {
    type: types.GET_DYNAMIC_REPORT,
    payload,
    field
  }
};

export const getDynamicReportsSuccess = payload => ({
  type: types.GET_DYNAMIC_REPORT_SUCCESS,
  payload
});

export const exportToCsv = (payload, callbackSuccess) => ({
  type: types.EXPORT_TO_CSV,
  payload,
  callbackSuccess
});

