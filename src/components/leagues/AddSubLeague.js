import React, { Component } from "react";
import { connect } from "react-redux";
import { addSubLeague } from "../../actions/leagueActions";
import { getCities, getRegions } from "../../actions/locationActions";
import { getLeagues } from "../../actions/leagueActions";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

class AddSubLeague extends Component {
  state = {
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

  onSubmitHandler = e => {
    e.preventDefault();
    const newSubLeague = {
      name: this.state.name,
      status: this.state.status,
      city_id: this.state.city,
      league_id: this.state.league.id
    };

    this.props.addSubLeague(newSubLeague);
  };

  componentDidMount = () => {
    this.props.getLeagues();
  };

  render() {
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
        <form className="league__form" onSubmit={this.onSubmitHandler}>
          <TextField
            label="Название лиги"
            name="name"
            className="text-field"
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <Checkbox checked={this.state.status} onChange={this.toggleChange} />
          <FormControl className="select">
            <InputLabel htmlFor="league">Выбрать страну</InputLabel>
            <Select
              value={this.state.league}
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
          <FormControl className="select">
            <InputLabel htmlFor="region">Выбрать регион</InputLabel>
            <Select
              value={this.state.region}
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
          <FormControl className="select">
            <InputLabel htmlFor="city">Выбрать город</InputLabel>
            <Select
              value={this.state.city}
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
            color="primary"
            size="large"
            type="submit"
            className="btn"
          >
            Сохранить
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  league: state.league
});

export default connect(
  mapStateToProps,
  { addSubLeague, getCities, getRegions, getLeagues }
)(AddSubLeague);
