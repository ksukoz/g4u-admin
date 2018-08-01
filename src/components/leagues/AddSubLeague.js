import React, { Component } from "react";
import { connect } from "react-redux";
import { addSubLeague } from "../../actions/leagueActions";
import { getCities } from "../../actions/locationActions";

class AddSubLeague extends Component {
  state = {
    name: "",
    status: false,
    region: "",
    city: ""
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  onRegionChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // this.props.getCities(e.target.value);
    this.props.getCities(e.target.value);
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const newSubLeague = {
      name: this.state.name,
      status: this.state.status,
      city_id: this.state.city,
      league_id: this.props.league.currentLeague
    };

    this.props.addSubLeague(newSubLeague);
  };

  render() {
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
  { addSubLeague, getCities }
)(AddSubLeague);
