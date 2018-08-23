import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  getAllCountries,
  setCountryStatus
} from "../../actions/locationActions";

import Messages from "../common/Messages";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
    country: null
  };

  onChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: JSON.parse(e.target.value)
    });
  };

  onClickHandler = e => {
    const country = this.state.country;
    country.status = country.status;

    this.props.setCountryStatus(country);
    this.props.getAllCountries();

    this.setState({
      ...this.state,
      country: null
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.props.getAllCountries();
  };

  render() {
    const { classes } = this.props;
    const { countries } = this.props.location;

    let countriesList;

    if (countries !== null) {
      countriesList = countries.map(country => (
        <MenuItem
          key={country.id}
          value={JSON.stringify({ id: country.id, status: country.enable })}
        >
          {country.nicename}
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
            message={this.props.messagex}
            onClose={this.handleClose}
            classes={classes.success}
          />
        ) : (
          ""
        )}
        <FormControl className={classes.input}>
          <InputLabel htmlFor="country">
            <FormattedMessage id="stuff.positionLabel" />
          </InputLabel>
          <Select
            className={classes.select}
            value={JSON.stringify(this.state.country)}
            onChange={this.onChangeHandler}
            inputProps={{
              name: "country",
              id: "country"
            }}
          >
            <MenuItem value="null">
              <em>None</em>
            </MenuItem>
            {countriesList}
          </Select>
        </FormControl>
        <Button onClick={this.onClickHandler}>
          {this.state.country === null
            ? "Выключить"
            : this.state.country.status === "0"
              ? "Включить"
              : "Выключить"}
        </Button>
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
    { getAllCountries, setCountryStatus }
  )
)(AddCountries);
