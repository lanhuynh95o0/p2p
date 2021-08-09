import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { messageSuccess } from 'utilities/message';

import * as types from './constants';
import * as actions from './actions';
import { getFullName } from 'utilities/stringHelper';
import * as qs from 'querystring';

function* getInquiry({ payload }) {
  try {
    const queryStr = qs.stringify(payload).replace('&filterBy=%20', '');

    const res = yield call(() => axios.get(`${API.INQUIRY}?${queryStr}`));
    yield put(
      actions.getInquirySuccess({
        total: res.data.total,
        list: res.data.result.map((_) => ({
          ..._,
          fullName: getFullName(_.firstName, _.lastName),
        })),
      })
    );
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

function* changeInquiryStatus({ payload }) {
  try {
    yield call(() => axios.put(`${API.INQUIRY}/${payload.id}`, payload.data));

    yield put(actions.getInquiry(payload.query));

    messageSuccess({
      content: 'Change status success',
    });
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.Message || errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_INQUIRY, getInquiry);
  yield takeLatest(types.CHANGE_INQUIRY_STATUS, changeInquiryStatus);
}
