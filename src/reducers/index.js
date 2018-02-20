import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import RaindropReducer from './RaindropReducer';
import RequestReducer from './RequestReducer';
import LovedOneReducer from './LovedOneReducer';

export default combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
  raindrop: RaindropReducer,
  request: RequestReducer,
  lovedOne: LovedOneReducer
});
