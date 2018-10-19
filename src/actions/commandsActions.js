import axios from "axios";
import {
  GET_ERRORS,
  GET_MESSAGES,
  GET_COMMANDS_BY_NAME,
  GET_COMMANDS,
  GET_COMMAND_BY_ID,
  CLEAR_COMMANDS
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

export const editCommand = (id, commandData) => dispatch => {
  axios
    .post(
      `http://api.mygame4u.com/admin/commands/update?cId=${id}`,
      commandData,
      {
        headers: {
          Authorization: `G4User ${
            JSON.parse(localStorage.getItem("admin-user")).token
          }`
        }
      }
    )
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

export const deleteCommand = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/commands/disable?cId=${id}`, {
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

export const getAllCommandsByName = (value = "") => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/commands/listall${value}`, {
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

export const getCommands = () => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/commands/list`, {
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
          type: GET_COMMANDS,
          payload: res.data.answer
        });
      }
    });
};

export const getCommandById = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/commands?cId=${id}`, {
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
          type: GET_COMMAND_BY_ID,
          payload: res.data.answer
        });
      }
    });
};

export const clearCommands = () => dispatch => {
  dispatch({
    type: CLEAR_COMMANDS,
    payload: null
  });
};
