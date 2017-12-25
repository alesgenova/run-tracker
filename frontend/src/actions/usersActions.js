import { baseUrl, authAxios } from "./common";

export function fetchUsers(dispatch){
  instance = authAxios();
  dispatch(
    {
      type: "FETCH_USERS",
      payload: instance.get("/v1/users")
    }
  )
  .then( () => {
    console.log("FETCH_USERS THEN");
  })
  .catch((err) => {
    console.log("FETCH_USERS CATCH");
    console.log(err);
  })
  
}