import {
  GET_TOURNAMENTS,
  GET_SEASONS,
  GET_SUBTOURNAMENTS,
  GET_TOUR_COMMANDS,
  GET_GAMES_BY_NAME,
  GET_APPOINTS,
  GET_TOUR_GAMES,
  GET_AUTO_GAMES
} from "../actions/types";

const initialState = {
  list: null,
  seasons: null,
  subtournaments: null,
  commands: null,
  games: null,
  appoints: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOURNAMENTS:
      return {
        ...state,
        list: action.payload
      };
    case GET_SEASONS:
      return {
        ...state,
        seasons: action.payload
      };
    case GET_SUBTOURNAMENTS:
      return {
        ...state,
        subtournaments: action.payload
      };
    case GET_TOUR_COMMANDS:
      return {
        ...state,
        commands: action.payload
      };
    case GET_TOUR_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case GET_AUTO_GAMES:
      return {
        ...state,
        games: action.payload
      };
    case GET_GAMES_BY_NAME:
      return {
        ...state,
        games: action.payload
      };
    case GET_APPOINTS:
      return {
        ...state,
        appoints: action.payload
      };
    default:
      return {
        ...state,
        list: null
      };
  }
}
