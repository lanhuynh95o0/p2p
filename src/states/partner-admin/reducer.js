import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  partnerData: null,
  partnerParticipant:null
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PARTNER_ADMIN_SUCCESS:
      return state.set('partnerData', payload);
    case types.GET_RELATIONSHIP_PARTNER_SUCCESS:
      return state.set('partnerParticipant', payload);
    default:
      return state;
  }
};
