import {GET_USERS, GET_ERRORS} from "./types";

import axios from 'axios';

export const getUsers = (options) => dispatch => {
  axios.post('/api/soulmatcher', options)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          soulmatcher: err
        }
      });
    });
};