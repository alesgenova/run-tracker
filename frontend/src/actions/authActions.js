//import { axios } from "axios";

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

export function logIn(username, password){

  // make it easy thanks to the promise middleware!
  // automatically appends _PENDING, _FULFILLED, _REJECTED, to the action type
  return {
    type: "LOGIN",
    //payload: axios.get()
  };
}