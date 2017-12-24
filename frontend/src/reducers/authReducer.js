const initialState = {
  loggedIn: false,
  token: null,
  user: null
}

export function authReducer(state=initialState, action){
  switch (action.type){
    case "LOGIN_FULFILLED": {
      console.log("LOGIN_FULFILLED in AUTH");
      return {
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user
      }
    }
    case "LOGOUT_FULFILLED": {
      return initialState;
    }
    default : {
      return state;
    }
  }
}