import { GET_CURRENT_LEAGUE, GET_LEAGUES, GET_ERRORS } from "../actions/types";

const initialState = {
  currentLeague: "",
  leagues: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
