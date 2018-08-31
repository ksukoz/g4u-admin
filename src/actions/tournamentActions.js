import axios from "axios";
import {
  GET_MESSAGES,
  GET_TOURNAMENTS,
  GET_SEASONS,
  GET_SUBTOURNAMENTS,
  GET_TOUR_COMMANDS,
  GET_TOUR_GAMES,
  GET_GAMES_BY_NAME,
  GET_APPOINTS,
  GET_ERRORS
} from "./types";

export const addTournament = tournamentData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/tournaments/add", tournamentData, {
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

export const addSeason = seasonData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/tournaments/addseason", seasonData, {
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

export const addSubTournament = subTournamentData => dispatch => {
  axios
    .post(
      "http://api.mygame4u.com/admin/tournaments/addsubtour",
      subTournamentData,
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

export const addCommands = commandData => dispatch => {
  axios
    .post(
      "http://api.mygame4u.com/admin/tournaments/addcommands",
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

export const addGame = commandData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/tournaments/addgame", commandData, {
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

export const addAppoint = appData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/asgmt/add", appData, {
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

export const deleteCommands = commandData => dispatch => {
  axios
    .post(
      "http://api.mygame4u.com/admin/tournaments/delcommands",
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

export const getTournaments = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/list?slId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_TOURNAMENTS,
        payload: res.data.answer
      });
    });
};

export const getSeasons = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/getseasons?tourId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_SEASONS,
        payload: res.data.answer
      });
    });
};

export const getSubtournaments = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/getsubtour?seaId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_SUBTOURNAMENTS,
        payload: res.data.answer
      });
    });
};

export const getCommands = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/listcommands?subId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_TOUR_COMMANDS,
        payload: res.data.answer
      });
    });
};

export const getGames = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/listgames?subId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_TOUR_GAMES,
        payload: res.data.answer
      });
    });
};

export const getGamesByName = name => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/asgmt/game?name=${name}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_GAMES_BY_NAME,
        payload: res.data.answer
      });
    });
};

export const getAppoints = () => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/asgmt/list`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_APPOINTS,
        payload: res.data.answer
      });
    });
};
