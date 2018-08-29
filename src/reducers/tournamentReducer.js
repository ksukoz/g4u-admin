import {
  GET_TOURNAMENTS,
  GET_SEASONS,
  GET_SUBTOURNAMENTS
} from "../actions/types";

const initialState = {
  list: null,
  seasons: null,
  subtournaments: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOURNAMENTS:
      return {
        ...state,
        list: action.payload
      };
    case GET_SEASONS:
      return {
        ...state,
        seasons: action.payload
      };
    case GET_SUBTOURNAMENTS:
      return {
        ...state,
        subtournaments: action.payload
      };
    default:
      return state;
  }
}
