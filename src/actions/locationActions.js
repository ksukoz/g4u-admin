import axios from "axios";
import {
  GET_COUNTRIES,
  GET_ALL_COUNTRIES,
  GET_CITIES,
  GET_ERRORS,
  GET_MESSAGES,
  GET_REGIONS
} from "./types";

export const getCountries = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/location/country", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
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

export const getAllCountries = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/location/getadmincountry", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      } else {
        dispatch({
          type: GET_ALL_COUNTRIES,
          payload: res.data.answer
        });
      }
    });
};

export const getRegions = iso => dispatch => {
  axios
    .get(`http://api.mygame4u.com/location/region?iso=${iso}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
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
    .get(`http://api.mygame4u.com/location/city?regid=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
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

export const setCountryStatus = status => dispatch => {
  axios
    .post("http://api.mygame4u.com/location/setcountrystatus", status, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      } else {
        dispatch({
          type: GET_MESSAGES,
          payload: res.data.message
        });
      }
    });
};
