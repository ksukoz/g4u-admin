import axios from "axios";
import { GET_COUNTRIES, GET_CITIES, GET_ERRORS, GET_REGIONS } from "./types";

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

export const getRegions = iso => dispatch => {
  axios
    .get(`http://api.afl.lan/location/region?iso=${iso}`, {
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
          type: GET_REGIONS,
          payload: res.data.answer
        });
      }
    });
};

export const getCities = id => dispatch => {
  axios
    .get(`http://api.afl.lan/location/city?regid=${id}`, {
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
          type: GET_CITIES,
          payload: res.data.answer
        });
      }
    });
};
