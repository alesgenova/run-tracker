import { baseUrl, authAxios } from "./common";
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({})

export function fetchEntries(dispatch){
  instance = authAxios();
  dispatch(
    {
      type: "FETCH_ENTRIES",
      payload: instance.get("/v1/entries/")
    }
  )
  .then( () => {
    console.log("FETCH_ENTRIES THEN");
  })
  .catch((err) => {
    console.log("FETCH_ENTRIES CATCH");
    console.log(err);
  })
  
}

export function createEntry(entry, dispatch, navigation){
  instance = authAxios();
  dispatch(
    {
      type: "CREATE_ENTRY",
      payload: instance.post("/v1/entries/", entry)
    }
  )
  .then( () => {
    console.log("CREATE_ENTRY THEN");
    fetchEntries(dispatch);
    navigation.dispatch(backAction);
  })
  .catch((err) => {
    console.log("CREATE_ENTRY CATCH");
    console.log(err);
  })
}

export function updateEntry(entry, dispatch, navigation){
  instance = authAxios();
  dispatch(
    {
      type: "UPDATE_ENTRY",
      payload: instance.put("/v1/entry/"+entry.pk+"/", entry)
    }
  )
  .then( () => {
    console.log("UPDATE_ENTRY THEN");
    fetchEntries(dispatch);
    navigation.dispatch(backAction);
  })
  .catch((err) => {
    console.log("UPDATE_ENTRY CATCH");
    console.log(err);
  })
}

export function deleteEntry(entryPk, dispatch){
  instance = authAxios();
  dispatch(
    {
      type: "DELETE_ENTRY",
      payload: instance.delete("/v1/entry/"+entryPk+"/")
    }
  )
  .then( () => {
    console.log("DELETE_ENTRY THEN");
    fetchEntries(dispatch);
    //navigation.back();
  })
  .catch((err) => {
    console.log("DELETE_ENTRY CATCH");
    console.log(err);
  })
}