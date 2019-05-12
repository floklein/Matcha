import {CHANGE_INFOS, LOADING, GET_ERRORS} from './types';

import axios from 'axios';

export const uploadImage = (image) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  console.log(image);
  if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
    dispatch({
      type: GET_ERRORS,
      payload: {
        profile: 'Seuls les formats PNG, JPG et JPEG sont supportés'
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
        profile: 'Seules les images de taille inférieure à 5Mo sont supportées'
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
      console.log('error');
      dispatch({
        type: GET_ERRORS,
        payload: {
          profile: 'L\'image semble corrompue'
        }
      });
      dispatch({
        type: LOADING,
        payload: false
      });
    };

    output.onload = () => {
      console.log('uploading');
      const fd = new FormData();
      fd.append('photo', image, image.name);
      axios.post('test', fd, {
        onUploadProgress: (progress) => {
          // console.log('Chargement : ' + Math.round(progress.loaded / progress.total * 100) + '%');
        }
      })
        .then(res => {
          dispatch({
            type: LOADING,
            payload: false
          });
        })
        .catch(err => {
          //TODO: Remove setTimeout()
          setTimeout(() => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            });
            dispatch({
              type: LOADING,
              payload: false
            });
          }, 2000);
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