import axios from "axios";
import { GET_MERGING } from "./types";

// Get leagues
export const getMerging = () => dispatch => {
  axios
    .get("http://api.afl.lan/admin/merge", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_MERGING,
        payload: res.data.answer
      });
    });
};
