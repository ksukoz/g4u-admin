import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { getMerging, confirmMerging } from "../../actions/mergeActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  flex_cell: {
    display: "flex",
    justifyContent: "flex-end"
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
  }
});

class Merge extends Component {
  onClickHandler = e => {
    let button;
    e.target.tagName !== "BUTTON"
      ? (button = e.target.parentNode)
      : (button = e.target);

    const newReq = {
      type: button.dataset.type,
      id: button.dataset.id,
      confirm: button.dataset.confirm
    };

    this.props.confirmMerging(newReq);
  };

  componentDidMount() {
    this.props.getMerging();
  }

  render() {
    const { classes } = this.props;
    const { mergeList } = this.props.merge;
    let list;
    if (mergeList !== null) {
      list = mergeList.map(item => (
        <TableRow key={item.utp_id}>
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell>{item.nickname}</TableCell>
          <TableCell className={classes.flex_cell}>
            {item.moder === 0 ? (
              <Button
                className={classes.submit}
                data-id={item.utp_id}
                data-type={item.type}
                data-confirm="1"
                onClick={this.onClickHandler}
              >
                <FormattedMessage id="combine.tableAccept" />
              </Button>
            ) : (
              ""
            )}
            <Button
              className={classes.button}
              data-id={item.utp_id}
              data-type={item.type}
              data-confirm="0"
              onClick={this.onClickHandler}
            >
              <FormattedMessage id="combine.tableCancel" />
            </Button>
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <div>
        <Paper className={classes.root}>
          {list ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="combine.tablePerson" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="combine.tableUser" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>{list}</TableBody>
            </Table>
          ) : (
            ""
          )}
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  merge: state.merge
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getMerging, confirmMerging }
  )
)(Merge);
