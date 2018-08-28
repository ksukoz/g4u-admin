import { GET_TOURNAMENTS } from "../actions/types";

const initialState = {
  list: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOURNAMENTS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
