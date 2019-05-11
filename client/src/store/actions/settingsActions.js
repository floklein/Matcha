import {SET_RESPONSE} from './types';

import axios from 'axios';

export const changeEmail = (userData) => dispatch => {
  const worked = true;

  if (worked) {
    dispatch({
      type: SET_RESPONSE,
      payload: {
        outcome: 'success',
        message: 'Email mis à jour !'
      }
    });
  } else {
    dispatch({
      type: SET_RESPONSE,
      payload: {
        outcome: 'error',
        message: 'Email invalide.'
      }
    });
  }
};

export const changeNotifs = (userData) => dispatch => {
  axios.patch('/api/notifs/settings', userData)
    .then(res => {
      dispatch({
        type: SET_RESPONSE,
        payload: {
          outcome: res.data.outcome,
          message: res.data.message
        }
      });
    })
    .catch(err => {
      dispatch({
        type: SET_RESPONSE,
        payload: {
          outcome: err.response.data.outcome,
          message: err.response.data.message
        }
      });
    });
};

export const changePassword = (userData) => dispatch => {
  const worked = true;

  if (worked) {
    dispatch({
      type: SET_RESPONSE,
      payload: {
        outcome: 'success',
        message: 'Mot de passe changé !'
      }
    });
  } else {
    dispatch({
      type: SET_RESPONSE,
      payload: {
        outcome: 'error',
        message: 'Mot de passe invalide.'
      }
    });
  }
};