``// ToDo: Make a dictionary of random texts to type and have the user attempt to Type
// measure accuracy


// add a communal start button, that starts a new game when 5+ users press it

import React from 'react';
let socket = io.connect();

let App = React.createClass({
  getInitialState() {
    return {
      users: [],
      name: '',
      value: '',
      userValues: {},
      dash: ''
    }
  },

  componentDidMount() {
    console.log('chatApp connected');
    socket.on('init', this._initialize);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
    socket.on('change:global_text', this._globalTextChanged);
    socket.on('change:guest_text', this._guestTextChanged);

    this.startDash();
  },

  _initialize(data) {
    let {users, name} = data;
    this.setState({users, name});
  },

  _userJoined(data) {
    // data is inherited from the emitted object in routes/socket.js
    this.setState({users: data.users});
  },

  _userLeft(data) {
    this.setState({users: data.users});
  },

  _globalTextChanged(data) {
    this.setState({value: data.value})
  },

  _guestTextChanged(data) {
    console.log('data', data);
    let {userValues} = this.state;
    let {value, accuracy} = data;
    userValues[data.name] = {
      value,
      accuracy
    };
    this.setState({userValues});
  },


  accuracy(str_1, str_2) {
    // compare str_1 and str_2 and return a number based on letter to letter accuracy
    let accuracy = 100;

    let sub_num = 100/str_1.length;

    for (let i=0; i<str_1.length; i++) {
      if (str_1[i] !== str_2[i]) {
        accuracy -= sub_num;
      }
    }

    return accuracy;
  },


  startDash() {
    // pick a random dash for as the global dash from the tests.json file
    let dashes_json = require('./tests.json');
    // uncomment necessary lines to pick a random dash
    let dashes = Object.keys(dashes_json);
    // let dash_index = Math.floor(Math.random()*dashes.length);
    let dash_key = dashes[0];
    let dash = dashes_json[dash_key];
    console.log('dash', dash);
    this.setState({dash});
  },

  renderUserList(users) {
    return (
      users.map(user => {
        let {value, accuracy} = '';
        let userValues = this.state.userValues[user];
        if (userValues) {
          console.log('userValues', userValues);
          value = userValues.value;
          accuracy = userValues.accuracy;
          console.log('value', value);
          console.log('accuracy', accuracy);
        }
        return (
          <li>
            <div>
              {user}
            </div>
            <div>
              Text: {value}
            </div>
            <div>
              Accuracy: {accuracy}
            </div>
          </li>
        )
      })
    )
  },

  handleChange(event) {
    let value = event.target.value;
    let accuracy = this.accuracy(value, this.state.dash);

    this.setState({value});
    // pass accuracy to object to render each user's accuracy
    let {name} = this.state;
    console.log('handling change', name, 'typing', value, 'accuracy', accuracy);
    socket.emit('change:guest_text', {
      value,
      accuracy,
      name,
    })
  },

  render() {
    return (
      <div>
        <div>
          Type Dash
        </div>
        <div>
          Users:
        </div>
        <ul>
          {this.renderUserList(this.state.users)}
        </ul>
        <div>
          DASH: {this.state.dash}
        </div>
        <div>
          User: {this.state.name}
        </div>
        <div>
          Text: {this.state.value}
        </div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
})


React.render(<App />, document.getElementById('app'));
