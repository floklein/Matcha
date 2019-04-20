import {LIKE_USER} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LIKE_USER:
      return {
        ...state,
        like: action.payload
      };
    default:
      return state;
  }
};