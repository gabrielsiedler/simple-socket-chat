var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const shortid = require('shortid');

var users = [];

var botId = shortid.generate();

users[botId] = {
    id: botId,
    nick: '@SocketIRC_Bot'
};

function getCurrentUserList () {
    var userNicks = [];
    for (user in users) {
        console.log(user);
        userNicks.push(users[user].nick);
    }

    return userNicks;
}

var userCount = 1;
io.on('connection', function (socket) {
    var player = {
        id: shortid.generate(),
        nick: 'Guest' + userCount++
    }

    users[player.id] = player;

    socket.broadcast.emit('userConnected', player.nick);
    console.log(player.nick + ' connected');

    socket.emit('receiveList', { users: getCurrentUserList() });

    var connectMessages = [
        '* Welcome to socketIRC.',
        '* Your nick is ' + player.nick + '. To change it type /nick [new nick]',
        '* type /help for more instructions.'
    ];

    socket.emit('adminMessage', connectMessages);

    socket.on('message', function (data) {
        var message = {
            sender: player.nick,
            message: data.message
        }
        io.sockets.emit('message', message);
    });

    socket.on('disconnect', function () {
        delete users[player.id];
        socket.broadcast.emit('userDisconnected', player.nick);
        console.log(player.nick + ' disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
