import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { addTournament } from "../../actions/tournamentActions";

import Messages from "../common/Messages";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  form: {
    width: "49%"
  },
  input: {
    width: "100%",
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

class AddTournaments extends Component {
  state = {
    open: false,
    subLeague: "",
    name: "",
    vk: "",
    fb: "",
    youtube: "",
    rating: false,
    status: false,
    type: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newTournament = {
      title: this.state.name,
      type: this.state.type,
      show_in_app: this.state.status,
      game_to_rating: this.state.rating,
      sub_league_id: this.state.subLeague,
      VK: this.state.vk,
      FB: this.state.fb,
      Youtube: this.state.youtube
    };

    this.props.addTournament(newTournament);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  toggleChange = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
    console.log(e.target);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      subLeague: this.props.match.url.replace(/\D/g, "")
    });
  }

  render() {
    const { classes } = this.props;

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
        <form className="player__form" onSubmit={this.onSubmitHandler}>
          <TextField
            label={<FormattedMessage id="tournaments.nameLabel" />}
            name="name"
            className={classes.input}
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label={<FormattedMessage id="tournaments.vkLabel" />}
            name="vk"
            className={classes.input}
            value={this.state.vk}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label={<FormattedMessage id="tournaments.fbLabel" />}
            name="fb"
            className={classes.input}
            value={this.state.fb}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label={<FormattedMessage id="tournaments.youtubeLabel" />}
            name="youtube"
            className={classes.input}
            value={this.state.youtube}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rating"
                checked={this.state.rating}
                classes={{ root: classes.checkbox, checked: classes.checked }}
                onChange={this.toggleChange}
              />
            }
            label={<FormattedMessage id="tournaments.ratingLabel" />}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="status"
                checked={this.state.status}
                classes={{ root: classes.checkbox, checked: classes.checked }}
                onChange={this.toggleChange}
              />
            }
            label={<FormattedMessage id="tournaments.showLabel" />}
          />
          <FormControl className={classes.input}>
            <InputLabel htmlFor="type">
              <FormattedMessage id="tournaments.typeLabel" />
            </InputLabel>
            <Select
              value={this.state.type}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "type",
                id: "type"
              }}
            >
              <MenuItem value="" />
              <MenuItem value="league">Лига</MenuItem>
              <MenuItem value="cup">Кубок</MenuItem>
            </Select>
          </FormControl>
          <Button size="large" type="submit" className={classes.submit}>
            <FormattedMessage id="tournaments.submit" />
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addTournament }
  )
)(AddTournaments);
