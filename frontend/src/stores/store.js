//import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import reducer from "../reducers";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
//import promise from './promise';

const App = require('../../package.json');

/*
const initialState = {
  auth: {
    loggedIn: false,
    token: ""
  },
  entries: [],
  users: []
}
*/

const middlewares = [];

if (__DEV__){
  middlewares.push(createLogger());
}

export default createStore(
  reducer,
  undefined,
  compose(applyMiddleware(...middlewares)),
);