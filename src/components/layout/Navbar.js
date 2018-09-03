import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import classNames from "classnames";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { handleDrawerClose, setActiveLink } from "../../actions/commonActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import GroupIcon from "./navigation-icons/group.svg";
import Handshake from "./navigation-icons/handshake.svg";
import League from "./navigation-icons/league.svg";
import Player from "./navigation-icons/player.svg";
import Referee from "./navigation-icons/referee.svg";
import Settings from "./navigation-icons/settings.svg";

const drawerWidth = 325;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#43A047",
      outline: "1px solid slategrey"
    },
    "&::-webkit-scrollbar": {
      width: 5
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  wrapper: {
    minHeight: "100vh",
    paddingTop: "1rem",
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "olive",
      outline: "1px solid slategrey"
    },
    "&::-webkit-scrollbar": {
      width: "1em"
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  listItem: {
    padding: "12px 18px",
    paddingRight: 15
  },
  nav_link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  nav_icon: {
    width: 40,
    paddingRight: 10
  }
});

class Navbar extends React.Component {
  state = {
    first: true,
    second: true,
    third: true
  };

  handleClick = id => {
    this.setState({ [id]: !this.state[id] });
  };

  // onClick = () => {
  //   this.setState({ second: !this.state.second });
  // };

  onClickHandler = text => {
    this.props.setActiveLink(text);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper)
        }}
      >
        <div className={classes.wrapper}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              id="first"
              onClick={this.handleClick.bind(this, "first")}
            >
              <img className={classes.nav_icon} src={League} alt="" />
              <ListItemText
                primary={<FormattedMessage id="nav.manageLeagues" />}
                className={!this.props.common.open ? classes.hide : ""}
              />
              {this.state.first ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.first} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/leagues"
                  className={classes.nav_link}
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.leagues" />
                  )}
                >
                  <ListItem button>
                    <ListItemText>
                      <ListItemText
                        primary={<FormattedMessage id="nav.leagues" />}
                      />
                    </ListItemText>
                  </ListItem>
                </Link>

                <Link
                  to="/subleagues"
                  className={classes.nav_link}
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.subLeagues" />
                  )}
                >
                  <ListItem button>
                    <ListItemText
                      className={!this.props.common.open ? classes.hide : ""}
                    >
                      <ListItemText
                        primary={<FormattedMessage id="nav.subLeagues" />}
                        className={!this.props.common.open ? classes.hide : ""}
                      />
                    </ListItemText>
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <Link
              to="/stadiums"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.stadiums" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Handshake} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.stadiums" />}
                />
              </ListItem>
            </Link>

            <Link
              to="/tournaments"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.tournaments" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Handshake} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.tournaments" />}
                />
              </ListItem>
            </Link>

            <Link
              to="/franchise/add"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.franchise" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Handshake} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.franchise" />}
                />
              </ListItem>
            </Link>

            <Link
              to="/stuff"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.stuff" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Referee} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.stuff" />}
                />
              </ListItem>
            </Link>
            <Link
              to="/appointments"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.appointments" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Referee} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.appointments" />}
                />
              </ListItem>
            </Link>

            <Link
              to="/commands"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.commands" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Player} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.commands" />}
                />
              </ListItem>
            </Link>

            <Link
              to="/players"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.players" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Player} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.players" />}
                />
              </ListItem>
            </Link>

            <ListItem
              button
              id="third"
              onClick={this.handleClick.bind(this, "third")}
            >
              <img className={classes.nav_icon} src={GroupIcon} alt="" />
              <ListItemText
                primary={<FormattedMessage id="nav.combining" />}
                className={!this.props.common.open ? classes.hide : ""}
              />
              {this.state.third ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.third} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/merge"
                  className={classes.nav_link}
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.combineAppointments" />
                  )}
                >
                  <ListItem button>
                    <ListItemText
                      className={!this.props.common.open ? classes.hide : ""}
                    >
                      <ListItemText
                        primary={
                          <FormattedMessage id="nav.combineAppointments" />
                        }
                        className={!this.props.common.open ? classes.hide : ""}
                      />
                    </ListItemText>
                  </ListItem>
                </Link>

                <Link
                  to="/merge/players"
                  className={classes.nav_link}
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.combinePlayers" />
                  )}
                >
                  <ListItem button>
                    <ListItemText
                      className={!this.props.common.open ? classes.hide : ""}
                    >
                      <ListItemText
                        primary={<FormattedMessage id="nav.combinePlayers" />}
                        className={!this.props.common.open ? classes.hide : ""}
                      />
                    </ListItemText>
                  </ListItem>
                </Link>

                <Link
                  to="/merge/stuff"
                  className={classes.nav_link}
                  onClick={this.onClickHandler.bind(
                    this,
                    <FormattedMessage id="nav.combineStuff" />
                  )}
                >
                  <ListItem button>
                    <ListItemText
                      className={!this.props.common.open ? classes.hide : ""}
                    >
                      <ListItemText
                        primary={<FormattedMessage id="nav.combineStuff" />}
                        className={!this.props.common.open ? classes.hide : ""}
                      />
                    </ListItemText>
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <Link
              to="/settings"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.settings" />
              )}
            >
              <ListItem button>
                <img className={classes.nav_icon} src={Settings} alt="" />
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.settings" />}
                />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  common: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  common: state.common
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { handleDrawerClose, setActiveLink }
  )
)(Navbar);

//           <ListItem button id="second" onClick={this.onClick}>
//             <ListItemText inset primary="Объединение" />
//             {this.state.second ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//
//         </List>
//         <Divider />
//       </Drawer>
//     );

//     let before = null;

//     if (anchor === "left") {
//       before = drawer;
//     }

//     return <div className={classes.root}>{before}</div>;
//   }
// }

// export default withStyles(styles)(Navbar);
