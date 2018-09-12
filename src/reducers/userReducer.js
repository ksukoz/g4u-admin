import { GET_USERS, MERGE_STUFF, GET_USERS_BY_NAME } from "../actions/types";

const initialState = {
  userList: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: action.payload
      };
    case GET_USERS_BY_NAME:
      return {
        ...state,
        userList: action.payload
      };
    case MERGE_STUFF:
      return state;
    default:
      return {
        ...state,
        userList: null
      };
  }
}
