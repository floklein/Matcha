import {GET_MATCHES, GET_MESSAGES, SEND_MESSAGE, SET_CURRENT, LOADING} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
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