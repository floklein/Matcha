import {FETCH_PROFILE, GET_ERRORS} from "./types";
import axios from 'axios';
import Faker from "faker";
import getAverageColor from "get-average-color";

export const fetchProfile = (username) => dispatch => {
  axios.get(`/api/profile/${username}`)
    .then(res => {
      const url = Faker.fake('{{image.avatar}}');
      getAverageColor(url)
        .then(rgb => {
          dispatch({
            type: FETCH_PROFILE,
            payload: {
              id: res.data.id,
              username: res.data.username,
              email: res.data.email,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              age: res.data.age,
              gender: res.data.gender,
              sexuality: res.data.sexuality,
              bio: res.data.bio,
              profile_pic: res.data.profile_pic,
              popularity: res.data.popularity,
              latitude: res.data.latitude,
              longitude: res.data.longitude,
              url: url,
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