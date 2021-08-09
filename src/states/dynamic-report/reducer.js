import { fromJS } from 'immutable';
import * as types from './constants';
const initState = fromJS({
  reportData: null
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_DYNAMIC_REPORT_SUCCESS:
      return state.set('reportData', payload);
    default:
      return state;
  }
};
