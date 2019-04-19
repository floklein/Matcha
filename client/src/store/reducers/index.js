import {combineReducers} from 'redux';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer'

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  errors: errorReducer
});