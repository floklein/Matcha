import {LIKE_USER} from "./types";
import axios from 'axios';

export const likeUser = (userId) => dispatch => {
  axios.post('/api/like', {liked: userId})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: LIKE_USER,
        payload: userId
      })
    })
    .catch(err => {
      console.log(err);
    });
};