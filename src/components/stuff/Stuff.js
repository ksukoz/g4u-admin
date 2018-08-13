import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { getStuffMembers } from "../../actions/stuffActions";

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
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
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
  }
});

class Stuff extends Component {
  componentWillMount() {
    this.props.getStuffMembers();
  }

  render() {
    const { classes } = this.props;
    const { members } = this.props.stuff;

    let membersList;
    if (members !== null && members !== undefined) {
      membersList = members.map(member => (
        <TableRow key={member.id}>
          <TableCell component="th" scope="row">
            {`${member.surename} ${member.name} ${member.patronymic}`}
          </TableCell>
          <TableCell>
            <span>{member.type}</span>
          </TableCell>
          <TableCell>
            <img src={member.photo} style={{ width: "50px" }} alt="" />
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <div>
        <Button variant="extendedFab" className={classes.button}>
          <Link className={classes.button_link} to="/add-stuff">
            Добавить персонал
          </Link>
        </Button>
        <Paper className={classes.root}>
          {membersList ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ФИО</TableCell>
                  <TableCell>Должность</TableCell>
                  <TableCell>Изображение</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{membersList}</TableBody>
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
  stuff: state.stuff
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getStuffMembers }
  )
)(Stuff);
