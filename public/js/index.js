var socket = io();
socket.on('connect', function() {
  console.log('connected');
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
});

socket.on('newMessage', function(newMessage) {
  console.log('newMessage', newMessage)
})