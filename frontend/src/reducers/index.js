//import { combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { entriesReducer } from "./entriesReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";

const config = {
  key: 'primary',
  storage: storage
}

//export default combineReducers({
export default persistCombineReducers(
  config,
  {
  auth: authReducer,
  users: usersReducer,
  entries: entriesReducer
  }
);


