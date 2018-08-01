import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user, this.props.history);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="auth__wrap">
        <div className="auth">
          <div className="auth__text">
            <h1>Войти</h1>
            <p>Войти в свой аккаунт</p>
          </div>
          <form className="auth__form" onSubmit={this.onSubmitHandler}>
            <TextField
              label="Ваш email"
              name="email"
              type="email"
              className="text-field text-field--large"
              value={this.state.email}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label="Ваш пароль"
              name="password"
              type="password"
              className="text-field text-field--large"
              value={this.state.password}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            {/* <input
              type="password"
              name="password"
              placeholder="Ваш пароль"
              value={this.state.password}
              onChange={this.onChangeHandler}
            /> */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className="btn"
            >
              Войти
            </Button>
            {/* <input type="submit" value="Войти" /> */}
          </form>

          <Link className="auth__link" to="/register">
            Создать свой аккаунт
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
