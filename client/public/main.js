// custom scripts

var socket = io();

$('#chatForm').hide();

$('#socketform').submit(function() {
  socket.emit('setName',$('#m').val());
  $('#m').val('');
  $('#socketform').hide();
  return false;
})

$('#privateForm').submit(function() {
    socket.emit('createRoom', $('#p').val(), $('#r').val());
    $('#p').val('');
    $('#r').val('');
    $('#chatForm').show();
    $('#privateForm').hide();
    return false;
});

$('#chatForm').submit(function() {
    socket.emit('chat message', $('#t').val());
    $('#t').val('');
    return false;
})

socket.on('privateChat', function(msg) {
    $('#message').append($('<li>').html(msg));
});

socket.on('private', function(msg) {
    console.log(msg);
})

socket.on('chat message', function(msg) {
  $('#message').append($('<li>').text(msg));
});
