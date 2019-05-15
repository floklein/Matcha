import {FETCH_PROFILE, LIKE_USER} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        user: action.payload
      };
    case LIKE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          like: action.payload
        }
      };
    default:
      return state;
  }
}