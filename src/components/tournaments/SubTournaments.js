import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getSubtournaments } from "../../actions/tournamentActions";

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

class SubTournaments extends Component {
  state = {
    season: "",
    subtournamentsList: null
  };

  componentDidMount() {
    this.props.getSubtournaments(this.props.match.url.replace(/\D/g, ""));
    this.setState({
      ...this.state,
      season: this.props.match.url.replace(/\D/g, "")
    });
  }

  componentWillReceiveProps = nextProps => {
    // console.log(nextProps.tournaments);
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.subtournaments !== null) {
      this.setState({
        ...this.state,
        subtournamentsList: nextProps.tournaments.subtournaments
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Link
          className={classes.button_link}
          to={
            this.state.season ? `/subtournaments/add/${this.state.season}` : "/"
          }
        >
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="seasons.add" />
          </Button>
        </Link>
        <List>
          {this.state.subtournamentsList !== null
            ? this.state.subtournamentsList.map(subtournament => (
                <MenuItem
                  className={classes.listItem}
                  key={subtournament.id}
                  value={subtournament.id}
                >
                  {subtournament.title}
                </MenuItem>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getSubtournaments }
  )
)(SubTournaments);
