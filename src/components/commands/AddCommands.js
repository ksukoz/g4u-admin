import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import InputFile from "../common/InputFile";

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
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  form: {
    width: "49%"
  },
  imgWrap: {
    display: "flex"
  },
  img: {
    height: 42,
    marginLeft: "1rem"
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
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  },
  birthday: {
    marginTop: "1rem",
    width: "100%"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class AddCommands extends Component {
  state = {
    open: false,
    name: "",
    image: ""
  };

  onChangeFileHandler = e => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      this.setState({ ...this.state, openModal: true });
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener(
        "load",
        () => {
          this.setState({
            image: reader.result
          });
        },
        false
      );
    }
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrap}>
        <div className={classes.form}>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <TextField
              label={<FormattedMessage id="commands.nameLabel" />}
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
              className={classes.input}
              label={<FormattedMessage id="commands.showLabel" />}
            />
            <div className={classes.imgWrap}>
              <InputFile
                type="image"
                name="photo"
                onChange={this.onChangeFileHandler}
              />
              {this.state.image ? (
                <img className={classes.img} src={this.state.image} alt="" />
              ) : (
                ""
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submit}
            >
              {<FormattedMessage id="commands.submit" />}
            </Button>
          </form>
        </div>

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(AddCommands);
