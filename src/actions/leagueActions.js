import axios from "axios";
import { GET_CURRENT_LEAGUE, GET_LEAGUES, GET_ERRORS } from "./types";

// Get leagues
export const getLeagues = () => dispatch => {
  // dispatch()
  axios
    .get("http://api.afl.lan/admin/leagues", {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
    })
    .then(res => {
      dispatch({
        type: GET_LEAGUES,
        payload: res.data.answer
      });
      // console.log(res.data)
    });
};

// Add league
export const addLeague = leagueData => dispatch => {
  // dispatch()
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

// Add franchise
export const addFranchise = franhiseData => dispatch => {
  // dispatch()
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
