import React, { Component } from "react";
import { connect } from "react-redux";
import { getMerging } from "../../actions/mergeActions";

class Merge extends Component {
  componentDidMount() {
    this.props.getMerging();
  }

  render() {
    const { mergeList } = this.props.merge;
    let list;
    if (mergeList !== null) {
      list = mergeList.map(item => (
        <li key={item.utp_id}>
          <span>{item.name}</span> + {item.nickname} <span>{item.moder}</span>
        </li>
      ));
    }

    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  merge: state.merge
});

export default connect(
  mapStateToProps,
  { getMerging }
)(Merge);
