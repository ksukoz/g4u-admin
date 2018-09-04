import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { getStuffMembersByName, mergeStuff } from "../../actions/stuffActions";
import { getUsersByName } from "../../actions/userActions";

import Messages from "../common/Messages";
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
    maxWidth: "100%"
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
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class MergeStuff extends Component {
  state = {
    open: false,
    name: "",
    nickname: "",
    usId: "",
    persId: ""
  };

  onRadioChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onChangeHandler = e => {
    if (e.target.name === "name" && e.target.value.length >= 3) {
      this.props.getStuffMembersByName(e.target.value);
    } else if (e.target.name === "nickname" && e.target.value.length >= 3) {
      this.props.getUsersByName(e.target.value);
    }

    this.setState({
      [e.target.name]: e.target.value.replace(/[а-я]+/ig, "")
    });
  };

  onClick = e => {
    if (e.target.parentNode.dataset.name === "member") {
      this.setState({
        ...this.state,
        persId: e.target.parentNode.dataset.id
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
      persId: this.state.persId
    };

    this.props.mergeStuff(merging);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { members } = this.props.stuff;
    const { userList } = this.props.users;
    let memberList;
    let userArr;
    if (members !== null) {
      memberList = members.map(member => (
        <TableRow
          key={`member${member.id}`}
          data-id={member.id}
          data-name="member"
          onClick={this.onClick}
        >
          <TableCell className={classes.cell}>
            <Radio
              checked={this.state.persId === member.id}
              onChange={this.onRadioChangeHandler}
              value={member.id}
              name="member"
              aria-label={member.id}
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          </TableCell>
          <TableCell component="th" scope="row" className={classes.cell}>
            {`${member.surename} ${member.name} ${member.patronymic}`}
          </TableCell>
          <TableCell className={classes.cell}>
            <span>{member.type}</span>
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
            label={<FormattedMessage id="combine.inputUserLabel" />}
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
            <FormattedMessage id="combine.combine" />
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stuff: state.stuff,
  users: state.users,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getStuffMembersByName,
      getUsersByName,
      mergeStuff
    }
  )
)(MergeStuff);
