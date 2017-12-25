const initialState = []

export function entriesReducer(state=initialState, action) {
  switch(action.type){
    case "FETCH_ENTRIES_FULFILLED": {
      // fresh set of all entries from the server
      return action.payload.data;
    }
    case "CREATE_ENTRY": {
      return state;
    }
    case "UPDATE_ENTRY": {
      return state;
    }
    case "DELETE_ENTRY": {
      return state;
    }
    case "LOGOUT_FULFILLED": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}