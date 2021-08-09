import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectInquiry = () =>
  createSelector(getCommonState, (state) => state.getIn(['inquiries']));

export { selectInquiry };
