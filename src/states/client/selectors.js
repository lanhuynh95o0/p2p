import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getClientState = (state) => state[STATE_NAME];

const selectClientData = () =>
  createSelector(getClientState, (state) => state.getIn(['clientData']));

const selectClientDetail = () =>
  createSelector(getClientState, (state) => state.getIn(['clientDetail']));

export {
  selectClientData,
  selectClientDetail
};
