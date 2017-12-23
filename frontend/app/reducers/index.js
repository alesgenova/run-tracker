import { combineReducers } from "redux";

import { entriesReducer } from "./entriesReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";

export default combineReducers({
  users: usersReducer,
  entries: entriesReducer
});