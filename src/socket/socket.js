const { Server } = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { userdetail, authdetail} = require('../api/authentication');

const socketServer = http.createServer();
const io = new Server(socketServer, {
  cors: { origin: "*" } // optional, useful if frontend is separate
});

// ====== SOCKET AUTH MIDDLEWARE ======
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token provided"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded.userId;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

io.on('connection', async (socket) => {
  console.log('Socket connected:', socket.id);
  try {
    let user = await User.findOne({where:{
        id : socket.user
    }})

    if(!user){
        return res.status(400).json({message: userdetail.USER_NOTEXISTS});
    }

    socket.data.username = user.name;

          // Send a confirmation event back to the client with their username
      socket.emit('connected', { username: socket.data.username });


  } catch (error) {
    console.log("error while fetching username", error)
  }
  
  
  socket.on('chat', (msg) => {
      console.log('Message received:', msg);
      let formattedmsg = `${socket.data.username}: ${msg}`;
      socket.broadcast.emit('chat',formattedmsg);  
  });

  socket.on('disconnect',() =>{
        io.emit('chat', `${socket.data.username} has left the chat.`);
  })
});


socketServer.listen(4000, () => {
  console.log('🎧 Socket.IO server running on http://localhost:4000');
});