import { GET_COMMANDS_BY_NAME, GET_COMMANDS } from "../actions/types";

const initialState = {
  commands: null
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
    default:
      return {
        ...state,
        commands: null
      };
  }
}
