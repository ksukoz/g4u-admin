import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

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
  }
});

class Seasons extends Component {
  state = {
    tournament: ""
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      tournament: this.props.match.url.replace(/\D/g, "")
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Link
          className={classes.button_link}
          to={
            this.state.tournament
              ? `/seasons/add/${this.state.tournament}`
              : "/"
          }
        >
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="tournaments.add" />
          </Button>
        </Link>
        {/* <List>
        {this.state.seasons !== null
          ? this.state.seasons.map(season => (
              <MenuItem
                className={classes.listItem}
                key={season.season_id}
                value={season.season_id}
              >
                {season.title}
              </MenuItem>
            ))
          : ""}
      </List> */}
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    null
  )
)(Seasons);
