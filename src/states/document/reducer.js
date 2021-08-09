import * as types from './constants';
import { fromJS } from 'immutable';

const initDocument = {
  documentDetails: null,
};

const initState = fromJS(initDocument);

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_FILE.PROCESS:
      return state.setIn(['documentDetails'], null);
    case types.GET_ALL_FILE.SUCCESS:
      return state.setIn(['documentDetails'], payload);
    default:
      return state;
  }
};
