import axios from "axios";
import {
  GET_STUFF_TYPES,
  GET_STUFF_MEMBERS,
  GET_STUFF_MEMBERS_BY_NAME,
  GET_ERRORS,
  GET_MESSAGES
} from "../actions/types";

export const getStuffTypes = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/personal/type", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_STUFF_TYPES,
        payload: res.data.answer
      });
    });
};

export const getStuffMembers = () => dispatch => {
  axios
    .get("http://api.mygame4u.com/admin/personal/list", {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_STUFF_MEMBERS,
        payload: res.data.answer
      });
    });
};

export const getStuffMembersByName = search => dispatch => {
  axios
    .get(`http://api.mygame4u.com/admin/personal/list?name=${search}&tied=0`, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("admin-user")).token
        }`
      }
    })
    .then(res => {
      dispatch({
        type: GET_STUFF_MEMBERS_BY_NAME,
        payload: res.data.answer
      });
    });
};

export const addStuffMember = stuffData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/personal/add", stuffData, {
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

export const mergeStuff = stuffData => dispatch => {
  axios
    .post("http://api.mygame4u.com/admin/merge/personal", stuffData, {
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
