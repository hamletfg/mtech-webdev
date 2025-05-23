import net from 'net';
import fs from 'fs/promises';
import path from 'path';

// Define the port we want to listen on
const PORT = 3000;
const LOG_FILE = path.join(process.cwd(), 'server.log'); // Define log file path

// Collection to store connected client sockets
const clients = new Map(); // Use a Map to store clients (Key: clientId, Value: socket)
let clientIdCounter = 0; // Counter generate unique IDs

// Function to log messages
async function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message}\n`;
  try {
    await fs.appendFile(LOG_FILE, logEntry); // Append to the log file
  } catch (err) {
    console.error('Error writing to the log file:', err);
  }
}

// Function to broadcast messages
function broadcast(message, senderSocket) {
  if (clients.size === 0) {
    console.log('No clients connected to broadcast to.');
    return; // No clients to broadcast to
  }
  console.log(`Broadcasting: ${message}`); // Log broadcasting action
  for (const [clientId, targetSocket] of clients.entries()) {
    // Don't send the message back to the original sender (if specified)
    if (targetSocket !== senderSocket) {
      targetSocket.write(message);
    }
  }
}

// Create the TCP server
const server = net.createServer(async (socket) => {
  // Assign a unique ID to the newly connected client
  clientIdCounter++;
  const clientId = `Client-${clientIdCounter}`;
  console.log('👋 Client connected!');

  // Store the client
  clients.set(clientId, socket);
  socket.clientId = clientId; // Attach the ID to the socket for easy reference

  // Log the connection
  await logMessage(
    `${clientId} connected from ${socket.remoteAddress}:${socket.remotePort}`
  );

  // Send a welcome message to the newly connect client
  socket.write(`Welcome to the server, ${clientId}! 🎉\n`);

  // Notify ALL OTHER clients that a new user joined
  const joinMessage = `🟢 ${clientId} has joined the chat.\n`;
  broadcast(joinMessage, socket); // Pass the new socket so it doesn't get the message

  // --- Handling data from clients will go here next ---
  // socket.on('data', async (data) => {...});

  // Handle client disconnection
  socket.on('end', async () => {
    const disconnectMsg = '🔌 Client disconnected.';
    console.log(disconnectMsg);
    await logMessage(disconnectMsg); // Log disconnection
    clients.delete(socket.clientId); // Remove client on disconnect
    // Notify remaining clients
    broadcast(`🔴 ${socket.clientId} has left the chat.\n`, null);
  });

  // Handle errors on the connection
  socket.on('error', async (err) => {
    const errorMsg = `Socket Error from ${
      socket.clientId || 'Unknown Client'
    }: ${err.message}`;
    console.error(errorMsg);
    await logMessage(`ERROR: ${errorMsg}`); // Log the error
    if (socket.clientId) {
      // Notify remaining clients about the drop potentially
      broadcast(
        `⚠️ ${socket.clientId} connection dropped due to error.\n`,
        socket
      );
      clients.delete(socket.clientId); // Remove client
    }
    // socket.destroy();
  });
});

// Start listening for connections
server.listen(PORT, async () => {
  // Make async for initial log
  const startMsg = `🚀 Server listening on port ${PORT}`;
  console.log(startMsg);
  await logMessage('--- Server Started ---');
  await logmessage(startMsg);
});

server.on('error', async (err) => {
  const errorMsg = `Server Error: ${err.message}`;
  console.error(errorMsg);
  await logMessage(`FATAL SERVER ERROR: ${errorMsg}`);
});
