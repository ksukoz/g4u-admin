import React, { Component } from "react";
import { connect } from "react-redux";
import { addSubLeague } from "../../actions/leagueActions";
import { getCities, getRegions } from "../../actions/locationActions";
import { getLeagues } from "../../actions/leagueActions";

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
    console.log(e.target);
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
        <option
          key={league.id}
          value={JSON.stringify({ country: league.country, id: league.id })}
          data-id={league.id}
        >
          {league.title}
        </option>
      ));
    }

    const { regions } = this.props.location;
    let regionsList;
    if (regions !== null) {
      regionsList = regions.map(region => (
        <option key={region.id} value={region.id}>
          {region.name}
        </option>
      ));
    }

    const { cities } = this.props.location;
    let citiesList;
    if (cities !== null) {
      citiesList = cities.map(cities => (
        <option key={cities.id} value={cities.id}>
          {cities.name}
        </option>
      ));
    }

    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Название лиги"
            value={this.state.name}
            onChange={this.onChangeHandler}
          />
          <input
            type="checkbox"
            name="status"
            checked={this.state.status}
            onChange={this.toggleChange}
          />
          <select
            defaultValue="Выбрать основную лигу"
            name="league"
            id=""
            onChange={this.onLeagueChange}
          >
            <option value="Выбрать основную лигу" disabled>
              Выбрать основную лигу
            </option>
            {leaguesList}
          </select>
          <select
            defaultValue="Выбрать регион"
            name="region"
            id=""
            onChange={this.onRegionChange}
          >
            <option value="Выбрать регион" disabled>
              Выбрать регион
            </option>
            {regionsList}
          </select>
          <select
            defaultValue="Выбрать город"
            name="city"
            id=""
            onChange={this.onChangeHandler}
          >
            <option value="Выбрать город" disabled>
              Выбрать город
            </option>
            {citiesList}
          </select>
          <button type="submit">Сохранить</button>
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
