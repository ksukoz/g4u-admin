import React, { Component } from "react";
import { connect } from "react-redux";
import { addLeague } from "../../actions/leagueActions";
import { getCountries } from "../../actions/locationActions";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

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
    if (countries !== null && countries !== undefined) {
      countriesList = countries.map(country => (
        <MenuItem key={country.id} value={country.iso}>
          {country.name}
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
            <InputLabel htmlFor="country">Выбрать страну</InputLabel>
            <Select
              value={this.state.country}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "country",
                id: "country"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countriesList}
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
  location: state.location
});

export default connect(
  mapStateToProps,
  { addLeague, getCountries }
)(AddLeague);
