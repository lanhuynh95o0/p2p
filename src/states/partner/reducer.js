import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  profile: null,
  info:{},
  assignedProjects: [],
  participants: [],
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PARTNER_PROFILE_SUCCESS: {
      return state.set('profile', payload);
    }
    case types.GET_PARTNER_ASSIGNED_PROJECTS_SUCCESS: {
      return state.set('assignedProjects', payload);
    }
    case types.GET_PARTNER_PARTICIPANTS_SUCCESS: {
      return state.set('participants', payload);
    }
    case types.PARTNER_GET_INFO_SUCCESS: {
      return state.set('info', payload);
    }
    default:
      return state;
  }
};
