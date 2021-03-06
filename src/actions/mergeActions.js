import axios from "axios";
import { GET_MERGING } from "./types";

export const getMerging = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/merge", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
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

export const confirmMerging = data => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/merge/update", data, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(() => {
      dispatch(getMerging());
    });
};
