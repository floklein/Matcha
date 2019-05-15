import {SEARCH_USERS, GET_ERRORS, LOADING} from "./types";

import axios from 'axios';

export const searchUsers = (options) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  axios.post('/api/search', options)
    .then(res => {
      dispatch({
        type: SEARCH_USERS,
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