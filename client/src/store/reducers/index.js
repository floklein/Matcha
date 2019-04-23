import {combineReducers} from 'redux';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import soulmatcherReducer from "./soulmatcherReducer";

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  errors: errorReducer,
  soulmatcher: soulmatcherReducer
});