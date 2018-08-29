import axios from "axios";
import {
  GET_MESSAGES,
  GET_TOURNAMENTS,
  GET_SEASONS,
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
