import axios from "axios";
import { GET_ERRORS } from "../actions/types";

// export const getPositions = () => dispatch => {
//   axios
//     .get("http://api.afl.lan/admin/personal/type", {
//       headers: {
//         Authorization: `G4User ${
//           JSON.parse(localStorage.getItem("user")).token
//         }`
//       }
//     })
//     .then(res => {
//       dispatch({
//         type: GET_STUFF_TYPES,
//         payload: res.data.answer
//       });
//     });
// };

export const addPlayer = stuffData => dispatch => {
  axios
    .post("http://api.afl.lan/admin/players/add", stuffData, {
      headers: {
        Authorization: `G4User ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: GET_ERRORS,
          payload: res.data.message
        });
      }
    });
};
