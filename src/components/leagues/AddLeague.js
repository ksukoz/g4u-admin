import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeague } from '../../actions/leagueActions';

class AddLeague extends Component {
  state = {
    name: ''
  }

  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const newLeague = {
      name: this.state.name
    }

    this.props.addLeague(newLeague);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="text"  name="name" placeholder="Название лиги" value={this.state.name} onChange={this.onChangeHandler} />
          <button type="submit">Сохранить</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { addLeague }
)(AddLeague);