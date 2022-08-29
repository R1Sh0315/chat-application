//module socket.io and will run at 8080
// const io = require("socket.io")(8000);
const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const users = {};
io.on("connection", socket => {
  socket.on('new-user-name', userName => {
    users[socket.id] = userName; 
    socket.broadcast.emit('user-join', userName);
  });

  socket.on("send", (msg) => {
    socket.broadcast.emit('res', { msg: msg, userName: users[socket.id] });
  });

  socket.on("disconnect", msg=>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  })
  
});

io.listen(8000);
