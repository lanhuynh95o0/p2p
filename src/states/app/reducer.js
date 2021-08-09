import { fromJS } from 'immutable';
import { SET_CURRENT_STEP, SET_FINAL_STEP } from 'states/app/constants';

export const appInit = {
  isFetching: false,
  currentStep: 1,
  finishedStep: 1,
};

const initState = fromJS(appInit);

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_STEP:
      return state.setIn(['currentStep'], payload);
    case SET_FINAL_STEP:
      return state.setIn(['finishedStep'], payload);
    default:
      return state;
  }
};
