import { fromJS } from 'immutable';
import * as types from './constants';
import { GET_ALL_FINANCE_REPORT } from './constants';

const initState = fromJS({
  projects: null,
  ownProjects: [],
  employeeProject: [],
  pageSize: 5,
  visibleFinanceReportModal: false,
  projectsFinanceReport: [],
  isLoading: false,
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PROJECTS_SUCCESS: {
      return state.set('projects', payload);
    }
    case types.GET_OWN_PROJECT_SUCCESSFUL: {
      return state.set('ownProjects', payload);
    }
    case types.TOGGLE_FINANCE_REPORT_MODAL: {
      return state.set('visibleFinanceReportModal', payload);
    }
    case GET_ALL_FINANCE_REPORT.SUCCESS:
      return state.setIn(
        ['projectsFinanceReport'],
        payload.map((item, idx) => ({ ...item, key: idx }))
      );
    case GET_ALL_FINANCE_REPORT.LOADING:
      return state.setIn(['isLoading'], payload);
    case types.GET_EMPLOYEE_PROJECT_SUCCESSFUL: {
      return state.set('employeeProject', payload);
    }
    default:
      return state;
  }
};
