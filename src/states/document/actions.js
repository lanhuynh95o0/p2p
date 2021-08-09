import * as type from './constants';
//
// export const getAllFile = (payload) => ({
//   type: GET_ALL_FILE.PROCESS,
//   payload,
// });

export const updateJobDocumentFile = (
  payload,
  successCallback,
  errorCallback
) => ({
  type: type.UPDATE_JOB_DOCUMENT_FILE,
  payload,
  successCallback,
  errorCallback,
});
