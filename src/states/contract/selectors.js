import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectContracts = () =>
  createSelector(getCommonState, (state) => state.getIn(['contracts']));

export { selectContracts };
