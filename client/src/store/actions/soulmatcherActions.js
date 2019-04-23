import {GET_USERS, GET_ERRORS} from "./types";

export const getUsers = (options) => dispatch => {
  const worked = false;

  if (worked) {
    dispatch({
      type: GET_USERS,
      payload: [
        {
          id: 1,
          username: 'toto'
        },
        {
          id: 2,
          username: 'lol'
        }
      ]
    });
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: {
        soulmatcher: 'cassé'
      }
    });
  }
};