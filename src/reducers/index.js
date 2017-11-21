import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import RequestReducer from './RequestReducer';
import LovedOneReducer from './LovedOneReducer';

export default combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
  request: RequestReducer,
  lovedOne: LovedOneReducer
});
