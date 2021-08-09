import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  employees: { total: 0, list: [] },
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_EMPLOYEES_SUCCESS: {
      return state.set('employees', payload);
    }
    default:
      return state;
  }
};
