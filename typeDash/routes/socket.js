let userNames = {
  names: [],

  // see if you can make these methods es6 arrow functions
  claimable: function(name) {
    // indexOf will return -1 for arrays without the value
    if (this.names.indexOf(name)<0) {
      return false
    }
    return true;
  },

  delete: function(name) {
    this.names.splice(this.names.indexOf(name), 1);
  },

  getName: function() {
    let name = '';
    let nextUserId = 1;

    do {
      name = `Guest${nextUserId}`;
      nextUserId += 1;
    } while (this.claimable(name));

    this.names.push(name);

    return name;
  },

  getUsers: function() {
    return this.names;
  }
};

module.exports = socket => {
  // when each user gets a name,
  // that name is also added to the list of users
  let name = userNames.getName();

  socket.emit('init', {
    users: userNames.getUsers(),
    name
  });

  // broadcast notifies all clients
  socket.broadcast.emit('user:join', {
    users: userNames.getUsers()
  });


  socket.on('disconnect', () => {
    // removes the user from the global list
    userNames.delete(name);
    socket.broadcast.emit('user:left', {
      users: userNames.getUsers()
    })
  })
}
