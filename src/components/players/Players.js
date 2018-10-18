import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  getPlayers,
  getPlayersRequests,
  getFilteredPlayers
} from "../../actions/playerActions";

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
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

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
  },
  filtersWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem"
  },
  paginationWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200
  },
  select: {
    width: 150
  }
});

class Players extends Component {
  state = {
    name: "",
    command: "",
    offset: 1,
    limit: 50
  };

  onPlayerClick = id => {
    this.props.history.push(`/players/${id}`);
  };

  onClickHandler = e => {};

  onChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });

    if (e.target.name === "name" && e.target.value.length >= 3) {
      this.props.getFilteredPlayers(
        `name=${e.target.value}`,
        this.state.command ? `comId=${this.state.command}` : "",
        `limit=${this.state.limit}`,
        `offset=${this.state.offset}`
        // `order=${this.state.order}`,
        // `up=${this.state.up}`
      );
    } else if (e.target.name === "command") {
      this.props.getFilteredPlayers(
        this.state.name.length >= 3 ? `name=${this.state.name}` : "",
        `comId=${e.target.value}`,
        `limit=${this.state.limit}`,
        `offset=${this.state.offset}`
        // `order=${this.state.order}`,
        // `up=${this.state.up}`
      );
    } else if (e.target.name === "limit") {
      this.props.getFilteredPlayers(
        this.state.name.length >= 3 ? `name=${this.state.name}` : "",
        this.state.command ? `comId=${this.state.command}` : "",
        `limit=${e.target.value}`,
        `offset=${this.state.offset}`
        // `order=${this.state.order}`,
        // `up=${this.state.up}`
      );
    }
  };

  onRowClickHandler = id => {
    this.props.history.push(`/requestplayers/${id}`);
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
    let commandList;
    let limitList;
    let pagesList;

    if (members !== null && members !== undefined) {
      membersList = members.players.map(member => (
        <TableRow key={member.player_id} style={{ cursor: "pointer" }}>
          <TableCell component="th" scope="row">
            {member.name}
          </TableCell>
          <TableCell>
            <span>
              <img
                src={member.cmLogo}
                style={{ width: "50px", height: 50, marginRight: 10 }}
                alt=""
              />
              {member.cmTitle}
            </span>
          </TableCell>
          <TableCell>
            <img src={member.photo} style={{ width: "50px" }} alt="" />
          </TableCell>
          <TableCell>
            <Button
              className={classes.cross}
              onClick={this.onClickHandler.bind(this, member.plId)}
              name={member.plId}
            >
              &#10006;
            </Button>
            <Button
              className={classes.pencil}
              onClick={this.onPlayerClick.bind(this, member.plId)}
              name={member.plId}
            >
              &#x270E;
            </Button>
          </TableCell>
        </TableRow>
      ));

      commandList = members.filters.commands.map(command => (
        <MenuItem key={command.comId} value={command.comId}>
          {command.title}
        </MenuItem>
      ));

      limitList = members.filters.limit.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ));

      pagesList = (
        // <Col s={2}>
        <div className={classes.paginationWrap}>
          <Button
            variant="fab"
            className={classes.pagination}
            onClick={() =>
              members.filters.offset.prev >= 0
                ? this.setState(
                    { ...this.state, offset: members.filters.offset.prev },
                    this.props.getFilteredPlayers(
                      this.state.name.length >= 3
                        ? `name=${this.state.name}`
                        : "",
                      this.state.command ? `comId=${this.state.command}` : "",
                      // `limit=${this.state.limit}`,
                      `offset=${members.filters.offset.prev}`
                      // `order=${this.state.order}`,
                      // `up=${this.state.up}`
                    )
                  )
                : ""
            }
            disabled={
              members.filters.offset.prev !== 0 && !members.filters.offset.prev
            }
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <span>{+members.filters.offset.curr + 1}</span>
          <Button
            variant="fab"
            className={classes.pagination}
            onClick={() =>
              members.filters.offset.next
                ? this.setState(
                    { ...this.state, offset: members.filters.offset.next },
                    this.props.getFilteredPlayers(
                      this.state.name.length >= 3
                        ? `name=${this.state.name}`
                        : "",
                      this.state.command !== 0
                        ? `comId=${this.state.command}`
                        : "",
                      // `limit=${this.state.limit}`,
                      `offset=${members.filters.offset.next}`
                      // `order=${this.state.order}`,
                      // `up=${this.state.up}`
                    )
                  )
                : ""
            }
            disabled={!members.filters.offset.next}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </div>
        // </Col>
      );
    }

    if (requests !== null && requests !== undefined) {
      addRequestsList = requests.add.map((member, i) => (
        <TableRow
          key={member.player.id}
          style={{ cursor: "pointer" }}
          onClick={this.onRowClickHandler.bind(this, member.player.id)}
        >
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
        <TableRow
          key={member.player.id}
          style={{ cursor: "pointer" }}
          onClick={this.onRowClickHandler.bind(this, member.player.id)}
        >
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
            Запросы на добавление{" "}
            {requests !== null && requests !== undefined
              ? `(${requests.add.length})`
              : ""}
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
            Запросы на редактирование{" "}
            {requests !== null && requests !== undefined
              ? `(${requests.edit.length})`
              : ""}
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
            <div>
              <div className={classes.filtersWrap}>
                <TextField
                  label={<FormattedMessage id="players.nameLabel" />}
                  name="name"
                  className={classes.input}
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                  margin="normal"
                />

                <FormControl className={classes.input}>
                  <InputLabel htmlFor="command">Команда</InputLabel>
                  <Select
                    className={classes.select}
                    value={this.state.command}
                    onChange={this.onChangeHandler}
                    inputProps={{
                      name: "command",
                      id: "command"
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Свободные игроки</MenuItem>
                    {commandList}
                  </Select>
                </FormControl>

                <FormControl className={classes.input}>
                  <InputLabel htmlFor="limit">Выводить по</InputLabel>
                  <Select
                    className={classes.select}
                    value={this.state.limit}
                    onChange={this.onChangeHandler}
                    inputProps={{
                      name: "limit",
                      id: "limit"
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {limitList}
                  </Select>
                </FormControl>

                {pagesList}
              </div>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="players.tableName" />
                    </TableCell>
                    <TableCell>Команда</TableCell>
                    <TableCell>
                      <FormattedMessage id="players.tableImage" />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>{membersList}</TableBody>
              </Table>
            </div>
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
    { getPlayers, getPlayersRequests, getFilteredPlayers }
  )
)(Players);
