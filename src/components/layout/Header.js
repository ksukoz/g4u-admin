import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { type } = this.props.auth;

    const globalAdminLink = (
      <li>
        <Link to="/franchise/add">Добавить франшизу</Link>
      </li>
    );

    return (
      <div>
        <ul class="navigation">
          {type == 0 ? globalAdminLink : ""}
          <li>
            <select name="" id="">
              <option value="" disabled selected>
                Выберите лигу
              </option>
            </select>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Header);