import net from 'net';

// Define the port we want to listen on
const PORT = 3000;

// Collection to store connected client sockets
const clients = new Map(); // Use a Map to store clients (Key: clientId, Value: socket)
let clientIdCounter = 0; // Counter generate unique IDs

// Create the TCP server
const server = net.createServer((socket) => {
  // Assign a unique ID to the newly connected client
  clientIdCounter++;
  const clientId = `Client-${clientIdCounter}`;
  console.log('👋 Client connected!');

  // Handle client disconnection
  socket.on('end', () => {
    console.log('🔌 Client disconnected.');
  });

  // Handle errors on the connection
  socket.on('error', (err) => {
    console.error('Socket Error', err.message);
  });
});

// Start listening for connections
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server Error:', err.message);
});
