import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

function mapStateToProps(state) {
  const { lang } = state;
  return { locale: lang.locale, messages: lang.messages };
}

export default connect(mapStateToProps)(IntlProvider);
