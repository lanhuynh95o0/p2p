import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';
const getCommonState = (state) => state[STATE_NAME];
const selectReportData = () =>
  createSelector(getCommonState, (state) => state.getIn(['reportData']));
  
export { 
  selectReportData
};
