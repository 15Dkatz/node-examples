import React from 'react';
let socket = io.connect();

let App = React.createClass({
  getInitialState() {
    return {
      users: [],
      name: '',
      value: '',
      userValues: {}
    }
  },

  componentDidMount() {
    console.log('chatApp connected');
    socket.on('init', this._initialize);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
    socket.on('change:global_text', this._globalTextChanged);
    socket.on('change:guest_text', this._guestTextChanged);
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
    userValues[data.name] = data.value;
    this.setState({userValues});
  },

  renderUserList(users) {
    return (
      users.map(user => {
        let value = this.state.userValues[user];
        return (
          <li>
            <div>
              {user}
            </div>
            <div>
              Text: {value}
            </div>
          </li>
        )
      })
    )
  },

  handleChange(event) {
    let value = event.target.value;
    this.setState({value});

    let {name} = this.state;
    console.log('handling change', name, 'typing', value);
    socket.emit('change:guest_text', {
      value,
      name
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

// getInitialState: function() {
//   return {value: 'Hello!'};
// },
// handleChange: function(event) {
//   this.setState({value: event.target.value});
// },
// render: function() {
//   return (
//     <input
//       type="text"
//       value={this.state.value}
//       onChange={this.handleChange}
//     />
//   );
// }

React.render(<App />, document.getElementById('app'));
