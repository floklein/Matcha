import {FETCH_PROFILE} from "./types";
import Faker from "faker";
import getAverageColor from "get-average-color";

export const fetchProfile = () => dispatch => {
  const url = Faker.fake('{{image.avatar}}');
  getAverageColor(url)
    .then(rgb => {
      dispatch({
        type: FETCH_PROFILE,
        payload: {
          url: url,
          username: Faker.fake('{{internet.userName}}'),
          firstName: Faker.fake('{{name.firstName}}'),
          lastName: Faker.fake('{{name.lastName}}'),
          bio: Faker.fake('{{lorem.sentences}}'),
          rgb: rgb
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};