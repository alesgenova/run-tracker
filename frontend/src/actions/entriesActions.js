import { baseUrl, authAxios } from "./common";

export function fetchEntries(dispatch){
  instance = authAxios();
  dispatch(
    {
      type: "FETCH_ENTRIES",
      payload: instance.get("/v1/entries")
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