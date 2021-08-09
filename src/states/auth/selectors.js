import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getAuthState = (state) => state[STATE_NAME];

const selectToken = () =>
  createSelector(getAuthState, (state) => state.getIn(['token']));

const selectUserRoles = () =>
  createSelector(getAuthState, (state) => state.getIn(['userInfo', 'roles']));

const selectUserInfo = () =>
  createSelector(getAuthState, (state) => state.getIn(['userInfo']));

export { selectToken, selectUserRoles, selectUserInfo };
