export function usersReducer(state=[], action) {
  switch(action.type){
    case "FETCH_USERS_FULFILLED": {
      // fresh set of all entries from the server
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
}