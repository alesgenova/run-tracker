export function authReducer(state={loggedIn: false, token: null, user: null}, action){
  switch (action.type){
    case "LOGIN_FULFILLED": {
      return {
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user
      }
    }
    case "LOGOUT_FULFILLED": {
      return {
        loggedIn: false,
        token: null,
        user: null
      }
    }
    default : {
      return state;
    }
  }
}