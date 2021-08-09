import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  contracts: { total: 0, list: [] },
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CONTRACTS_SUCCESS: {
      return state.set('contracts', payload);
    }
    default:
      return state;
  }
};
