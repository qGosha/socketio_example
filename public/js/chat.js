var socket = io();

function scrollToBottom() {
 //Selectors
 const messages = $('#messages');
 const newMessage = messages.children('li:last-child');
 //Heights
 const clientHeight = messages.prop('clientHeight');
 const scrollTop = messages.prop('scrollTop');
 const scrollHeight = messages.prop('scrollHeight');
 const newMessageHeight = newMessage.innerHeight();
 const prevMessageHeight = newMessage.prev().innerHeight();
 if(clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
  messages.scrollTop(scrollHeight);
 }
}

socket.on('connect', function() {
  const params = $.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error')
    }
  });

})

socket.on('disconnect', function() {
  console.log('disconnected from server')
});

socket.on('updateUserList', function(users){
  let ol = $('<ol></ol>');
  users.forEach(function(user) {
    ol.append($('<li></li>').text(user))
  });
  $('#users').html(ol);
})

socket.on('newMessage', function(newMessage) {
  const formTime = moment(newMessage.createdAt).format('h:mm a');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formTime
  });
  $('#messages').append(html);
  scrollToBottom();
})

socket.on('newLocationMessage', function(newMessage){
  const formTime = moment(newMessage.createdAt).format('h:mm a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    url: newMessage.url,
    from: newMessage.from,
    createdAt: formTime
  });
  $('#messages').append(html);
  scrollToBottom();
})

const locbutton = $('#location');
locbutton.on('click', function(e){
  e.preventDefault();

  if(!navigator.geolocation) {
    return alert('Geolocation is not supported')
  }
  locbutton.attr('disabled', 'disabled').text('Sending...');
  navigator.geolocation.getCurrentPosition(function(position){
    locbutton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
    locbutton.removeAttr('disabled').text('Send location');
  })
})

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    text: $('[name=message]').val()
  }, function() {
   $('[name=message]').val('');
  });
})
