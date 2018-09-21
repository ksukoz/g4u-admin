import { SET_LANGUAGE } from "../actions/types";

import messages from "../messages";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import uk from "react-intl/locale-data/uk";
import ru from "react-intl/locale-data/ru";

import { flattenMessages } from "../utils";
addLocaleData([...en, ...uk, ...ru]);

const initialState = {
  locale:
    localStorage["admin-user"] &&
    JSON.parse(localStorage.getItem("admin-user")).lang
      ? JSON.parse(localStorage.getItem("admin-user")).lang
      : (navigator.languages && navigator.languages[0].slice(0, 2)) ||
        navigator.language.slice(0, 2) ||
        navigator.userLanguage.slice(0, 2) ||
        "en",
  messages: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
        messages: flattenMessages(messages[action.payload])
      };
    default:
      return {
        ...state,
        messages: flattenMessages(messages[state.locale])
      };
  }
}
