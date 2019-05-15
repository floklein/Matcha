import {GET_USERS, GET_ERRORS, LOADING} from "./types";

import axios from 'axios';

export const getUsers = (options) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  axios.post('/api/soulmatcher', options)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      dispatch({
        type: LOADING,
        payload: false
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: LOADING,
        payload: false
      });
    });
};