var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Random = require('random-js');
var engine = Random.engines.mt19937().autoSeed();

var serverport = 45567

app.use('/images', express.static(__dirname + '/images'));

DICE = {
    ABILITY: {
        BLANK: "blank.png",
        A:     "a.png",
        AA:    "aa.png",
        S:     "s.png",
        SA:    "sa.png",
        SS:    "ss.png"
    }
}

function rollDie(dieSpec) {
    // all side types for the key
    var obj_keys = Object.keys(dieSpec);
    // random number
    var roll = Random.die(6)(engine);
    // random side
    var result = obj_keys[roll];
    // return image for selected side
    return dieSpec[result]
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      io.emit('dice roll', 'images/dice/ability/'+rollDie(DICE.ABILITY));
  });
});

http.listen(serverport, function(){
  console.log('listening on *:'+serverport);
});
