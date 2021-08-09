import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getBillingState = (state) => state[STATE_NAME];

export const selectSubscriptionData = () =>
  createSelector(getBillingState, (state) =>
    state.getIn(['subscriptionsData'])
  );

export const selectStripeKey = () =>
  createSelector(getBillingState, (state) => state.getIn(['stripeKey']));

export const selectSubscriptionDetail = () =>
  createSelector(getBillingState, (state) =>
    state.getIn(['subscriptionDetail'])
  );
