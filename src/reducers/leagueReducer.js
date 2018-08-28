import {
  // GET_CURRENT_LEAGUE,
  GET_LEAGUES,
  GET_SUB_LEAGUES,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  // currentLeague: "",
  leagues: null,
  subLeagues: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload
      };
    case GET_SUB_LEAGUES:
      return {
        ...state,
        subLeagues: action.payload
      };
    default:
      return state;
  }
}
