import axios from 'axios';
import { GET_CURRENT_LEAGUE, GET_LEAGUES } from './types';

// Get current profile
export const getLeagues = () => dispatch => {
  // dispatch()
  axios.get('http://api.afl.lan/admin/leagues', {
    'headers': { 'Authorization': `G4User ${localStorage.getItem('user')}` }
  })
    .then(res => {
      dispatch({
        type: GET_LEAGUES,
        payload: res.data.answer
      })
      // console.log(res.data)
    })
}