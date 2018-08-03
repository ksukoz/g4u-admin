import { GET_MERGING } from "../actions/types";

const initialState = {
  mergeList: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MERGING:
      return {
        ...state,
        mergeList: action.payload
      };
    default:
      return state;
  }
}
