import { combineReducers } from "redux";
import authReducer from "./authReducer";
import leagueReducer from "./leagueReducer";
import stuffReducer from "./stuffReducer";
import userReducer from "./userReducer";
// import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  league: leagueReducer,
  stuff: stuffReducer,
  user: userReducer

  // errors: errorReducer
});
