import axios from "axios";
import { GET_COUNTRIES, GET_ERRORS } from "./types";

export const getCountries = () => dispatch => {
  axios
    .get("http://api.afl.lan/location/country", {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
    })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      } else {
        dispatch({
          type: GET_COUNTRIES,
          payload: res.data.answer
        });
      }
    });
};