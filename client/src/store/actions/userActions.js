import {UPLOAD_IMAGE, LOADING, GET_ERRORS} from './types';

import axios from 'axios';

export const uploadImage = (image) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });
  const fd = new FormData();
  fd.append('photo', image, image.name);
  axios.post('', fd, {
    onUploadProgress: (progress) => {
      console.log('Chargement : ' + Math.round(progress.loaded / progress.total * 100) + '%');
    }
  })
    .then(res => {
      console.log(res);
      dispatch({
        type: LOADING,
        payload: false
      });
    })
    .catch(err => {
      // Remove setTimeout()
      setTimeout(() => {
        console.log(err);
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
};