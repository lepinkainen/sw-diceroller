"use strict";

var socket = io();

console.log(DICE)

$('form').submit(function(){
    // emit a message of type "chat message" to the server
    console.log($('#m').val());
    var user = $('#user').val()
    var message = $('#m').val()
    var msg = user;
    if(message != "") {
        msg += ': '+message
    }
    socket.emit('chat message', msg);
    // clear input
    $('#m').val('');
    // don't actually post the form
    return false;
});

// message received
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});

// message received
socket.on('dice roll', function(msg){
    $('#messages').append($('<img src="'+msg+'" />'));
});
