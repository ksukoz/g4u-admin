import axios from 'axios';
import { GET_STUFF_TYPES, GET_STUFF_MEMBERS, GET_STUFF_MEMBERS_BY_NAME, GET_ERRORS } from '../actions/types';

export const getStuffTypes = () => dispatch => {
  axios.get('http://api.afl.lan/admin/personal/type', {
    'headers': { 'Authorization': `G4User ${localStorage.getItem('user')}` }
  })
    .then(res => {
      dispatch({
        type: GET_STUFF_TYPES,
        payload: res.data.answer
      })
    })
}

export const getStuffMembers = () => dispatch => {
  axios.get('http://api.afl.lan/admin/personal/list', {
    'headers': { 'Authorization': `G4User ${localStorage.getItem('user')}` }
  })
    .then(res => {
      dispatch({
        type: GET_STUFF_MEMBERS,
        payload: res.data.answer
      })
    })
}

export const getStuffMembersByName = search => dispatch => {
  axios.get(`http://api.afl.lan/admin/personal/list?name=${search}`, {
    'headers': { 'Authorization': `G4User ${localStorage.getItem('user')}` }
  })
    .then(res => {
      dispatch({
        type: GET_STUFF_MEMBERS_BY_NAME,
        payload: res.data.answer
      })
    })
}

export const addStuffMember = (stuffData) => dispatch => {
  axios.post('http://api.afl.lan/admin/personal/add', stuffData, {
    'headers': { 'Authorization': `G4User ${localStorage.getItem('user')}` }
  })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        })   
      }
    });
}