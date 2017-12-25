import axios from "axios";

import { baseUrl, authAxios } from "./common";

export function fakeLogout(dispatch){
  dispatch({type: "LOGOUT_FULFILLED"});
}

export function fakeLogin(dispatch, username, password){
  dispatch({type: "LOGIN_PENDING"});

  setTimeout(()=>{
    if (username.length < 1){
      dispatch({
        type: "LOGIN_REJECTED"
      })
    }else{
      dispatch({
        type: "LOGIN_FULFILLED",
        payload: {
          token: "lol1234",
          user: {
            username: username,
            first_name: "Alessandro",
            last_name: "Genova"
          }
        }
      });
    }
  }, 1500);

}

export function logIn(dispatch, username, password){

  // make it easy thanks to the promise middleware!
  // automatically appends _PENDING, _FULFILLED, _REJECTED, to the action type

  dispatch(
    {
      type: "LOGIN",
      payload: axios.post(baseUrl+"/rest-auth/login/", {username: username, password: password})
    }
  )
  .then( () => {
    console.log("LOGIN THEN");
    myprofile(dispatch);
  })
  .catch((err) => {
    console.log("LOGIN CATCH");
    console.log(err);
  })
}

export function register(dispatch, username, password1, password2, first_name, last_name){

  // make it easy thanks to the promise middleware!
  // automatically appends _PENDING, _FULFILLED, _REJECTED, to the action type

  registration_form = {
    username: username,
    password1: password1,
    password2: password2,
    //first_name: first_name,
    //last_name: last_name
  }

  dispatch(
    {
      type: "REGISTER",
      payload: axios.post(baseUrl+"/rest-auth/registration/", registration_form)
    }
  )
  .then( () => {
    console.log("REGISTER THEN");
    myprofile(dispatch);
  })
  .catch((err) => {
    console.log("REGISTER CATCH");
    console.log(err);
  })
}

export function myprofile(dispatch){
  instance = authAxios();
  dispatch(
    {
      type: "ME",
      payload: instance.get("/v1/me")
    }
  )
  .then( () => {
    console.log("ME THEN");
  })
  .catch((err) => {
    console.log("ME CATCH");
    console.log(err);
  })
  
}