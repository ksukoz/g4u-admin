import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { addSubLeague } from "../../actions/leagueActions";
import { getCities, getRegions } from "../../actions/locationActions";
import { getLeagues } from "../../actions/leagueActions";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
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
    width: "24%"
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
    margin: theme.spacing.unit,
    background: "transparent",
    color: "rgba(0,0,0,.5)",
    transition: ".3s",
    "&:hover, &:active": {
      backgroundColor: "#43A047",
      color: "#fff"
    }
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class AddSubLeague extends Component {
  state = {
    open: false,
    name: "",
    status: false,
    league: null,
    region: "",
    city: ""
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  onLeagueChange = e => {
    this.setState({ [e.target.name]: JSON.parse(e.target.value) });
    this.props.getRegions(JSON.parse(e.target.value).country);
  };

  onClickHandler = e => {
    this.setState({ league: e.target.dataset.id });
  };

  onRegionChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.getCities(e.target.value);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newSubLeague = {
      name: this.state.name,
      status: this.state.status,
      city_id: this.state.city,
      league_id: this.state.league !== null ? this.state.league.id : ""
    };

    this.props.addSubLeague(newSubLeague);
  };

  componentDidMount = () => {
    this.props.getLeagues();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { leagues } = this.props.league;
    let leaguesList;
    if (leagues !== null) {
      leaguesList = leagues.map(league => (
        <MenuItem
          key={league.id}
          value={JSON.stringify({ country: league.country, id: league.id })}
          data-id={league.id}
        >
          {league.title}
        </MenuItem>
      ));
    }

    const { regions } = this.props.location;
    let regionsList;
    if (regions !== null) {
      regionsList = regions.map(region => (
        <MenuItem key={region.id} value={region.id}>
          {region.name}
        </MenuItem>
      ));
    }

    const { cities } = this.props.location;
    let citiesList;
    if (cities !== null) {
      citiesList = cities.map(cities => (
        <MenuItem key={cities.id} value={cities.id}>
          {cities.name}
        </MenuItem>
      ));
    }

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
        <form className={classes.input_wrap} onSubmit={this.onSubmitHandler}>
          <TextField
            label={<FormattedMessage id="subLeagues.nameLabel" />}
            name="name"
            className={classes.input}
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.status}
                classes={{ root: classes.checkbox, checked: classes.checked }}
                onChange={this.toggleChange}
              />
            }
            label={<FormattedMessage id="subLeagues.showLabel" />}
          />
          <FormControl className={classes.input}>
            <InputLabel htmlFor="league">
              <FormattedMessage id="subLeagues.leagueLabel" />
            </InputLabel>
            <Select
              value={
                this.state.league !== null
                  ? JSON.stringify(this.state.league)
                  : ""
              }
              className={classes.select}
              onChange={this.onLeagueChange}
              inputProps={{
                name: "league",
                id: "league"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {leaguesList}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="region">
              <FormattedMessage id="subLeagues.regionLabel" />
            </InputLabel>
            <Select
              value={this.state.region}
              className={classes.select}
              onChange={this.onRegionChange}
              inputProps={{
                name: "region",
                id: "region"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {regionsList}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="city">
              <FormattedMessage id="subLeagues.cityLabel" />
            </InputLabel>
            <Select
              value={this.state.city}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "city",
                id: "city"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {citiesList}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="large"
            type="submit"
            className={classes.submit}
          >
            {<FormattedMessage id="subLeagues.submit" />}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  league: state.league,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addSubLeague, getCities, getRegions, getLeagues }
  )
)(AddSubLeague);
