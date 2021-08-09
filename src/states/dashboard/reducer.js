import { fromJS } from 'immutable';
import {
  SET_CLIENTS,
  SET_LOADING,
  SET_PARTNERS,
  SET_PROJECTS,
} from 'states/dashboard/constants';

export const dashboardInit = {
  projects: [],
  partners: [],
  clients: [],
  loading: true,
};

const initState = fromJS(dashboardInit);

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CLIENTS:
      return state.setIn(['clients'], payload);
    case SET_PARTNERS:
      return state.setIn(['partners'], payload);
    case SET_PROJECTS:
      return state.setIn(['projects'], payload);
    case SET_LOADING:
      return state.setIn(['loading'], payload);
    default:
      return state;
  }
};
