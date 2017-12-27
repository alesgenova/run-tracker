import { baseUrl, authAxios } from "./common";
import { myprofile } from './authActions';
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({})

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

export function updateUser(user, dispatch, navigation){
  instance = authAxios();
  dispatch(
    {
      type: "UPDATE_USER",
      payload: instance.put("/v1/user/"+user.pk+"/", user)
    }
  )
  .then( () => {
    console.log("UPDATE_USER THEN");
    myprofile(dispatch, navigation);
    fetchUsers(dispatch);
    navigation.dispatch(backAction);
  })
  .catch((err) => {
    console.log("UPDATE_USER CATCH");
    console.log(err);
  })
}