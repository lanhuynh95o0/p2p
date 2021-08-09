import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getCommonState = (state) => state[STATE_NAME];

const selectProjects = () =>
  createSelector(getCommonState, (state) => state.getIn(['projects']));

const getTotal = (state, type) => {
  let total = 0;
  state.forEach((reportItem) => {
    Object.entries(reportItem).forEach(([key, value]) => {
      if (key.includes(type)) total += value;
    });
  });
  return total;
};

const selectOwnProjectData = () =>
  createSelector(getCommonState, (state) => state.getIn(['ownProjects']));

export const selectTotalCost = () =>
  createSelector(getCommonState, (state) =>
    getTotal(state.getIn(['projectsFinanceReport']), 'Cost')
  );

export const selectTotalSold = () =>
  createSelector(getCommonState, (state) =>
    getTotal(state.getIn(['projectsFinanceReport']), 'Sold')
  );

export const selectEmployeeProjectData = () =>
  createSelector(getCommonState, (state) => state.getIn(['employeeProject']));

export { selectProjects, selectOwnProjectData };
