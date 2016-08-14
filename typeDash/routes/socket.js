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
  let name = userNames.getName();

  socket.emit('init', {
    users: userNames.getUsers(),
    name
  });

  socket.broadcast.emit('user:join', {
    name
  });


  socket.on('disconnect', () => {
    socket.broadcast.emit('user:left', {
      name
    })
  })
}
