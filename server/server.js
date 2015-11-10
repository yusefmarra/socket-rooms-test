#!/usr/bin/env node

var app = require('./app');




app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

// add socket stuff here!

var io = require('socket.io')(server);

var rooms = [];

io.on('connection', function(socket) {
    socket.on('setName', function(name) {
        socket.name = name;
        console.log(socket.name);
    });
    socket.on('createRoom', function(name, invitee) {
        socket.room = name;
        rooms.push(name);
        socket.join(name);

        for (a in io.sockets.connected) {
            if (io.sockets.connected[a].name === invitee) {
                io.sockets.connected[a].emit('privateChat', '<a onclick="socket.emit(\'joinRoom\', \''+name+'\')">Join '+ socket.name +'\'s private chat</a>' );
                break;
            }
        }
    });
    socket.on('joinRoom', function(name) {
        socket.room = name;
        socket.join(name);
    });
    socket.on('chat message', function(msg) {
        // console.log(socket.room);
        io.sockets.in(socket.room).emit('chat message', msg);
    });

    // socket.on('privateChat', function(arr) {
    //     var name = arr[0];
    //     var id = arr[1];
    //     socket.join(name);
    //     socket.room = name;
    //     // io.sockets.connected[socket.id].join(arr[0]);
    //     // console.log(io.sockets.connected[arr[1]])
    //     io.sockets.connected[id].join(name);
    //     io.sockets.connected[id].room = name
    //
    //     io.sockets['in'](name).emit('private', "testing private room");
    //     // for (a in io.sockets.connected) {
    //     //     if (io.sockets.connected[a].name === name) {
    //     //         io.sockets.connected[a].emit('privateChat', 'Join my private chat @ ' + random)
    //     //     }
    //     // }
    //     // app.get('/'+random, function(req, res) {
    //     //     res.json({
    //     //         msg: "Hey"
    //     //     });
    //     // });
    // });
});


counter = 0;
function random(){
    return counter++;
}
