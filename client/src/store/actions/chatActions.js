import {GET_ERRORS, GET_MATCHES, GET_MESSAGES, LOADING, SEND_MESSAGE, SET_CURRENT} from "./types";

import axios from 'axios';

export const getMatches = () => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  axios.get('/api/match')
    .then(res => {
      dispatch({
        type: GET_MATCHES,
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

export const getMessages = (userId) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  axios.get(`/api/chat?id=${userId}`)
    .then(res => {
      dispatch({
        type: GET_MESSAGES,
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

export const sendMessage = (userId, message) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  axios.post('/api/chat', {
    id: userId,
    message: message
  })
    .then(res => {
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data
      });
      dispatch(getMessages(userId));
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

export const setCurrent = (userId) => dispatch => {
  dispatch({
    type: SET_CURRENT,
    payload: userId
  });
};