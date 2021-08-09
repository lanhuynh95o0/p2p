import { fromJS } from 'immutable';

import * as types from './constants';
import Cookies from 'js-cookie';
import { TOKEN } from 'constants/cookies';

const initState = fromJS({
  token: Cookies.get(TOKEN),
  userInfo: {},
});

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CURRENT_USER_PROFILE_SUCCESS:
      return state.set('userInfo', payload);
    default:
      return state;
  }
};
