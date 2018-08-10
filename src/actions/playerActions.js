import axios from "axios";
import {
  GET_ERRORS,
  GET_POSITION,
  GET_PLAYERS,
  GET_PLAYERS_BY_NAME,
  MERGE_PLAYER
} from "../actions/types";

export const getPositions = () => dispatch => {
  axios
    .get("http://api.afl.lan/admin/players/getposition", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_POSITION,
        payload: res.data.answer
      });
    });
};

export const getPlayers = () => dispatch => {
  axios
    .get("http://api.afl.lan/admin/players", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_PLAYERS,
        payload: res.data.answer
      });
    });
};

export const getPlayersByName = search => dispatch => {
  axios
    .get(`http://api.afl.lan/admin/players?name=${search}&tied=0`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_PLAYERS_BY_NAME,
        payload: res.data.answer
      });
    });
};

export const addPlayer = stuffData => dispatch => {
  axios
    .post("http://api.afl.lan/admin/players/add", stuffData, {
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
      }
    });
};

export const mergePlayer = playerData => dispatch => {
  axios
    .post("http://api.afl.lan/admin/merge/player", playerData, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: MERGE_PLAYER,
          payload: res.data.message
        });
      }
    });
};
