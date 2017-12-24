const initialState = {
  loginScreen: {
    loading: false,
    error: null
  },
  registerScreen: {
    loading: false,
    error: null
  }
}

export function uiReducer(state=initialState, action){
  switch (action.type){
    case "LOGIN_PENDING": {
      console.log("LOGIN_PENDING in UI");
      return {
        ...state,
        loginScreen:{
          loading: true,
          error: null
        }
      }
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        loginScreen:{
          loading: false,
        error: "ERRORRR"
        }
      }
    }
    case "LOGIN_FULFILLED": {
      console.log("LOGIN_FULFILLED in UI");
      return {
        ...state,
        loginScreen:{
          loading: false,
          error: null
        }
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