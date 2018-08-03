import React, { Component } from "react";
import { connect } from "react-redux";
import AddPlayers from "./AddPlayers";
import { getPlayers } from "../../actions/playerActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Players extends Component {
  componentWillMount() {
    this.props.getPlayers();
  }

  render() {
    const { members } = this.props.players;

    let membersList;
    if (members !== null && members !== undefined) {
      membersList = members.map(member => (
        <ListItem key={member.id}>
          <img src={member.photo} style={{ width: "50px" }} alt="" />
          {`${member.surename} ${member.name} ${member.patronymic}`}
          <span>{member.position}</span>
        </ListItem>
      ));
    }

    return (
      <div>
        <AddPlayers />
        <List>{membersList}</List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default connect(
  mapStateToProps,
  { getPlayers }
)(Players);
