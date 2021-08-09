import { SET_CURRENT_STEP, SET_FINAL_STEP } from 'states/app/constants';

export const setCurrentStep = (payload) => ({
  type: SET_CURRENT_STEP,
  payload,
});

export const setFinalStep = (payload) => ({
  type: SET_FINAL_STEP,
  payload,
});
