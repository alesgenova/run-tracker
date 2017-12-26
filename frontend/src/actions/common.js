import axios from "axios";

import store from '../stores/store';

export const baseUrl = "http://10.0.2.2:8000";

export function authAxios(){
  let token = store.getState().auth.token;
  let instance = axios.create({
    baseURL: baseUrl
  });
  console.log("AuthToken: ",token);
  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = "Token "+token;
  return instance;
}