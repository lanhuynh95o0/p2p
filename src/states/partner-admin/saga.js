import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import { pickBy } from 'lodash';

import * as types from './constants';
import * as actions from './actions';
import * as qs from 'querystring';

function* getPartnerAll({ payload }) {
  try {
    const params = { ...payload };
    params.industryId = payload.industryId ? [].concat(payload.industryId) : [];
    params.skillId = payload.skillId ? [].concat(payload.skillId) : [];
    params.isRelationship = !!payload.isRelationship;
    const res = yield call(() => axios.post(`${API.PARTNER_ALL}`, params));
    yield put(actions.getPartnersAllSuccess(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getRelationshipPartner({ payload }) {
  try {
    const queryStr = qs.stringify(pickBy(payload, (item) => item !== ''));
    const res = yield call(() =>
      axios.get(`${API.PARTNER_PROFILE}/participants/all?${queryStr}`)
    );
    yield put(actions.getRelationshipPartnersSuccess(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_PARTNER_ADMIN, getPartnerAll);
  yield takeLatest(types.GET_RELATIONSHIP_PARTNER, getRelationshipPartner);
}
