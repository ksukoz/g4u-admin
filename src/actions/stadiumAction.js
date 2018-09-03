import axios from "axios";
import { GET_ERRORS, GET_MESSAGES, GET_STADIUMS } from "../actions/types";

export const addStadium = stadiumData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/stadiums/add", stadiumData, {
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

export const getStadium = () => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/stadiums/list`, {
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
          type: GET_STADIUMS,
          payload: res.data.answer
        });
      }
    });
};
