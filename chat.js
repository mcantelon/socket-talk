var net = require('net')
  , clients = {};

var server = net.createServer(function(conn) {
  var id = conn.remoteAddress + ':' + conn.remotePort;
  conn.on('connect', function() {
    clients[id] = conn;
  });
  conn.on('data', function(data) {
    broadcast(id, data);
  });
  conn.on('end', function(data) {
    delete clients[id];
  });
});

server.listen(3000);

function broadcast(fromId, message) {
  // if a message, not a control key, have been sent, broadcast it
  if (message.toString().slice(-1) == "\n") {
    // send to each client except sender
    for(var id in clients) {
      if (fromId != id) {
        clients[id].write(id + '> ' + message);
      }
    }
  }
}
