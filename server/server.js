var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('message', function (data) {
    var message = {
      sender: 'someone',
      message: data.message
    }
      io.sockets.emit('message', message);
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
