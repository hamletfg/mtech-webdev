import net from 'net';

// Define the port we want to listen on
const PORT = 3000;

// Create the TCP server
const server = net.createServer((socket) => {
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
  console.log('🚀 Server listening on port ${PORT}');
});

server.on('error', (err) => {
  console.error('Server Error:', err.message);
});
