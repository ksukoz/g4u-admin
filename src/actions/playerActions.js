import axios from "axios";
import {
  GET_ERRORS,
  GET_POSITION,
  GET_PLAYERS,
  GET_PLAYERS_BY_NAME,
  GET_PLAYERS_BY_NAME_AND_COMMAND,
  CLEAR_PLAYERS,
  CLEAR_COMMAND_PLAYERS,
  GET_PLAYERS_REQUESTS,
  GET_REQUESTED_PLAYER,
  GET_MESSAGES
} from "../actions/types";
import { getCommandById } from "./commandsActions";


export const getPositions = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/players/getposition", {
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
    .get("http://api.mygame4u.com/admin/players", {
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

export const getPlayersRequests = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/players/request", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_PLAYERS_REQUESTS,
        payload: res.data.answer
      });
    });
};

export const getRequestedPlayer = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/players/request/${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_REQUESTED_PLAYER,
        payload: res.data.answer
      });
    });
};

export const getPlayersByName = search => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/players?name=${search}`, {
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

export const getPlayersByNameCommand = (search, cId) => dispatch => {
  axios
    .get(
      `http://api.mygame4u.com/admin/commands/listpl?name=${search}&cId=${cId}`,
      {
        headers: {
          Authorization: `G4User ${
            JSON.parse(localStorage.getItem("admin-user")).token
          }`
        }
      }
    )
    .then(res => {
      dispatch({
        type: GET_PLAYERS_BY_NAME_AND_COMMAND,
        payload: res.data.answer
      });
    });
};

export const acceptPlayerRequest = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/players/accept/${id}`, {
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

export const cancelPlayerRequest = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/players/decline/${id}`, {
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

export const addPlayer = stuffData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/players/add", stuffData, {
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

export const addPlayerToCommand = (playerData, cId) => dispatch => {
  axios
    .post(
      `http://api.mygame4u.com/admin/commands/addpl?cId=${cId}`,
      playerData,
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
        dispatch(getCommandById(cId));
      }
    });
};

export const delPlayerFromCommand = (playerId, cId) => dispatch => {
  axios
    .get(
      `http://api.mygame4u.com/admin/commands/delpl?cId=${cId}&plId=${playerId}`,
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
        dispatch(getCommandById(cId));

      }
    });
};

export const mergePlayer = playerData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/merge/player", playerData, {
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

export const clearPlayers = () => dispatch => {
  dispatch({
    type: CLEAR_PLAYERS,
    payload: null
  });
};

export const clearCommandPlayers = () => dispatch => {
  dispatch({
    type: CLEAR_COMMAND_PLAYERS,
    payload: null
  });
};
