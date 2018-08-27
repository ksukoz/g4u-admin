import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { addLeague } from "../../actions/leagueActions";
import { getCountries } from "../../actions/locationActions";

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
    width: "70%",
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

class AddLeague extends Component {
  state = {
    open: false,
    name: "",
    status: false,
    country: ""
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    this.setState({ ...this.state, open: true });

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
    const { classes } = this.props;
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
            label={<FormattedMessage id="leagues.nameLabel" />}
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
            label={<FormattedMessage id="leagues.showLabel" />}
          />
          <FormControl className={classes.input}>
            <InputLabel htmlFor="country">
              <FormattedMessage id="leagues.countryLabel" />
            </InputLabel>
            <Select
              value={this.state.country}
              className={classes.select}
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
          <Button size="large" type="submit" className={classes.submit}>
            <FormattedMessage id="leagues.submit" />
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addLeague, getCountries }
  )
)(AddLeague);
