import {
  GET_COUNTRIES,
  GET_ALL_COUNTRIES,
  GET_REGIONS,
  GET_CITIES
} from "../actions/types";

const initialState = {
  countries: null,
  regions: null,
  cities: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
    case GET_REGIONS:
      return {
        ...state,
        regions: action.payload
      };
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload
      };
    default:
      return state;
  }
}
