import isEmpty from "../validation/is-empty";
import { GET_USER, SET_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
        user: action.payload
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload)
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
}
