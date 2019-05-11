import {SET_RESPONSE} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESPONSE:
      return {
        ...state,
        response: action.payload
      };
    default:
      return state;
  }
}