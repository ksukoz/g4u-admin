import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getPlayers, getPlayersRequests } from "../../actions/playerActions";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
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
    this.props.getPlayersRequests();
  }

  render() {
    const { classes } = this.props;
    const { members, requests } = this.props.players;

    let membersList;
    let addRequestsList;
    let editRequestsList;

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
    if (requests !== null && requests !== undefined) {
      addRequestsList = requests.add.map((member, i) => (
        <TableRow key={member.player.id} style={{ cursor: "pointer" }}>
          <TableCell component="th" scope="row">
            {`${member.player.name} ${member.player.patronymic} ${
              member.player.surename
            }`}
          </TableCell>

          <TableCell>{member.command.title}</TableCell>
          <TableCell>
            <img src={member.command.logo} style={{ width: "50px" }} alt="" />
          </TableCell>
        </TableRow>
      ));

      editRequestsList = requests.edit.map((member, i) => (
        <TableRow key={member.player.id} style={{ cursor: "pointer" }}>
          <TableCell component="th" scope="row">
            {`${member.player.name} ${member.player.patronymic} ${
              member.player.surename
            }`}
          </TableCell>

          <TableCell>{member.command.title}</TableCell>
          <TableCell>
            <img src={member.command.logo} style={{ width: "50px" }} alt="" />
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
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.expSummary}
          >
            Запросы на добавление
          </ExpansionPanelSummary>
          {addRequestsList ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="players.tableName" />
                  </TableCell>
                  <TableCell>Команда</TableCell>
                  <TableCell>Логотип команды</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{addRequestsList}</TableBody>
            </Table>
          ) : (
            ""
          )}
        </ExpansionPanel>
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.expSummary}
          >
            Запросы на редактирование
          </ExpansionPanelSummary>
          {addRequestsList ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <FormattedMessage id="players.tableName" />
                  </TableCell>
                  <TableCell>Команда</TableCell>
                  <TableCell>Логотип команды</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{editRequestsList}</TableBody>
            </Table>
          ) : (
            ""
          )}
        </ExpansionPanel>
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.expSummary}
          >
            Все игроки
          </ExpansionPanelSummary>
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
        </ExpansionPanel>
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
    { getPlayers, getPlayersRequests }
  )
)(Players);
