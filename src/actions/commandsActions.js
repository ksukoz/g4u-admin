import axios from "axios";
import {
  GET_ERRORS,
  GET_MESSAGES,
  GET_COMMANDS_BY_NAME
} from "../actions/types";

export const addCommand = commandData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/commands/add", commandData, {
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

export const getCommandsByName = value => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/commands/list?name=${value}`, {
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
          type: GET_COMMANDS_BY_NAME,
          payload: res.data.answer
        });
      }
    });
};