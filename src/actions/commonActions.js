// import axios from "axios";
import { OPEN_NAV, CLOSE_NAV, SET_ACTIVE_LINK } from "./types";

export const handleDrawerOpen = () => {
  return {
    type: OPEN_NAV,
    payload: true
  };
};

export const handleDrawerClose = () => {
  return {
    type: CLOSE_NAV,
    payload: false
  };
};

export const setActiveLink = activeLink => dispatch => {
  dispatch({
    type: SET_ACTIVE_LINK,
    payload: activeLink
  });
};
