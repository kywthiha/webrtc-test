const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Serve static files
app.use(express.static(__dirname + '/public'));

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle incoming call requests
  socket.on('call', (data) => {
    console.log('call request received', data);

    // Send call request to target user
    socket.to(data.targetId).emit('incomingCall', { callerId: data.callerId });
  });

  // Handle call acceptance
  socket.on('acceptCall', (data) => {
    console.log('call accepted', data);

    // Send call acceptance to caller
    socket.to(data.callerId).emit('callAccepted', { targetId: socket.id });
  });

  // Handle call rejection
  socket.on('rejectCall', (data) => {
    console.log('call rejected', data);

    // Send call rejection to caller
    socket.to(data.callerId).emit('callRejected', { targetId: socket.id });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
