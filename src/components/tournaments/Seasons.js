import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getSeasons } from "../../actions/tournamentActions";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

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
    tournament: "",
    seasonsList: null
  };

  componentDidMount() {
    this.props.getSeasons(this.props.match.url.replace(/\D/g, ""));
    this.setState({
      ...this.state,
      tournament: this.props.match.url.replace(/\D/g, "")
    });
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.seasons !== null) {
      this.setState({
        ...this.state,
        seasonsList: nextProps.tournaments.seasons
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={() => this.props.history.goBack()}
          style={{ marginBottom: "1rem" }}
        >
          Назад
        </Button>
        <Link
          className={classes.button_link}
          to={
            this.state.tournament
              ? `/seasons/add/${this.state.tournament}`
              : "/"
          }
        >
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="seasons.add" />
          </Button>
        </Link>
        <List>
          {this.state.seasonsList !== null
            ? this.state.seasonsList.map(season => (
                <Link
                  className={classes.button_link}
                  to={`/subtournaments/${season.seaid}`}
                  key={season.seaid}
                >
                  <MenuItem className={classes.listItem} value={season.seaid}>
                    {season.title}
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
  tournaments: state.tournaments,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getSeasons }
  )
)(Seasons);
