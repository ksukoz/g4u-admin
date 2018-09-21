import axios from "axios";
import {
  GET_MESSAGES,
  GET_TOURNAMENTS,
  GET_SEASONS,
  GET_SUBTOURNAMENTS,
  GET_TOUR_COMMANDS,
  GET_TOUR_GAMES,
  GET_AUTO_GAMES,
  GET_GAMES_BY_NAME,
  GET_GAME_BY_ID,
  GET_APPOINTS,
  GET_GAME_APPOINTS,
  GET_DATELESS_GAMES,
  CLEAR_AUTO_GAMES,
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

export const editGame = gameData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/tournaments/addgameoffer", gameData, {
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

export const editDatelessGames = gameData => dispatch => {
  axios
    .post(
      "http://api.mygame4u.com/admin/tournaments/addtimetogames",
      gameData,
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

export const deleteAppoint = appoinData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/asgmt/del", appoinData, {
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

export const getGameAppoint = gId => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/asgmt/list?gId=${gId}`, {
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
          type: GET_GAME_APPOINTS,
          payload: res.data.answer
        });
      }
    });
};

export const delGame = appoinData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/tournaments/delgame", appoinData, {
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

export const getTourCommands = id => dispatch => {
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

export const getGameById = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/getgame?gId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_GAME_BY_ID,
        payload: res.data.answer
      });
    });
};

export const getAutoGames = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/tournaments/autocomplite?subId=${id}`, {
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
          type: GET_AUTO_GAMES,
          payload: res.data.answer
        });
      }
    });
};

export const getDatelessGames = id => dispatch => {
  axios
    .get(
      `http://api.mygame4u.com/admin/tournaments/getofftimegames?subId=${id}`,
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
          type: GET_DATELESS_GAMES,
          payload: res.data.answer
        });
      }
    });
};

export const clearAutoGames = id => dispatch => {
  axios
    .get(
      `http://api.mygame4u.com/admin/tournaments/clearautocomplite?subId=${id}`,
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
          type: CLEAR_AUTO_GAMES,
          payload: res.data.answer
        });
      }
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
