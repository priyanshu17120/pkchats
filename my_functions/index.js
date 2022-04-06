
const port = process.env.PORT||3000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/index.js');
});

let users = {};
app.get('/onlineusers', (req, res) => {
  res.json(Object.keys(users).length)
  // console.log(users);
});


io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("New user", name);
    // socket.emit('user-added',users);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

// httpServer.listen(process.env.PORT||3000);
server.listen(port, () => {
  console.log('listening on : http://localhost:3000');
});