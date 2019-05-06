import {GET_NOTIFS} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}