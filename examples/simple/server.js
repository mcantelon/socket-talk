var http = require('http')
  , socketio = require('socket.io')
  , fs = require('fs');

fs.readFile('./index.html', function(err, fileData) {
  var server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(fileData);
  });

  server.listen(3000);

  var io = socketio.listen(server);

  io.on('connection', function(socket) {
    var tick = 0;
    setInterval(function() {
      tick++;
      socket.emit('tickEvent', {'tick': tick});
    }, 1000);
    socket.on('tickReceivedEvent', function(tickData) {
      console.log('Socket %s got %d', socket.id, tickData.tick);
    });
  });
});
