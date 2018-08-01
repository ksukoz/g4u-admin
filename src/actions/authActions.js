import axios from "axios";
import { GET_ERRORS, GET_USER, SET_USER } from "./types";

export const loginUser = (userData, history) => dispatch => {
  axios.post("http://api.afl.lan/admin/user/login", userData).then(res => {
    if (res.data.error) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.message
      });
    } else {
      localStorage.setItem("user", res.data.answer.token);
      document.cookie = `type=${res.data.answer.type}`;
      history.push("/");
      dispatch({
        type: GET_USER,
        payload: res.data.answer.type
      });
    }
  });
};

export const setUser = userType => {
  return {
    type: SET_USER,
    payload: userType
  };
};
