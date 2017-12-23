export default function reducer(state=[], action) {
  switch(action.type){
    case "FETCH_ENTRIES_FULFILLED": {
      // fresh set of all entries from the server
      return action.entries;
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
    default: {
      return state;
    }
  }
}