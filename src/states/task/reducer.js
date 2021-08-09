import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
