import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import * as types from './constants';
import * as actions from './actions';
import * as qs from 'querystring';

function* getDynamicReports({ payload, field }) {
  try {
    const queryStr = qs.stringify(payload);
    let URL = '';
    switch (field) {
      case 'participants':
        URL = API.DYNAMIC_REPORT_PARTNER;
        break;
      case 'projects':
        URL = API.DYNAMIC_REPORT_PROJECT;
        break;
      case 'jobs':
        URL = API.DYNAMIC_REPORT_JOB;
        break;
      default:
        URL = API.DYNAMIC_REPORT_PARTNER;
        break;
    }
    const { data } = yield call(() => axios.get(`${URL}?${queryStr}`));
    yield put(actions.getDynamicReportsSuccess(data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* onExportToCsv({ payload, callbackSuccess }) {
  try {
    const queryStr = qs.stringify(payload);
    const res = yield call(() =>
      axios.get(`${API.DYNAMIC_REPORT_EXPORT_CSV}?${queryStr}`)
    );
    callbackSuccess(res.data);
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_DYNAMIC_REPORT, getDynamicReports);
  yield takeLatest(types.EXPORT_TO_CSV, onExportToCsv);
}
