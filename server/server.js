const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {User} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/messages');
const {isRealString} = require('./utils/valid');
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new User();

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user joined');


  socket.on('createMessage', (newMessage, callback) => {
    const user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }
    callback('This is from the sever');
  })
 socket.on('join', (params, callback) => {
  if(!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and room name are requireed');
  }
  socket.join(params.room);
  users.removeUser(socket.id);
  users.addUser(socket.id, params.name, params.room);

  io.to(params.room).emit('updateUserList', users.getUserList(params.room));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome'))
  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
  callback();
 })

 socket.on('createLocationMessage', (coords) => {
   const user = users.getUser(socket.id);
   if(user) {
     io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude))
   }
 })

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});



server.listen(port, () => {
  console.log('started on port ' + port)
});

module.exports = {app};
