const initialState = [];

export function usersReducer(state=initialState, action) {
  switch(action.type){
    case "FETCH_USERS_FULFILLED": {
      // fresh set of all entries from the server
      return action.payload.data;
    }
    case "LOGOUT_FULFILLED": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}