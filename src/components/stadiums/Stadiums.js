import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Messages from "../common/Messages";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import { getStadium, delStadium } from "../../actions/stadiumAction";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  cross: {
    color: "#ff5e5e",
    marginLeft: "auto"
  }
});

class Stadiums extends Component {
  state = {
    open: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState({ open: false }, this.props.getStadium());
    }

    this.setState({ open: false });
  };

  onClickHandler = e => {
    e.preventDefault();
    if (!e.target.name) {
      this.props.delStadium(e.target.parentNode.name);
    } else {
      this.props.delStadium(e.target.name);
    }
    console.log(e.target);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount = () => {
    this.props.getStadium();
  };

  render() {
    const { classes } = this.props;
    const { stadiums } = this.props.stadiums;

    return (
      <div>
        {this.props.errors ? (
          <Messages
            open={this.state.open}
            message={this.props.errors}
            onClose={this.handleClose}
            classes={classes.error}
          />
        ) : this.props.messages ? (
          <Messages
            open={this.state.open}
            message={this.props.messages}
            onClose={this.handleClose}
            classes={classes.success}
          />
        ) : (
          ""
        )}
        <Link
          className={classes.button_link}
          to={{
            pathname: "/stadiums/add",
            state: stadiums !== null ? { apiKey: stadiums.apiKey } : ""
          }}
          // params={}
        >
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="stadiums.add" />
          </Button>
        </Link>
        <List>
          {stadiums !== null
            ? stadiums.map(stadium => (
                <Link
                  className={classes.button_link}
                  to={`/stadiums/${stadium.stadiums_id}`}
                  key={stadium.stadiums_id}
                >
                  <MenuItem
                    className={classes.listItem}
                    value={stadium.stadiums_id}
                  >
                    {stadium.title} - {stadium.address}
                    <Button
                      className={classes.cross}
                      onClick={this.onClickHandler}
                      name={stadium.stadiums_id}
                    >
                      &#10006;
                    </Button>
                  </MenuItem>
                </Link>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages,
  stadiums: state.stadiums
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getStadium, delStadium }
  )
)(Stadiums);
