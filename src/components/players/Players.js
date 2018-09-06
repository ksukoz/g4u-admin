import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getPlayers } from "../../actions/playerActions";

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
  },
  cross: {
    color: "#ff5e5e",
    float: "right"
  },
  pencil: {
    color: "#55a462",
    float: "right"
  }
});

class Players extends Component {
  onPlayerClick = id => {
    this.props.history.push(`/players/${id}`);
  };

  onClickHandler = id => {
    // e.preventDefault();
    // if (!e.target.name) {
    //   this.props.delStadium(e.target.parentNode.name);
    // } else {
    //   this.props.delStadium(e.target.name);
    // }
  };

  componentWillMount() {
    this.props.getPlayers();
  }

  render() {
    const { classes } = this.props;
    const { members } = this.props.players;

    let membersList;
    if (members !== null && members !== undefined) {
      membersList = members.map(member => (
        <TableRow key={member.player_id} style={{ cursor: "pointer" }}>
          <TableCell component="th" scope="row">
            {`${member.surename} ${member.name} ${member.patronymic}`}
          </TableCell>
          <TableCell>
            <span>{member.position}</span>
          </TableCell>
          <TableCell>
            <img src={member.photo} style={{ width: "50px" }} alt="" />
          </TableCell>
          <TableCell>
            <Button
              className={classes.cross}
              onClick={this.onClickHandler.bind(this, member.player_id)}
              name={member.player_id}
            >
              &#10006;
            </Button>
            <Button
              className={classes.pencil}
              onClick={this.onPlayerClick.bind(this, member.player_id)}
              name={member.player_id}
            >
              &#x270E;
            </Button>
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <div>
        <Link className={classes.button_link} to="/add-player">
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="players.add" />
          </Button>
        </Link>
        <Paper className={classes.root}>
          {membersList ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="players.tableName" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="players.tablePosition" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="players.tableImage" />
                  </TableCell>
                  <TableCell />
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
  players: state.players
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getPlayers }
  )
)(Players);
