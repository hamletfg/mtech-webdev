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
});
