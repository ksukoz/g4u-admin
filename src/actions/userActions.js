import axios from "axios";
import { GET_USERS, GET_USERS_BY_NAME } from "../actions/types";

export const getUsers = () => dispatch => {
  axios
    .get("http://api.afl.lan/admin/user/list", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data.answer
      });
    });
};

export const getUsersByName = name => dispatch => {
  axios
    .get(`http://api.afl.lan/admin/user/list?name=${name}&tied=0`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_USERS_BY_NAME,
        payload: res.data.answer
      });
    });
};
