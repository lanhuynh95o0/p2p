import * as types from './constants';

export const checkCoupon = (payload) => ({
  type: types.GET_COUPON,
  payload,
});

export const getSubscription = () => ({
  type: types.GET_SUBSCRIPTION,
});

export const getSubscriptionSuccessful = (payload) => ({
  type: types.GET_SUBSCRIPTION_SUCCESSFUL,
  payload,
});

export const cancelSubscription = (callbackSuccess) => ({
  type: types.CANCEL_SUBSCRIPTION,
  callbackSuccess,
});

export const checkoutPackage = (callbackSuccess) => ({
  type: types.CHECKOUT_PACKAGE,
  callbackSuccess,
});

export const getStripeKey = () => ({
  type: types.GET_STRIPE_KEY,
});

export const setStripeKey = (payload) => ({
  type: types.SET_STRIPE_KEY,
  payload,
});

export const paymentSubscription = (payload, cb) => ({
  type: types.PAYMENT_SUBSCRIPTION,
  payload,
  cb,
});

export const paymentDocusign = (cb) => ({
  type: types.PAYMENT_DOCUSIGN,
  cb,
});

export const getDetailSubscription = (payload) => ({
  type: types.GET_DETAIL_SUBSCRIPTION,
  payload,
});

export const getDetailSubscriptionSuccess = (payload) => ({
  type: types.GET_DETAIL_SUBSCRIPTION_SUCCESSFUL,
  payload,
});
