import {CHANGE_INFOS, LOADING, GET_ERRORS} from './types';

import axios from 'axios';

import {fetchProfile} from './profileActions';

export const uploadImage = (image, userId) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
    dispatch({
      type: GET_ERRORS,
      payload: {
        profile: 'Seules les images au format PNG ou JPEG sont acceptées'
      }
    });
    dispatch({
      type: LOADING,
      payload: false
    });
    return;
  }
  if (image.size > 5000000) {
    dispatch({
      type: GET_ERRORS,
      payload: {
        profile: 'Seules les images de taille inférieure à 5Mo sont acceptées'
      }
    });
    dispatch({
      type: LOADING,
      payload: false
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const output = new Image();
    output.src = reader.result;

    output.onerror = () => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          profile: 'L\'image ne semble pas être un vrai fichier d\'image'
        }
      });
      dispatch({
        type: LOADING,
        payload: false
      });
    };

    output.onload = () => {
      const fd = new FormData();
      fd.append('picture', image, image.name);
      axios.post('/api/picture', fd, {
        onUploadProgress: (progress) => {
          // console.log('Chargement : ' + Math.round(progress.loaded / progress.total * 100) + '%');
        }
      })
        .then(res => {
          dispatch(fetchProfile(userId));
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
    }
  };
  reader.readAsDataURL(image);
};

export const changeInfos = (infos) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  axios.post('/api/user/update', infos)
    .then(res => {
      dispatch({
        type: LOADING,
        payload: false
      });
      dispatch({
        type: CHANGE_INFOS,
        payload: true
      });
      dispatch({
        type: CHANGE_INFOS,
        payload: false
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: CHANGE_INFOS,
        payload: false
      });
      dispatch({
        type: LOADING,
        payload: false
      });
    });
};