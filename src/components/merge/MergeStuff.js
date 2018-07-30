import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStuffMembersByName } from '../../actions/stuffActions';

class MergeStuff extends Component {
  state = {
    name: ''
  }

  onChange = e => {  
    if (e.target.value.length >= 3) {
      this.props.getStuffMembersByName(e.target.value);

    }  

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })

  }

  render() {
    const { members } = this.props.stuff;
    let memberList;
    if (members !== null) {
      memberList = members.map(member => (
        <li key={member.id}><img src={member.photo} style={{width: '50px'}} alt=""/>{`${member.surename} ${member.name} ${member.patronymic}`}<span>{member.type}</span></li>
      ))
    }
    
    return (
      <div style={{
        backgroundImage: 'linear-gradient(to top, (13, 47, 4, 1), (13, 47, 4, 0))'
      }}>
        <div>
          <input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder="Минимум 3 буквы"/>
          <div>
            <ul>
              {memberList}
            </ul>
          </div>
        </div>
        <div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stuff: state.stuff
});

export default connect(
  mapStateToProps,
  { getStuffMembersByName }
)(MergeStuff);