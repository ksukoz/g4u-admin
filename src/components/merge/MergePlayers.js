import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { getPlayersByName, mergePlayer } from "../../actions/playerActions";
import { getUsersByName } from "../../actions/userActions";

import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  alert: {
    width: "100%",
    padding: "1rem 0",
    textAlign: "center"
  },
  wrapper: {
    width: "49%",
    marginBottom: "2rem"
  },
  table: {
    maxWidth: "100%",
    overflowX: "hidden"
  },
  flex_cell: {
    display: "flex",
    justifyContent: "flex-end"
  },
  input: {
    width: "100%"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff"
  },
  button: {
    display: "block",
    background: "#fff",
    border: "1px solid #55a462",
    borderRadius: 40,
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover span,&:active": {
      color: "#fff"
    }
  },
  root: {
    color: "#55a462",
    "&$checked": {
      color: "#55a462"
    }
  },
  checked: {},
  cell: {
    padding: "10px"
  }
});

class MergePlayers extends Component {
  state = {
    name: "",
    nickname: "",
    usId: "",
    playersId: "",
    alert: ""
  };

  onRadioChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onChangeHandler = e => {
    if (e.target.name === "name" && e.target.value.length >= 3) {
      this.props.getPlayersByName(e.target.value);
    } else if (e.target.name === "nickname" && e.target.value.length >= 3) {
      this.props.getUsersByName(e.target.value);
    }

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    if (e.target.parentNode.dataset.name === "member") {
      this.setState({
        ...this.state,
        playersId: e.target.parentNode.dataset.id
      });
    } else if (e.target.parentNode.dataset.name === "user") {
      this.setState({
        ...this.state,
        usId: e.target.parentNode.dataset.id
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const merging = {
      usId: this.state.usId,
      playerId: this.state.playersId
    };

    if (!merging.usId || !merging.playerId) {
      this.setState({
        ...this.state,
        alert: "Выбирете и пользователя, и игрока"
      });
    } else {
      this.props.mergePlayer(merging);
      this.setState({
        ...this.state,
        alert: "Вы успешно объединили персонажей"
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { members } = this.props.players;
    const { userList } = this.props.users;
    let memberList;
    let userArr;
    if (members !== null) {
      memberList = members.map(member => (
        <TableRow
          key={`member${member.player_id}`}
          data-id={member.player_id}
          data-name="member"
          onClick={this.onClick}
        >
          <TableCell className={classes.cell}>
            <Radio
              checked={this.state.playersId === member.player_id}
              onChange={this.onRadioChangeHandler}
              value={member.player_id}
              name="member"
              aria-label={member.player_id}
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          </TableCell>
          <TableCell component="th" scope="row" className={classes.cell}>
            {`${member.surename} ${member.name} ${member.patronymic}`}
          </TableCell>
          <TableCell component="th" scope="row" className={classes.cell}>
            {member.position}
          </TableCell>
          <TableCell className={classes.cell}>
            <img src={member.photo} style={{ width: "50px" }} alt="" />
          </TableCell>
        </TableRow>
      ));
    }

    if (userList !== null) {
      userArr = userList.map(user => (
        <TableRow
          key={user.id}
          data-id={user.id}
          data-name="user"
          onClick={this.onClick}
        >
          <TableCell component="th" scope="row" className={classes.cell}>
            <Radio
              checked={this.state.usId === user.id}
              onChange={this.onRadioChangeHandler}
              value={user.id}
              name="member"
              aria-label={user.id}
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          </TableCell>
          <TableCell component="th" scope="row" className={classes.cell}>
            {user.nickname}
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <div className={classes.container}>
        {this.state.alert ? (
          <Paper className={classes.alert}>{this.state.alert}</Paper>
        ) : (
          ""
        )}
        <div className={classes.wrapper}>
          <TextField
            label={<FormattedMessage id="combine.inputLabel" />}
            name="name"
            className={classes.input}
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <Paper className={classes.root}>
            {memberList ? (
              <Table className={classes.table}>
                {/* <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>ФИО</TableCell>
                    <TableCell>Должность</TableCell>
                    <TableCell>Изображение</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>{memberList}</TableBody>
              </Table>
            ) : (
              ""
            )}
          </Paper>
        </div>

        <div className={classes.wrapper}>
          <TextField
            label={<FormattedMessage id="combine.inputLabel" />}
            name="nickname"
            className={classes.input}
            value={this.state.nickname}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <Paper className={classes.root}>
            {userArr ? (
              <Table className={classes.table}>
                {/* <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Пользователь</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>{userArr}</TableBody>
              </Table>
            ) : (
              ""
            )}
          </Paper>
        </div>

        <form onSubmit={this.onSubmit}>
          <Button
            className={classes.submit}
            type="submit"
            size="large"
            variant="contained"
          >
            {<FormattedMessage id="combine.combine" />}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  users: state.users
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getPlayersByName,
      mergePlayer,
      getUsersByName
    }
  )
)(MergePlayers);
