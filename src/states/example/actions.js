import * as type from "./constants";

export const getAction = payload => {
  return {
    type: type.EXAMPLE,
    payload
  };
};
