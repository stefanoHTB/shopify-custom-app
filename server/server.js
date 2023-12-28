const cors = require("cors")
const express = require('express');
const http = require('http');
const WebSocket = require('ws');



const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


var corsOptions = {
  origin: ["http://127.0.0.1:9292", "http://localhost:9292"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());


app.post('/api/messages', (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  console.log('Received message:', message);

  res.json({ success: true, message: 'Message received successfully' });
});

wss.on('connection', (ws) => {
  console.log('A new client connected');

  // Handle messages from clients
  wss.on('message', (message) => {
    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });

  // Handle client disconnection
  wss.on('close', () => {
    console.log('A client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
