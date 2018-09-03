import { GET_STADIUMS } from "../actions/types";

const initialState = {
  stadiums: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STADIUMS:
      return {
        ...state,
        stadiums: action.payload
      };
    default:
      return state;
  }
}
