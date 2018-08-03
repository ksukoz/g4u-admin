import React, { Component } from "react";
import { connect } from "react-redux";
import AddStuff from "./AddStuff";
import { getStuffMembers } from "../../actions/stuffActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class Stuff extends Component {
  componentWillMount() {
    this.props.getStuffMembers();
  }

  render() {
    const { members } = this.props.stuff;

    let membersList;
    if (members !== null && members !== undefined) {
      membersList = members.map(member => (
        <ListItem key={member.id}>
          <img src={member.photo} style={{ width: "50px" }} alt="" />
          {`${member.surename} ${member.name} ${member.patronymic}`}
          <span>{member.type}</span>
        </ListItem>
      ));
    }

    return (
      <div>
        <AddStuff />
        <List>{membersList}</List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stuff: state.stuff
});

export default connect(
  mapStateToProps,
  { getStuffMembers }
)(Stuff);
