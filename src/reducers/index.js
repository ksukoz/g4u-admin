import { combineReducers } from "redux";
import authReducer from "./authReducer";
import leagueReducer from "./leagueReducer";
import stuffReducer from "./stuffReducer";
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  auth: authReducer,
  league: leagueReducer,
  stuff: stuffReducer,
  users: userReducer,
  location: locationReducer

  // errors: errorReducer
});
