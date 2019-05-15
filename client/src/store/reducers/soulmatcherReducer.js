import {GET_USERS, LOADING} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}