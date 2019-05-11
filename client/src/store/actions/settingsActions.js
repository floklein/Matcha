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
  const worked = true;

  if (worked) {
    dispatch({
      type: SET_RESPONSE,
      payload: {
        outcome: 'success',
        message: 'Préférences modifiées !'
      }
    });
  } else {
    dispatch({
      type: SET_RESPONSE,
      payload: {
        outcome: 'error',
        message: 'Erreur.'
      }
    });
  }
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