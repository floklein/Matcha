import {GET_NOTIFS, NEW_NOTIF, GET_ERRORS} from './types';

import axios from 'axios';
import uuid from 'uuid';

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
        payload: err.response ? err.response.data : 'Erreur notifications'
      });
    });
};

export const newNotif = (notification) => dispatch => {
  if (notification !== {}) {
    dispatch({
      type: NEW_NOTIF,
      payload: {
        ...notification,
        id: uuid.v4()
      }
    });
  }
};