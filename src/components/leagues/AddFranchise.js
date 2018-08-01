import React, { Component } from "react";
import { addFranchise } from "../../actions/leagueActions";
import { connect } from "react-redux";

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
          <input
            type="text"
            name="name"
            placeholder="Название"
            value={this.state.name}
            onChange={this.onChangeHandler}
          />
          <input
            type="text"
            name="login"
            placeholder="Логин администратора"
            value={this.state.login}
            onChange={this.onChangeHandler}
          />
          <input
            type="email"
            name="email"
            placeholder="Email администратора"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="Войти" />
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
