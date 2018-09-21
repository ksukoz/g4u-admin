import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";

import { getDatelessGames } from "../../actions/tournamentActions";
import Messages from "../common/Messages";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Button from "@material-ui/core/Button";

import CalendarIcon from "./icons/calendar.svg";

import { DateTimePicker } from "material-ui-pickers";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  form: {
    width: "70%",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%",
    marginRight: 8
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem",
    "& div div": {
      display: "flex"
    }
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    borderRadius: 40,
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
  rounds: {
    width: 500,
    marginBottom: "1rem"
  },
  roundsBtn: {
    border: "1px solid #43A047"
  },
  selected: {
    backgroundColor: "#43A047",
    color: "#fff"
  },
  flex: {
    display: "flex",
    width: "100%",
    "& span": {
      padding: "0 3rem"
    }
  },
  smSelect: {
    width: 100,
    marginRight: 8
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
  }
});

class DatelessGames extends Component {
  state = {
    date: new Date(),
    selected: []
    // selectedArray: []
  };

  onClickHandler = (e, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let selectedArray = [];
    if (selectedIndex === -1) {
      selectedArray = selectedArray.concat(selected, id);
    } else if (selectedIndex === 0) {
      selectedArray = selectedArray.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      selectedArray = selectedArray.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      selectedArray = selectedArray.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ ...this.state, selected: selectedArray });
    console.log(this.state.selected);
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount = () => {
    this.props.getDatelessGames(this.props.match.params.id);
  };
  render() {
    const { classes } = this.props;
    const { games } = this.props.tournaments;
    let gamesList;

    if (games) {
      gamesList = games.map(
        game =>
          game.length > 0
            ? game.map(gameDetails => {
                const isSelected = this.isSelected(gameDetails.game_id);
                return (
                  <TableRow
                    key={gameDetails.game_id}
                    onClick={e => this.onClickHandler(e, gameDetails.game_id)}
                  >
                    <TableCell>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell>{gameDetails.tour}</TableCell>
                    <TableCell>
                      {gameDetails.in.title} : {gameDetails.out.title}
                    </TableCell>
                  </TableRow>
                );
              })
            : ""
      );
    }

    return (
      <div>
        <Button
          onClick={() => this.props.history.goBack()}
          className={classes.button}
        >
          Назад
        </Button>
        <form onSubmit={this.onSubmitHander} className={classes.form}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              keyboard
              name="date"
              value={this.state.date}
              onChange={this.onChangeStartHandler}
              label="Выберите дату"
            />
          </MuiPickersUtilsProvider>
          <Button size="large" type="submit" className={classes.submit}>
            <FormattedMessage id="seasons.submit" />
          </Button>
        </form>
        <Paper className={classes.root}>
          <Table hover className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Тур</TableCell>
                <TableCell>Игра</TableCell>
                {/* <TableCell>Дата</TableCell> */}
                {/* <TableCell>Protein (g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>{gamesList}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getDatelessGames
    }
  )
)(DatelessGames);
