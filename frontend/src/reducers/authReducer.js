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
        ...state,
        loggedIn: true,
        token: action.payload.data.key
      }
    }
    case "LOGOUT_FULFILLED": {
      return initialState;
    }
    case "REGISTER_FULFILLED": {
      console.log("REGISTER_FULFILLED in AUTH");
      return {
        ...state,
        loggedIn: true,
        token: action.payload.data.key
      }
    }
    case "ME_FULFILLED": {
      return {
        ...state,
        user: action.payload.data
      }
    }
    default : {
      return state;
    }
  }
}