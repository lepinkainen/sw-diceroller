var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Random = require('random-js');
var engine = Random.engines.mt19937().autoSeed();

var serverport = 35567

app.use('/images', express.static(__dirname + '/images'));

DICE = {
    ABILITY: {
        BLANK: 'blank.png',
        A:     'a.png',
        AA:    'aa.png',
        S:     's.png',
        SA:    'sa.png',
        SS:    'ss.png'
    },
    BOOST: {
        BLANK:  'blank.png',
        BLANK2: 'blank.png',
        A:      'a.png',
        AA:     'aa.png',
        S:      's.png',
        SA:     'sa.png'
    },
    CHALLENGE: {
        BLANK:   'blank.png',
        F:       'f.png',
        F2:      'f.png',
        FF:      'ff.png',
        FF2:     'ff.png',
        FT:      'ft.png',
        FT2:     'ft.png',
        T:       't.png',
        T2:      't.png',
        TT:      'tt.png',
        TT2:     'tt.png',
        DESPAIR: 'despair.png'
    },
    DIFFICULTY: {
        BLANK: 'blank.png',
        F:     'f.png',
        FF:    'ff.png',
        FT:    'ft.png',
        T:     't.png',
        T2:    't.png',
        T3:    't.png',
        TT:    'tt.png'
    },
    FORCE: {
        D:   'd.png',
        D2:  'd.png',
        D3:  'd.png',
        D4:  'd.png',
        D5:  'd.png',
        D6:  'd.png',
        DD:  'dd.png',
        L:   'l.png',
        L2:  'l.png',
        LL:  'll.png',
        LL2: 'll.png',
        LL3: 'll.png'
    },
    PROFICIENCY: {
        BLANK:   'blank.png',
        S:       's.png',
        S2:      's.png',
        SA:      'sa.png',
        SA2:     'sa.png',
        SA3:     'sa.png',
        SS:      'ss.png',
        SS2:     'ss.png',
        A:       'a.png',
        AA:      'aa.png',
        AA2:     'aa.png',
        TRIUMPH: 'triumph.png'
    },
    SETBACK: {
        BLANK:  'blank.png',
        BLANK2: 'blank.png',
        F:      'f.png',
        F2:     'f.png',
        T:      't.png',
        T2:     't.png',
    },
}

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
  socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      io.emit('dice roll', 'images/dice/ability/'+rollDie(DICE.ABILITY));
      io.emit('dice roll', 'images/dice/boost/'+rollDie(DICE.BOOST));
      io.emit('dice roll', 'images/dice/challenge/'+rollDie(DICE.CHALLENGE));
      io.emit('dice roll', 'images/dice/difficulty/'+rollDie(DICE.DIFFICULTY));
      io.emit('dice roll', 'images/dice/force/'+rollDie(DICE.FORCE));
      io.emit('dice roll', 'images/dice/proficiency/'+rollDie(DICE.PROFICIENCY));
      io.emit('dice roll', 'images/dice/setback/'+rollDie(DICE.SETBACK));
  });
});

http.listen(serverport, function(){
  console.log('listening on *:'+serverport);
});
