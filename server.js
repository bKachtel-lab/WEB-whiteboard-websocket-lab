import http from 'http';
import { WebSocketServer } from 'ws';

const port = 1234;
const host = '0.0.0.0';

// Create a new HTTP server to deal with low-level connection details (TCP connections, sockets, HTTP handshakes, etc.)
const server = http.createServer();

// Create a WebSocket Server on top of the HTTP server to deal with the WebSocket protocol
const wss = new WebSocketServer({
  server: server
});

// create a function to be able do broadcast messages to all WebSocket connected clients
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};


// Register a listener for new connections on the WebSocket
wss.on('connection', function(client, request) {

  // Retrieve the name in the cookies
  const cookies = request.headers.cookie ? request.headers.cookie.split(';') : [];
  let wsname = cookies.find((c) => c.match(/^\s*wsname/));
  
  if (wsname) {
    wsname = wsname.split('=')[1];
    console.log("First connection from", wsname);

    // Greet the newly connected user
    client.send('Welcome, ' + decodeURIComponent(wsname) + '!');

    // Register a listener on each message of each connection
    client.on('message', function(message) {
      const cli = '[' + decodeURIComponent(wsname) + '] ';
      console.log("Message from", cli);
      
      // When receiving a message, broadcast it to all the connected clients
      wss.broadcast(cli + message);
    });
  }
});

// HTTP server starts listening on the given host and port
server.listen(port, host, function() {
  console.log('Listening on ' + server.address().address + ':' + server.address().port);
});

process.on('SIGINT', function() {
  process.exit(0);
});
