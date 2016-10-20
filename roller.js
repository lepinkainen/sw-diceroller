var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Random = require('random-js');
var engine = Random.engines.mt19937().autoSeed();
var data = require('./dice.js');

var serverport = 8080

app.use('/images', express.static(__dirname + '/images'));


function rollDie(dieSpec) {
    // all side types for the key
    var obj_keys = Object.keys(dieSpec);
    console.log('sides:  '+obj_keys)
    // random number
    var roll = Random.die(obj_keys.length)(engine);
    console.log('roll:   '+roll)
    // random side
    var result = obj_keys[roll-1];
    console.log('result: '+result)
    // return image for selected side
    return dieSpec[result]
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // incoming chat message
    socket.on('chat message', function(msg){
        // distribute message to everyone
        io.emit('chat message', msg);
        // dice rolls
        io.emit('dice roll', 'images/dice/ability/'+rollDie(data.DICE.ABILITY));
        io.emit('dice roll', 'images/dice/boost/'+rollDie(data.DICE.BOOST));
        io.emit('dice roll', 'images/dice/challenge/'+rollDie(data.DICE.CHALLENGE));
        io.emit('dice roll', 'images/dice/difficulty/'+rollDie(data.DICE.DIFFICULTY));
        io.emit('dice roll', 'images/dice/force/'+rollDie(data.DICE.FORCE));
        io.emit('dice roll', 'images/dice/proficiency/'+rollDie(data.DICE.PROFICIENCY));
        io.emit('dice roll', 'images/dice/setback/'+rollDie(data.DICE.SETBACK));
    });
});

// listen on all available interfaces, let the OS decide the port
http.listen(serverport, function(){
    console.log('listening on *:'+http.address().port);
});
