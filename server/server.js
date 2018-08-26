const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/messages')
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user joined');

 socket.emit('newMessage', generateMessage('Admin', 'Welcome'))
 socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  socket.on('createMessage', (newMessage, callback) => {
    const { from, text } = newMessage;
    io.emit('newMessage', generateMessage(from, text));
    callback('This is from the sever');
    // socket.broadcast.emit('newMessage', {
    //     from,
    //     text,
    //     createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected from server')
  });
});



server.listen(port, () => {
  console.log('started on port ' + port)
});

module.exports = {app};
