import {combineReducers} from 'redux';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import soulmatcherReducer from './soulmatcherReducer';
import searchReducer from './searchReducer';
import chatReducer from './chatReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  errors: errorReducer,
  soulmatcher: soulmatcherReducer,
  search: searchReducer,
  chat: chatReducer,
  user: userReducer,
  notifications: notificationReducer
});