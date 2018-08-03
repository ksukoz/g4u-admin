import { combineReducers } from "redux";
import authReducer from "./authReducer";
import leagueReducer from "./leagueReducer";
import stuffReducer from "./stuffReducer";
import userReducer from "./userReducer";
import playerReducer from "./playerReducer";
import locationReducer from "./locationReducer";
import mergeReducer from "./mergeReducer";

export default combineReducers({
  auth: authReducer,
  league: leagueReducer,
  stuff: stuffReducer,
  users: userReducer,
  players: playerReducer,
  location: locationReducer,
  merge: mergeReducer

  // errors: errorReducer
});
