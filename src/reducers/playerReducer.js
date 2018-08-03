import {
  GET_POSITION,
  GET_PLAYERS,
  MERGE_PLAYER,
  GET_PLAYERS_BY_NAME
} from "../actions/types";

const initialState = {
  positions: null,
  members: null,
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
    default:
      return state;
  }
}
