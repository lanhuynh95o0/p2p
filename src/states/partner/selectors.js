import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectPartnerProfile = () =>
  createSelector(getCommonState, (state) => state.getIn(['profile']));

const selectPartnerAssignedProjects = () =>
  createSelector(getCommonState, (state) => state.getIn(['assignedProjects']));

const selectPartnerParticipants = () =>
  createSelector(getCommonState, (state) => state.getIn(['participants']));

const selectPartnerInfo = () =>
  createSelector(getCommonState, (state) => state.getIn(['info']));

export {
  selectPartnerProfile,
  selectPartnerAssignedProjects,
  selectPartnerParticipants,
  selectPartnerInfo,
};
