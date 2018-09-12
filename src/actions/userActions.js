import axios from "axios";
import {
  GET_USERS,
  GET_USERS_BY_NAME,
  GET_ERRORS,
  GET_MESSAGES
} from "../actions/types";

export const getUsers = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/user/list", {
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
    .get(`http://api.mygame4u.com/admin/user/list?name=${name}`, {
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

export const addAdminToLeague = (id, usId) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/admin/leagues/addadmin/${id}`, usId, {
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

export const deleteAdminFromLeague = (id, usId) => dispatch => {
  axios
    .post(`http://api.mygame4u.com/admin/leagues/deladmin/${id}`, usId, {
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

export const setUserLanguage = lang => dispatch => {
  axios.post(`http://api.mygame4u.com/user/setlocale`, lang, {
    headers: {
      Authorization: `G4User ${
        JSON.parse(localStorage.getItem("admin-user")).token
      }`
    }
  });
  // .then(res => {
  //   console.log(lang);
  //   // dispatch({
  //   //   type: SET_USER_LANGUAGE,
  //   //   payload: res.data.answer
  //   // });
  // });
};
