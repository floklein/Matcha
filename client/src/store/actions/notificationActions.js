import {GET_NOTIFS, GET_ERRORS} from './types';

import axios from 'axios';

export const getNotifs = () => dispatch => {
  axios.get('/api/notifs')
    .then(res => {
      dispatch({
        type: GET_NOTIFS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};