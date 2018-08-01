import axios from "axios";
import { GET_CURRENT_LEAGUE, GET_LEAGUES, GET_ERRORS } from "./types";

// Get leagues
export const getLeagues = () => dispatch => {
  axios
    .get("http://api.afl.lan/admin/leagues", {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
    })
    .then(res => {
      dispatch({
        type: GET_LEAGUES,
        payload: res.data.answer
      });
    });
};

// Add franchise
export const addFranchise = franhiseData => dispatch => {
  axios
    .post("http://api.afl.lan/admin/franchise/add", franhiseData, {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
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

// Add league
export const addLeague = leagueData => dispatch => {
  axios
    .post("http://api.afl.lan/admin/leagues/add", leagueData, {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
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

// Add subleague
export const addSubLeague = subLeagueData => dispatch => {
  axios
    .post("http://api.afl.lan/admin/leagues/addsub", subLeagueData, {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
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
