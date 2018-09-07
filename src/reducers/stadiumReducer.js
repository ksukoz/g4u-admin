import { GET_STADIUMS, GET_STADIUMS_BY_NAME } from "../actions/types";

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
    case GET_STADIUMS_BY_NAME:
      return {
        ...state,
        stadiums: action.payload
      };
    default:
      return state;
  }
}
