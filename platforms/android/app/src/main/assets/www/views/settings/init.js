var socket =io();
                
// $('form').submit(function(){
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
// });

socket.on("nickname", function(nickname) {
  console.log("socket nickname: ", nickname);
//   var data= `<input type="hidden" name="nickname" value="${nickname}">`;
//   $('#header1').prepend(nickname);
//   $('#nickname').append(data);
});