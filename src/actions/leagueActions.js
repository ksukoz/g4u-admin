import axios from "axios";
import {
  GET_MESSAGES,
  GET_LEAGUES,
  GET_SUB_LEAGUES,
  GET_CURRENT_LEAGUE,
  GET_ERRORS
} from "./types";

// Get leagues
export const getLeagues = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/leagues", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_LEAGUES,
        payload: res.data.answer
      });
    });
};

export const getSubLeagues = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/portal/subleagues?lgId=${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_SUB_LEAGUES,
        payload: res.data.answer
      });
    });
};

export const getCurrentLeagues = id => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/ /leagues/edit/${id}`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_CURRENT_LEAGUE,
        payload: res.data.answer
      });
    });
};

// Add franchise
export const addFranchise = franhiseData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/franchise/add", franhiseData, {
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

// Add league
export const addLeague = leagueData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/leagues/add", leagueData, {
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

// Add subleague
export const addSubLeague = subLeagueData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/leagues/addsub", subLeagueData, {
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
