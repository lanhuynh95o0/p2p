import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectAssignedJobs = () =>
  createSelector(getCommonState, (state) => state.getIn(['assignedJobs']));

export { selectAssignedJobs };
