import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import RaindropSearchReducer from './RaindropSearchReducer';
import RequestReducer from './RequestReducer';
import LovedOneReducer from './LovedOneReducer';
import SendRaindropReducer from './SendRaindropReducer';

export default combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
  raindropSearch: RaindropSearchReducer,
  request: RequestReducer,
  lovedOne: LovedOneReducer,
  sendRaindrop: SendRaindropReducer
});
