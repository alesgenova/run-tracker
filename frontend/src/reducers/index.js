//import { combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { entriesReducer } from "./entriesReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from './uiReducer';

const config = {
  key: 'primary',
  storage: storage,
  whitelist: ['auth', 'entries', 'users'],
  blacklist: ['ui']
}

//export default combineReducers({
export default persistCombineReducers(
  config,
  {
    ui: uiReducer,
    auth: authReducer,
    users: usersReducer,
    entries: entriesReducer
  }
);


