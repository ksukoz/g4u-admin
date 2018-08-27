import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import compose from "recompose/compose";
import { setLanguage } from "../../actions/languageActions";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { handleDrawerOpen } from "../../actions/commonActions";
import { setUserLanguage } from "../../actions/userActions";
import { logoutUser } from "../../actions/authActions";
import { Button } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#55a462"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  }
});

const drawerWidth = 295;

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  appBar: {
    backgroundColor: "#43A047",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    marginLeft: "2rem"
  },
  logout: {
    marginLeft: "auto",
    marginRight: "1rem",
    color: "#fff"
  },
  input: {
    width: "140px"
  },
  select: {
    color: "#fff"
  }
};

class Header extends React.Component {
  state = {
    lang: ""
  };

  onClickHandler = e => {
    this.props.logoutUser();
  };

  onChangeHandler = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });

    let user = JSON.parse(localStorage.getItem("admin-user"));
    user.lang = e.target.value;

    this.props.setLanguage(e.target.value);
    localStorage.setItem("admin-user", JSON.stringify(user));

    window.location.reload();
  };

  componentDidMount() {
    if (this.props.lang.locale !== null) {
      this.setState({
        ...this.state,
        lang: this.props.lang.locale
      });

      this.props.setUserLanguage({ lang: this.props.lang.locale });
    }
  }

  render() {
    const { classes } = this.props;
    const { type } = this.props.auth;

    const globalAdminLink = (
      <li>
        <Link to="/franchise/add">Добавить франшизу</Link>
      </li>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar
              className={classes.tollbar}
              disableGutters={!this.props.common.open}
            >
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {this.props.common.activeLink
                  ? this.props.common.activeLink
                  : "Лиги"}
              </Typography>
              <ul className="navigation">
                {type === 0 ? globalAdminLink : ""}
                <li>
                  <FormControl className={classes.input}>
                    <InputLabel htmlFor="locale" className={classes.select}>
                      <FormattedMessage id="header.leagueLabel" />
                    </InputLabel>
                    <Select
                      className={classes.select}
                      value="Выберите лигу"
                      onChange={this.onChangeHandler}
                      displayEmpty
                      inputProps={{
                        name: "locale",
                        id: "locale"
                      }}
                    >
                      <MenuItem value="Выберите лигу" disabled>
                        <FormattedMessage id="header.leagueLabel" />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </li>
                <li>
                  <FormControl className={classes.input}>
                    <InputLabel htmlFor="lang" className={classes.select}>
                      <FormattedMessage id="header.langLabel" />
                    </InputLabel>
                    <Select
                      className={classes.select}
                      value={this.state.lang}
                      onChange={this.onChangeHandler}
                      displayEmpty
                      inputProps={{
                        name: "lang",
                        id: "lang"
                      }}
                    >
                      <MenuItem value="en-US">English</MenuItem>
                      <MenuItem value="ru-RU">Русский</MenuItem>
                      <MenuItem value="uk">Українська</MenuItem>
                    </Select>
                  </FormControl>
                </li>
              </ul>
              <Button className={classes.logout} onClick={this.onClickHandler}>
                <FormattedMessage id="header.logout" />
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  common: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  common: state.common,
  lang: state.lang
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { handleDrawerOpen, logoutUser, setLanguage, setUserLanguage }
  )
)(Header);

// import React, { Component } from "react";
// import { connect } from "react-redux";

// class Header extends Component {
//   render() {

//     return <div />;
//   }
// }

// export default connect(
//   mapStateToProps,
//   null
// )(Header);
