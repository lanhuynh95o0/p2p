import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectPartnerData = () =>
  createSelector(getCommonState, (state) => state.getIn(['partnerData']));

const selectRelationshipPartnerData = () =>
  createSelector(getCommonState, (state) =>
    state.getIn(['partnerParticipant'])
  );

export { selectPartnerData, selectRelationshipPartnerData };
