import * as types from "./constants";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.EXAMPLE:
      return state;
    default:
      return state;
  }
};
