import {combineReducers} from 'redux';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import soulmatcherReducer from "./soulmatcherReducer";
import searchReducer from './searchReducer';

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  errors: errorReducer,
  soulmatcher: soulmatcherReducer,
  search: searchReducer
});