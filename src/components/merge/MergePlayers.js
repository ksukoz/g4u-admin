import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlayersByName, mergePlayer } from "../../actions/playerActions";
import { getUsersByName } from "../../actions/userActions";

import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";

import Button from "@material-ui/core/Button";

class MergePlayers extends Component {
  state = {
    name: "",
    nickname: "",
    usId: "",
    playersId: ""
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
    if (e.target.dataset.name === "member") {
      this.setState({
        ...this.state,
        playersId: e.target.dataset.id
      });
    } else if (e.target.dataset.name === "user") {
      this.setState({
        ...this.state,
        usId: e.target.dataset.id
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
      console.log("merging failed");
    } else {
      this.props.mergePlayer(merging);
    }
  };

  render() {
    const { members } = this.props.players;
    const { userList } = this.props.users;
    let memberList;
    let userArr;
    if (members !== null) {
      memberList = members.map(member => (
        <ListItem
          key={member.player_id}
          data-id={member.player_id}
          data-name="member"
          onClick={this.onClick}
        >
          <img src={member.photo} style={{ width: "50px" }} alt="" />
          {`${member.surename} ${member.name} ${member.patronymic}`}
          <span>{member.type}</span>
        </ListItem>
      ));
    }

    if (userList !== null) {
      userArr = userList.map(user => (
        <ListItem
          key={user.id}
          data-id={user.id}
          data-name="user"
          onClick={this.onClick}
        >
          {user.nickname}
        </ListItem>
      ));
    }

    return (
      <div>
        <div>
          <TextField
            label="Минимум 3 буквы"
            name="name"
            className="text-field"
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <div>
            <ul>{memberList}</ul>
          </div>
        </div>

        <div>
          <TextField
            label="Минимум 3 буквы"
            name="nickname"
            className="text-field"
            value={this.state.nickname}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <div>
            <ul>{userArr}</ul>
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="btn"
          >
            Объединить
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

export default connect(
  mapStateToProps,
  {
    getPlayersByName,
    mergePlayer,
    getUsersByName
  }
)(MergePlayers);
