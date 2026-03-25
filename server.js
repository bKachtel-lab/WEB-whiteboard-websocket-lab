import http from 'http';
import { stringify } from 'querystring';
import { WebSocketServer } from 'ws';

const port = 1235;
const host = '0.0.0.0';

//Tableau contenant tout l'historique des dessins
const history = [];
// Ensemble pour garder la liste de tous les clients connectés
const clients = new Set();

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
  //Ajouter ce client à la liste
  clients.add(client);

  //Envoyer l'historique au nouveau client
  history.forEach(item => client.send(JSON.stringify(item)));

  //Écouter les messages de ce client
  client.on('message', (message) => {
    const data = JSON.parse(message.toString());

    if(data.type === 'draw'){
      //Sauvegarder dans l'historique
      history.push(data);

      //Broadcast à tous les clients
      clients.forEach(c => {
        if(c.readyState === 1) c.send(JSON.stringify(data));
      });
    }
  });

   // Supprimer le client lorsqu'il se déconnecte
  client.on('close', () => clients.delete(client));
  
});

// HTTP server starts listening on the given host and port
server.listen(port, host, function() {
  console.log('Listening on ' + server.address().address + ':' + server.address().port);
});

process.on('SIGINT', function() {
  process.exit(0);
});
