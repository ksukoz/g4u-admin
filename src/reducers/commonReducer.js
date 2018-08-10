import { OPEN_NAV, CLOSE_NAV, SET_ACTIVE_LINK } from "../actions/types";

const initialState = {
  open: false,
  activeLink: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_NAV:
      return {
        ...state,
        open: action.payload
      };
    case CLOSE_NAV:
      return {
        ...state,
        open: action.payload
      };
    case SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      };
    default:
      return state;
  }
}
