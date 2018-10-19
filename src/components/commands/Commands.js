import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Messages from "../common/Messages";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import {
  getAllCommandsByName,
  deleteCommand
} from "../../actions/commandsActions";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

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
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  cross: {
    color: "#ff5e5e",
    marginLeft: "auto"
  },
  img: {
    height: 40,
    marginRight: 8
  },
  filtersWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem"
  },
  paginationWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200
  },
  select: {
    width: 150
  }
});

class Commands extends Component {
  state = {
    open: false,
    search: "",
    offset: 0
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState({ open: false }, this.props.getAllCommandsByName());
    }

    this.setState({ open: false });
  };

  onChangeHandler = e => {
    if (
      e.target.value.replace(/[а-я]+/gi, "").length >= 3 &&
      e.target.name === "search"
    ) {
      this.props.getAllCommandsByName(
        `?name=${e.target.value.replace(/[а-я]+/gi, "")}&${
          this.state.city ? `citId=${this.state.city}&` : ""
        }offset=${this.state.offset}`
      );
    } else if (e.target.name === "city") {
      this.props.getAllCommandsByName(
        `?${
          this.state.search.length >= 3 ? `name=${this.state.search}&` : ""
        }&citId=${e.target.value}&offset=${this.state.offset}`
      );
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });
  };

  onDeleteClickHandler = id => e => {
    e.preventDefault();
    this.props.deleteCommand(id);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount = () => {
    this.props.getAllCommandsByName();
  };

  render() {
    const { classes } = this.props;
    const { commands } = this.props.commands;

    let citiesList;
    let pagesList;

    if (commands) {
      citiesList = commands.filters.city.map(item => (
        <MenuItem key={item.citId} value={item.citId}>
          {item.name}
        </MenuItem>
      ));

      pagesList = (
        <div className={classes.paginationWrap}>
          <Button
            variant="fab"
            className={classes.pagination}
            onClick={() =>
              commands.filters.prev >= 0
                ? this.setState(
                    { ...this.state, offset: commands.filters.prev },
                    this.props.getAllCommandsByName(`?
                      ${
                        this.state.search.length >= 3
                          ? `name=${this.state.search}&`
                          : ""
                      }
                      ${this.state.city ? `citId=${this.state.city}&` : ""}
                      offset=${commands.filters.prev}`)
                  )
                : ""
            }
            disabled={commands.filters.prev !== 0 && !commands.filters.prev}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <span>{+commands.filters.current + 1}</span>
          <Button
            variant="fab"
            className={classes.pagination}
            onClick={() =>
              commands.filters.next >= 0
                ? this.setState(
                    { ...this.state, offset: commands.filters.next },
                    this.props.getAllCommandsByName(`?${
                      this.state.search.length >= 3
                        ? `name=${this.state.search}&`
                        : ""
                    }${this.state.city ? `citId=${this.state.city}&` : ""}
                      offset=${commands.filters.next}`)
                  )
                : ""
            }
            disabled={!commands.filters.next}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </div>
      );
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
        <Link className={classes.button_link} to={"/add-command"}>
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="commands.add" />
          </Button>
        </Link>
        <List>
          <div className={classes.filtersWrap}>
            <TextField
              className={classes.input}
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.onChangeHandler}
              onInput={e => {
                e.target.value = e.target.value;
              }}
              label="Поиск"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              autoComplete="off"
            />
            <FormControl className={classes.input}>
              <InputLabel htmlFor="city">Команда</InputLabel>
              <Select
                className={classes.select}
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
            {pagesList}
          </div>
          {commands !== null && commands.all !== null
            ? commands.all.map(command => (
                <Link
                  className={classes.button_link}
                  to={`/commands/${command.command_id}`}
                  key={command.command_id}
                >
                  <MenuItem
                    className={classes.listItem}
                    value={command.command_id}
                  >
                    <img src={command.logo} alt="" className={classes.img} />
                    <span>{command.title}</span>
                    <Button
                      title="Заблокировать команду"
                      className={classes.cross}
                      onClick={this.onDeleteClickHandler(command.command_id)}
                      name={command.command_id}
                    >
                      &#10006;
                    </Button>
                  </MenuItem>
                </Link>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commands: state.commands,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAllCommandsByName, deleteCommand }
  )
)(Commands);
