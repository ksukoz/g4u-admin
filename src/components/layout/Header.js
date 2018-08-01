import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <ul class="navigation">
          <li>
            <Link to="/franchise/add">Добавить франшизу</Link>
          </li>
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

export default Header;
