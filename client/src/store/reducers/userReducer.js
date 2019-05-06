import {UPLOAD_IMAGE, CHANGE_INFOS, LOADING} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        newImage: action.payload
      };
    case CHANGE_INFOS:
      return {
        ...state,
        outcome: action.payload
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