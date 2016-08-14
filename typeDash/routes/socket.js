let userNames = () => {
  let names = [];

  // see if you can make these methods es6 arrow functions
  let claimable = function(name) {
    // indexOf will return -1 for arrays without the value
    if (names.indexOf(name)<0) {
      return false
    }
    return true;
  }

  let getName = function() {
    let name = '';
    let nextUserId = 1;

    do {
      name = `Guest${nextUserId}`;
      nextUserId += 1;
    } while (claimable(name));

    names.push(name);

    return name;
  }

  let getUsers = function() {
    return names;
  }
}

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
