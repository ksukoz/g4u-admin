import { GET_TOURNAMENTS, GET_SEASONS } from "../actions/types";

const initialState = {
  list: null,
  seasons: null
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
    default:
      return state;
  }
}
