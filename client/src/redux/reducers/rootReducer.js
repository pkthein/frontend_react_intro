import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import userReducer from './userReducer';
import redditReducer from './redditReducer';
import weatherReducer from   './weatherReducer';
import exchangeReducer from './exchangeReducer';

export default combineReducers({
  notesReducer,
  userReducer,
  redditReducer,
  weatherReducer,
  exchangeReducer
});
