import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  getAllCountries,
  setCountryStatus,
  getCountries
} from "../../actions/locationActions";

import Messages from "../common/Messages";

import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  input: {
    width: "300px",
    marginBottom: ".5rem"
  },
  select: {
    width: "100%"
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

class AddCountries extends Component {
  state = {
    open: true,
    country: ""
  };

  onChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value.replace(/[^a-zA-Z0-9]+/, "")
    });
  };

  onClickHandler = e => {
    this.props.setCountryStatus({ id: this.state.country });

    this.setState({
      ...this.state,
      open: true,
      country: ""
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState(
      { open: false },
      this.props.getAllCountries(),
      this.props.getCountries()
    );
  };

  componentWillMount = () => {
    this.props.getCountries();
  };

  componentDidMount = () => {
    if (this.props.messages.length === 0 && this.props.errors.length === 0) {
      this.props.getAllCountries();
    }
  };

  render() {
    const { classes } = this.props;
    const { countries, fullCountries } = this.props.location;

    let fullCountriesList;
    let countriesList;

    if (fullCountries !== null) {
      fullCountriesList = fullCountries.map(country => (
        <MenuItem key={country.id} value={country.id}>
          {country.nicename}
        </MenuItem>
      ));
    }

    if (countries !== null) {
      countriesList = countries.map(country => (
        <ListItem key={country.id}>
          {/* <ListItemText inset primary={country.name} /> */}
          {country.name}
        </ListItem>
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
        <FormControl className={classes.input}>
          <InputLabel htmlFor="country">
            <FormattedMessage id="settings.country" />
          </InputLabel>
          <Select
            className={classes.select}
            value={this.state.country}
            onChange={this.onChangeHandler}
            placeholder={<FormattedMessage id="settings.country" />}
            inputProps={{
              name: "country",
              id: "country"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fullCountriesList}
          </Select>
        </FormControl>
        <Button onClick={this.onClickHandler}>
          <FormattedMessage id="settings.change" />
        </Button>
        <div>
          <h3>
            <FormattedMessage id="settings.title" />
          </h3>
        </div>
        <List>{countriesList}</List>
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
    { getAllCountries, setCountryStatus, getCountries }
  )
)(AddCountries);
