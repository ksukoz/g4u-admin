import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeague } from '../../actions/leagueActions';

class AddLeague extends Component {
  state = {
    name: '',
    status: false
  }

  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  toggleChange = () => {
    this.setState({status: !this.state.status})
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const newLeague = {
      name: this.state.name,
      status: this.state.status
    }

    this.props.addLeague(newLeague);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="text"  name="name" placeholder="Название лиги" value={this.state.name} onChange={this.onChangeHandler} />
          <input type="checkbox" name="status" checked={this.state.status}onChange={this.toggleChange} />
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