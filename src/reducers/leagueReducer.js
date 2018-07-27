import { GET_CURRENT_LEAGUE, GET_LEAGUES } from '../actions/types';

const initialState ={
  currentLeague: '',
  leagues: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload
      }
    default:
      return state;
  }
}