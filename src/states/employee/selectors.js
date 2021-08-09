import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectPartnerEmployees = () =>
  createSelector(getCommonState, (state) => state.getIn(['employees']));

export { selectPartnerEmployees };
