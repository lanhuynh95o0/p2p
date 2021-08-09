import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'utilities/axios';
import { API } from 'constants/api';
import ErrorHandler from 'utilities/errorHandler';
import { showModalError } from 'utilities/modal';
import * as types from './constants';
import * as actions from './actions';
import { partnerGetInfoSuccess } from 'states/partner/actions';

function* checkCoupon({ payload }) {
  const { id, resolve, reject, stripeKey } = payload;
  try {
    const res = yield call(() =>
      axios.get(`billings/coupon`, { params: { id } })
    );
    if (res?.status === 200) {
      resolve(res?.data);
    }
  } catch (err) {
    reject();
  }
}

function* getSubscriptions() {
  try {
    const res = yield call(() => axios.get(`${API.BILLINGS_SUBSCRIPTIONS}`));
    yield put(actions.getSubscriptionSuccessful(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* cancelSubscriptions({ callbackSuccess }) {
  try {
    const res = yield call(() => axios.delete(`${API.BILLINGS_SUBSCRIPTIONS}`));
    yield put(partnerGetInfoSuccess(res.data));
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* checkoutPackage({ callbackSuccess }) {
  try {
    callbackSuccess();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getStripeKey() {
  try {
    const res = yield call(() => axios.get(API.STRIPE_KEY));

    yield put(actions.setStripeKey(res.data));
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* handlePaymentSubscription({ payload, cb }) {
  try {
    const res = yield call(() =>
      axios.post(API.BILLINGS_SUBSCRIPTIONS, payload)
    );

    cb(true, res.data);
  } catch (err) {
    cb();

    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* handlePaymentDocusign({ cb }) {
  try {
    const res = yield call(() => axios.get(API.BILLINGS_DOCUSIGN));

    cb(true, res.data);
  } catch (err) {
    cb();

    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
  }
}

function* getSubscriptionDetail({ payload }) {
  const { id, resolve, reject } = payload;
  try {
    const res = yield call(() =>
      axios.get(`${API.BILLINGS_SUBSCRIPTION_DETAIL}/${id}`)
    );
    yield put(actions.getDetailSubscriptionSuccess(res.data));
    resolve && resolve();
  } catch (err) {
    const errData = ErrorHandler.getErrorData(err);
    showModalError({ content: errData.message });
    reject && reject();
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_SUBSCRIPTION, getSubscriptions);
  yield takeLatest(types.CANCEL_SUBSCRIPTION, cancelSubscriptions);
  yield takeLatest(types.CHECKOUT_PACKAGE, checkoutPackage);
  yield takeLatest(types.GET_STRIPE_KEY, getStripeKey);
  yield takeLatest(types.PAYMENT_SUBSCRIPTION, handlePaymentSubscription);
  yield takeLatest(types.PAYMENT_DOCUSIGN, handlePaymentDocusign);
  yield takeLatest(types.GET_DETAIL_SUBSCRIPTION, getSubscriptionDetail);
  yield takeLatest(types.GET_COUPON, checkCoupon);
}
