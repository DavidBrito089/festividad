$(function () {
    const socket = io();
    let username = '';
    let userColor = '';
    let userCount = 0;

    $('#join-form').submit(function (e) {
        e.preventDefault();
        username = $('#username').val();
        userColor = $('#color').val();
        $('#join-form').hide();
        $('#chat-container').show();
        socket.emit('join', { username, userColor });
    });

    $('form').submit(function () {
        socket.emit('chat message', { username, message: $('#m').val(), userColor });
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function (data) {
        $('#messages').append($('<li>').html(`<span style="color:${data.userColor};">${data.username}:</span> ${data.message}`));
    });

    socket.on('user joined', function (data) {
        userCount++;
        updateUsersCount();
        $('#messages').append($('<li>').html(`<span style="color:${data.userColor};">${data.username} se unió al chat.</span>`));
    });

    socket.on('user left', function (data) {
        userCount--;
        updateUsersCount();
        $('#messages').append($('<li>').html(`<span style="color:${data.userColor};">${data.username} se desconectó.</span>`));
    });

    socket.on('update user count', function (count) {
        userCount = count;
        updateUsersCount();
    });

    function updateUsersCount() {
        $('#user-count').text(`Usuarios conectados: ${userCount}`);
    }
});
