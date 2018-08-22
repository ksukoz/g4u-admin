import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { getLeagues } from "../../actions/leagueActions";
import { getRegions } from "../../actions/locationActions";
import AddLeague from "./AddLeague";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

class Leagues extends Component {
  componentDidMount = () => {
    this.props.getLeagues();
  };

  render() {
    const { classes } = this.props;
    const { leagues } = this.props.league;
    let leaguesList;
    if (leagues !== null) {
      leaguesList = leagues.map(league => (
        <TableRow key={league.id}>
          <TableCell component="th" scope="row">
            {league.title}
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <div>
        <AddLeague />
        <Paper className={classes.root}>
          {leaguesList ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="leagues.tableHeading" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{leaguesList}</TableBody>
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
  league: state.league
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getLeagues, getRegions }
  )
)(withRouter(Leagues));
