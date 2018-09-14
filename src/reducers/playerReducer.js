import {
  GET_POSITION,
  GET_PLAYERS,
  MERGE_PLAYER,
  GET_PLAYERS_BY_NAME,
  GET_PLAYERS_REQUESTS,
  CLEAR_PLAYERS
} from "../actions/types";

const initialState = {
  positions: null,
  members: null,
  requests: null,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSITION:
      return {
        ...state,
        positions: action.payload
      };

    case GET_PLAYERS:
      return {
        ...state,
        members: action.payload
      };
    case GET_PLAYERS_BY_NAME:
      return {
        ...state,
        members: action.payload
      };
    case MERGE_PLAYER:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_PLAYERS:
      return {
        ...state,
        members: action.payload
      };
    case GET_PLAYERS_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
    default:
      return state;
  }
}
