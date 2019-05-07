import {GET_NOTIFS, NEW_NOTIF} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFS:
      return {
        ...state,
        list: action.payload
      };
    case NEW_NOTIF:
      return {
        ...state,
        newNotif: action.payload
      };
    default:
      return state;
  }
}