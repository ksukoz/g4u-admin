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

const drawerWidth = 295;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 10.3
    }
  },
  wrapper: {
    position: "fixed",
    height: "100vh"
    // boxShadow: "inset 0 0 1px rgba(0, 0, 0, 0.8)"
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
  },
  hide: {
    display: "none"
  }
});

class Navbar extends React.Component {
  state = {
    open: false,
    first: false,
    second: false
  };

  handleClick = () => {
    this.setState({ first: !this.state.first });
  };

  onClick = () => {
    this.setState({ second: !this.state.second });
  };

  onClickHandler = text => {
    this.props.setActiveLink(text);
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.props.common.open && classes.drawerPaperClose
          )
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
            <ListItem button id="first" onClick={this.handleClick}>
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
                    <ListItemText
                      className={!this.props.common.open ? classes.hide : ""}
                    >
                      <ListItemText
                        primary={<FormattedMessage id="nav.leagues" />}
                        className={!this.props.common.open ? classes.hide : ""}
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
              to="/franchise/add"
              className={classes.nav_link}
              onClick={this.onClickHandler.bind(
                this,
                <FormattedMessage id="nav.franchise" />
              )}
            >
              <ListItem button>
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
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.stuff" />}
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
                <ListItemText
                  className={!this.props.common.open ? classes.hide : ""}
                  primary={<FormattedMessage id="nav.players" />}
                />
              </ListItem>
            </Link>

            <ListItem button id="second" onClick={this.onClick}>
              <ListItemText
                primary={<FormattedMessage id="nav.combining" />}
                className={!this.props.common.open ? classes.hide : ""}
              />
              {this.state.second ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.second} timeout="auto" unmountOnExit>
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
