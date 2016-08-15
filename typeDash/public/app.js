'use strict';

import React from 'react';
const socket = io.connect();

module.exports = React.createClass({
  getInitialState() {
    return {
      users: [],
      name: ''
    }
  },

  componentDidMount() {
    console.log('chatApp connected');
    socket.on('init', this._initialize);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
  },

  _initialize(data) {
    let {users, name} = data;
    this.setState({users, name});
  },

  _userJoined(data) {
    // data is inherited from the emitted object in routes/socket.js
    console.log('user joined');
    this.setState({users: data.users});
    console.log('users', data.users);
  },

  _userLeft(data) {
    console.log('user left');
    this.setState({users: data.users});
    console.log('users', data.users);
  },

  renderUserList(users) {
    return (
      users.map(user => {
        console.log('user in renderUserList', user);
        return (
          <li>
            {user}
          </li>
        )
      })
    )
  },

  render() {
    return (
      <div>
        <div>
          Type Dash
        </div>
        <ul>
          {this.renderUserList(this.state.users)}
        </ul>
      </div>
    )
  }
})
