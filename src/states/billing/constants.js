export const STATE_NAME = 'BILLING';

const PREFIX = `${STATE_NAME}_`;

export const GET_SUBSCRIPTION = 'GET_SUBSCRIPTION';
export const GET_SUBSCRIPTION_SUCCESSFUL = 'GET_SUBSCRIPTION_SUCCESSFUL';
export const CHECKOUT_PACKAGE = 'CHECKOUT_PACKAGE';
export const CHECKOUT_PACKAGE_SUCCESSFUL = 'CHECKOUT_PACKAGE_SUCCESSFUL';
export const CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION';
export const GET_DETAIL_SUBSCRIPTION = 'GET_DETAIL_SUBSCRIPTION';
export const GET_DETAIL_SUBSCRIPTION_SUCCESSFUL =
  'GET_DETAIL_SUBSCRIPTION_SUCCESSFUL';

export const GET_STRIPE_KEY = PREFIX + 'GET_STRIPE_KEY';
export const SET_STRIPE_KEY = PREFIX + 'SET_STRIPE_KEY';

export const PAYMENT_SUBSCRIPTION = PREFIX + 'PAYMENT_SUBSCRIPTION';

export const PAYMENT_DOCUSIGN = PREFIX + 'PAYMENT_DOCUSIGN';

export const GET_COUPON = PREFIX + 'GET_COUPON';