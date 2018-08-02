import React, { Component } from "react";
import { addFranchise } from "../../actions/leagueActions";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddFranchise extends Component {
  state = {
    name: "",
    login: "",
    email: "",
    password: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newFranchise = {
      name: this.state.name,
      login: this.state.login,
      email: this.state.email,
      password: this.state.password
    };

    this.props.addFranchise(newFranchise);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <TextField
            label="Название"
            name="name"
            className="text-field"
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Логин администратора"
            name="login"
            className="text-field"
            value={this.state.login}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Email администратора"
            name="email"
            type="email"
            className="text-field"
            value={this.state.email}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Пароль администратора"
            name="password"
            type="password"
            className="text-field"
            value={this.state.password}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="btn"
          >
            Сохранить
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addFranchise }
)(AddFranchise);
