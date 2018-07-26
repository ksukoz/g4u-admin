import { combineReducers } from "redux";
import authReducer from "./authReducer";
import leagueReducer from "./leagueReducer";
// import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  league: {
    name: leagueReducer
  },
  // errors: errorReducer
});
