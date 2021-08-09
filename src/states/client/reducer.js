import { fromJS } from 'immutable';
import * as types from './constants';
const initState = fromJS({
  clientData: null,
  clientDetail: null,
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CLIENTS_SUCCESS:
      return state.set('clientData', payload);
    case types.GET_CLIENT_DETAIL_SUCCESS:
      return state.set('clientDetail', payload);
    default:
      return state;
  }
};
