var socket = io('http://localhost:3000');

socket.on('message', function (data) {
    $(".message-box").append('<p>' + data.sender + ': ' + data.message + '</p>')
});

socket.on('adminMessage', function (data) {
    data.forEach(function (message) {
        $(".message-box").append('<p class="admin">' + message + '</p>')
    });
})

socket.on('receiveList', function (data) {
    console.log('data', data);
    data.users.forEach(function (user) {
        $('.users-box ul').append('<li>' + user + '</li>');
    })
});

socket.on('userConnected', function (data) {
    $(".message-box").append('<p class="admin">* ' + data + ' joined.</p>')
    $('.users-box ul').append('<li>' + data + '</li>');
});

socket.on('userDisconnected', function (data) {
    $(".message-box").append('<p class="admin">* ' + data + ' left.</p>')
    $('.users-box ul li:contains("' + data + '")').remove();
});


socket.on('disconnect', function () {
    var message = '* You have ben disconnected.';
    $(".message-box").append('<p class="system">' + message + '</p>')
})

function sendMessage () {
    socket.emit('message', { message: $('footer input').val() });
    $('footer input').val('');
}