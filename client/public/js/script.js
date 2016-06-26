var socket = io('http://localhost:3000');

socket.on('message', function (data) {
    $("#messages").append('<li>' + data.sender + ': ' + data.message + '</li>')
});

$('button').on('click', function () {
    socket.emit('message', { message: $('#m').val() });
});