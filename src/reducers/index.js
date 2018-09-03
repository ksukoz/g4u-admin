import { combineReducers } from "redux";
import authReducer from "./authReducer";
import languageReducer from "./languageReducer";
import leagueReducer from "./leagueReducer";
import stuffReducer from "./stuffReducer";
import userReducer from "./userReducer";
import playerReducer from "./playerReducer";
import locationReducer from "./locationReducer";
import mergeReducer from "./mergeReducer";
import commonReducer from "./commonReducer";
import errorReducer from "./errorReducer";
import messagesReducer from "./messagesReducer";
import commandReducer from "./commandReducer";
import tournamentReducer from "./tournamentReducer";
import stadiumReducer from "./stadiumReducer";

export default combineReducers({
  lang: languageReducer,
  auth: authReducer,
  league: leagueReducer,
  stuff: stuffReducer,
  users: userReducer,
  players: playerReducer,
  location: locationReducer,
  merge: mergeReducer,
  common: commonReducer,
  commands: commandReducer,
  tournaments: tournamentReducer,
  stadiums: stadiumReducer,
  messages: messagesReducer,
  errors: errorReducer
});
