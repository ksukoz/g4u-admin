import React, { Component } from "react";
import { connect } from "react-redux";
import { getStuffMembersByName, mergeStuff } from "../../actions/stuffActions";
import { getUsersByName } from "../../actions/userActions";

class MergeStuff extends Component {
  state = {
    name: "",
    nickname: "",
    usId: "",
    persId: ""
  };

  onChange = e => {
    if (e.target.name === "name" && e.target.value.length >= 3) {
      this.props.getStuffMembersByName(e.target.value);
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
        persId: e.target.dataset.id
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
      persId: this.state.persId
    };

    if (!merging.usId || !merging.persId) {
      console.log("merging failed");
    } else {
      this.props.mergeStuff(merging);
    }
  };

  render() {
    const { members } = this.props.stuff;
    const { userList } = this.props.users;
    let memberList;
    let userArr;
    if (members !== null) {
      memberList = members.map(member => (
        <li
          key={member.id}
          data-id={member.id}
          data-name="member"
          onClick={this.onClick}
        >
          <img src={member.photo} style={{ width: "50px" }} alt="" />
          {`${member.surename} ${member.name} ${member.patronymic}`}
          <span>{member.type}</span>
        </li>
      ));
    }

    if (userList !== null) {
      userArr = userList.map(user => (
        <li
          key={user.id}
          data-id={user.id}
          data-name="user"
          onClick={this.onClick}
        >
          {user.nickname}
        </li>
      ));
    }

    return (
      <div>
        <div>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Минимум 3 буквы"
          />
          <div>
            <ul>{memberList}</ul>
          </div>
        </div>

        <div>
          <input
            type="text"
            name="nickname"
            value={this.state.nickname}
            onChange={this.onChange}
            placeholder="Минимум 3 буквы"
          />
          <div>
            <ul>{userArr}</ul>
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <input type="submit" value="Объединить" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stuff: state.stuff,
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    getStuffMembersByName,
    getUsersByName,
    mergeStuff
  }
)(MergeStuff);
