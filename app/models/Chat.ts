const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });




ws.on('connection', (ws: any) => {
  console.log('A new client connected');

  // Handle messages from clients
  ws.on('message', (message: any) => {
    // Broadcast the message to all clients
    ws.clients.forEach((client: any) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});