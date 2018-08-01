import React, { Component } from "react";
import { connect } from "react-redux";
import { addLeague } from "../../actions/leagueActions";
import { getCountries } from "../../actions/locationActions";

class AddLeague extends Component {
  state = {
    name: "",
    status: false,
    country: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const newLeague = {
      name: this.state.name,
      status: this.state.status,
      country_id: this.state.country
    };

    this.props.addLeague(newLeague);
  };

  componentWillMount() {
    this.props.getCountries();
  }

  render() {
    const { countries } = this.props.location;
    let countriesList;
    if (countries !== null) {
      countriesList = countries.map(country => (
        <option key={country.id} value={country.iso}>
          {country.name}
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
          <select name="country" id="" onChange={this.onChangeHandler}>
            {countriesList}
          </select>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(
  mapStateToProps,
  { addLeague, getCountries }
)(AddLeague);
