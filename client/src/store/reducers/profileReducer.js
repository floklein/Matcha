import {FETCH_PROFILE} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}