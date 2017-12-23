import { axios } from "axios";

export function logIn(username, password){
  return function(dispatch){
    axios.post()
    .then((response) =>{
      dispatch({
      type: "LOGIN_FULFILLED",
      payload: response.data
      })
    })
    .catch();
  }
}