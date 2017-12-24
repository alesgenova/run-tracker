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
        error: "Unable to login with the provided credentials."
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
    case "REGISTER_FULFILLED": {
      console.log("REGISTER_FULFILLED in UI");
      return {
        ...state,
        registerScreen:{
          loading: false,
          error: null
        }
      }
    }
    case "REGISTER_REJECTED": {
      console.log("REGISTER_REJECTED in UI");
      let theError = "";
      if (action.payload.response.data.username){
        theError = action.payload.response.data.username[0];
      }else if (action.payload.response.data.password1){
        theError = action.payload.response.data.password1[0];
      }else if (action.payload.response.data.password2){
        theError = action.payload.response.data.password2[0];
      }else if (action.payload.response.data.non_field_errors){
        theError = action.payload.response.data.non_field_errors[0];
      }

      return {
        ...state,
        registerScreen:{
          loading: false,
          error: theError
        }
      }
    }
    default : {
      return state;
    }
  }
}