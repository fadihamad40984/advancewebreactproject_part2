import { WebSocketServer } from 'ws'; 

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('A new client connected.');

  ws.send(JSON.stringify({ message: 'Welcome to the chat!' }));

  ws.on('message', (message) => {
    console.log('Received message:', message);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });

  ws.on('error', (error) => {
    console.error('Error:', error);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
