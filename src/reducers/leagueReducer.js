import {
  GET_LEAGUES,
  GET_SUB_LEAGUES,
  GET_CURRENT_LEAGUE
} from "../actions/types";

const initialState = {
  currentLeague: null,
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
    case GET_CURRENT_LEAGUE:
      return {
        ...state,
        currentLeague: action.payload
      };
    default:
      return state;
  }
}
