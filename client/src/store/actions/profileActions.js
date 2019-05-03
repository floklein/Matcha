import {FETCH_PROFILE, GET_ERRORS, LIKE_USER} from "./types";
import axios from 'axios';
import Faker from "faker";
import getAverageColor from "get-average-color";

export const fetchProfile = (username) => dispatch => {
  axios.get(`/api/profile/${username}`)
    .then(res => {
      const url = res.data.profile_pic ? res.data.profile_pic : Faker.fake('{{image.avatar}}');
      getAverageColor(url)
        .then(rgb => {
          dispatch({
            type: FETCH_PROFILE,
            payload: {
              ...res.data,
              rgb: rgb
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const likeUser = (userId) => dispatch => {
    axios.post('/api/like', {liked: userId})
        .then(res => {
            dispatch({
                type: LIKE_USER,
                payload: res.data.like
            });
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
};

export const dislikeUser = (userId) => dispatch => {
  axios.post('/api/dislike', {disliked: userId})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};