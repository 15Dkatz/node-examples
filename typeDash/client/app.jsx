'use strict';

import React from 'react';
let socket = io.connect();

let App = React.createClass({
  componentDidMount() {
    console.log('chatApp connected');
    socket.on('init', this._initialize);
  },

  _initialize(data) {
    let {users, name} = data;
    console.log('Should set the following to state:');
    console.log('users', users);
    console.log('name', name);
  },

  render() {
    return (
      <div>
        Type Dash
      </div>
    )
  }
})

React.render(<App />, document.getElementById('app'));
