import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  subscriptionsData: [],
  stripeKey: null,
  subscriptionDetail: null,
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_SUBSCRIPTION_SUCCESSFUL:
      return state.set('subscriptionsData', payload);
    case types.SET_STRIPE_KEY:
      return state.set('stripeKey', payload);
    case types.GET_DETAIL_SUBSCRIPTION_SUCCESSFUL:
      return state.set('subscriptionDetail', payload);
    default:
      return state;
  }
};
