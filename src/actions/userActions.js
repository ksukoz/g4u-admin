import axios from "axios";
import { GET_USERS, GET_USERS_BY_NAME } from "../actions/types";

export const getUsers = () => dispatch => {
  axios
    .get("http://api.afl.lan/admin/user/list", {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
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
    .get(`http://api.afl.lan/admin/user/list?name=${name}`, {
      headers: { Authorization: `G4User ${localStorage.getItem("user")}` }
    })
    .then(res => {
      dispatch({
        type: GET_USERS_BY_NAME,
        payload: res.data.answer
      });
      console.log(res.data.answer);
    });
};
