import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  inquiries: { total: 0, list: [] },
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_INQUIRY_SUCCESS: {
      return state.set('inquiries', payload);
    }
    default:
      return state;
  }
};
