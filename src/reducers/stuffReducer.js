import {
  GET_STUFF_TYPES,
  GET_STUFF_MEMBERS,
  GET_STUFF_MEMBERS_BY_NAME,
  MERGE_STUFF,
  CLEAR_STUFF,
  GET_STUFF_FOR_APP
} from "../actions/types";

const initialState = {
  options: null,
  members: null,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STUFF_TYPES:
      return {
        ...state,
        options: action.payload
      };
    case GET_STUFF_MEMBERS:
      return {
        ...state,
        members: action.payload
      };
    case GET_STUFF_MEMBERS_BY_NAME:
      return {
        ...state,
        members: action.payload
      };
    case GET_STUFF_FOR_APP:
      return {
        ...state,
        members: action.payload
      };
    case MERGE_STUFF:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_STUFF:
      return {
        ...state,
        members: null
      };
    default:
      return state;
  }
}
