import { createSelector } from 'reselect';

export const commonSelector = (STATE_NAME, childState) =>
  createSelector(
    (state) => state[STATE_NAME],
    (state) => state.toJS()[childState]
  );
