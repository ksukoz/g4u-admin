import axios from 'axios';
import { GET_ERRORS } from "./types";
import { GET_USER } from "./types";

export const loginUser = (userData, history) => dispatch => {
  axios
  .post("http://api.afl.lan/admin/user/login", userData)
  .then(res => {
    if(res.data.error) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.message
      })
     } else {
      localStorage.setItem('user', res.data.answer.token);
      history.push("/");
      dispatch({
        type: GET_USER,
        payload: res.data.answer.type
      })
    }
    });
}