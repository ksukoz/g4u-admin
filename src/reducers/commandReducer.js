import { GET_COMMANDS_BY_NAME } from "../actions/types";

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
    default:
      return state;
  }
}
