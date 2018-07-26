import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";


class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onSubmitHandler = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user, this.props.history);
  }

  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <h1>Войти</h1>
        <p>Войти в свой аккаунт</p>
        <form onSubmit={this.onSubmitHandler}>
          <input 
            type="email" 
            name="email" 
            placeholder="Ваш email" 
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <input 
            type="password" 
            name="password"  
            placeholder="Ваш пароль" 
            value={this.state.password} 
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="Войти"/>
        </form>

        <Link to='/register'>Создать свой аккаунт</Link>
      </div>
    )
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