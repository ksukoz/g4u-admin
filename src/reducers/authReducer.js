import { GET_USER, SET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  type: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
        type: action.payload
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
        type: action.payload
      };
    default:
      return state;
  }
}
