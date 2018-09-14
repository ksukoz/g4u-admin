import {
  GET_COMMANDS_BY_NAME,
  GET_COMMANDS,
  GET_COMMAND_BY_ID,
  GET_PLAYERS_BY_NAME_AND_COMMAND,
  CLEAR_COMMANDS,
  CLEAR_COMMAND_PLAYERS
} from "../actions/types";

const initialState = {
  commands: null,
  commandsByName: null,
  command: null,
  players: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMANDS_BY_NAME:
      return {
        ...state,
        commands: action.payload
      };
    case GET_COMMANDS:
      return {
        ...state,
        commands: action.payload
      };
    case GET_COMMAND_BY_ID:
      return {
        ...state,
        command: action.payload
      };
    case GET_PLAYERS_BY_NAME_AND_COMMAND:
      return {
        ...state,
        players: action.payload
      };
    case CLEAR_COMMANDS:
      return {
        ...state,
        commands: action.payload
      };
    case CLEAR_COMMAND_PLAYERS:
      return {
        ...state,
        players: action.payload
      };
    default:
      return state;
  }
}
