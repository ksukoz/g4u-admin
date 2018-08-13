import axios from "axios";
import { GET_ERRORS, GET_USER, SET_USER, LOGOUT_USER } from "./types";

export const loginUser = (userData, history) => dispatch => {
  axios.post("http://api.afl.lan/admin/user/login", userData).then(res => {
    if (res.data.error) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.message
      });
    } else {
      localStorage.setItem("admin-user", JSON.stringify(res.data.answer));
      history.push("/");
      dispatch({
        type: GET_USER,
        payload: res.data.answer
      });
    }
  });
};

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("admin-user");
  dispatch({
    type: LOGOUT_USER,
    payload: false
  });
};
