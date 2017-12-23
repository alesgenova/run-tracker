export default function reducer(state=[], action) {
  switch(action.type){
    case "FETCH_USERS_FULFILLED": {
      // fresh set of all users from the server
      return action.users;
    }
    default: {
      return state;
    }
  }
}