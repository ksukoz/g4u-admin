import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import { getStadium } from "../../actions/stadiumAction";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
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
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class Stadiums extends Component {
  componentDidMount = () => {
    this.props.getStadium();
  };

  render() {
    const { classes } = this.props;
    const { stadiums } = this.props.stadiums;

    return (
      <div>
        <Link
          className={classes.button_link}
          to={{
            pathname: "/stadiums/add",
            state: stadiums !== null ? { apiKey: stadiums.apiKey } : ""
          }}
          // params={}
        >
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="stadiums.add" />
          </Button>
        </Link>
        {/* <List>
          {this.state.seasonsList !== null
            ? this.state.seasonsList.map(season => (
                <Link
                  className={classes.button_link}
                  to={`/subtournaments/${season.seaid}`}
                  key={season.seaid}
                >
                  <MenuItem className={classes.listItem} value={season.seaid}>
                    {season.title}
                  </MenuItem>
                </Link>
              ))
            : ""}
        </List> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages,
  stadiums: state.stadiums
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getStadium }
  )
)(Stadiums);
