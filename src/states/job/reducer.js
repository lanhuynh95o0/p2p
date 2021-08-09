import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  assignedJobs: { total: 0, list: [] },
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ASSIGNED_JOBS_SUCCESS: {
      return state.set('assignedJobs', payload);
    }
    default:
      return state;
  }
};
