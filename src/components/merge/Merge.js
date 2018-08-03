import React, { Component } from "react";
import { connect } from "react-redux";
import { getMerging, confirmMerging } from "../../actions/mergeActions";

class Merge extends Component {
  onClickHandler = e => {
    const newReq = {
      type: e.target.dataset.type,
      id: e.target.dataset.id,
      confirm: e.target.dataset.confirm
    };

    this.props.confirmMerging(newReq);
  };

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
          <button
            data-id={item.utp_id}
            data-type={item.type}
            data-confirm="1"
            onClick={this.onClickHandler}
          >
            Принять
          </button>
          <button
            data-id={item.utp_id}
            data-type={item.type}
            data-confirm="0"
            onClick={this.onClickHandler}
          >
            Отменить
          </button>
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
  { getMerging, confirmMerging }
)(Merge);
