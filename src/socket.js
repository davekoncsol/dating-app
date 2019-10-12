import tokenService from '../src/utils/tokenService'

const socket = window.io();
let App = null;

/*--- This is so that this module can setState on App ---*/
function registerApp(app) {
  App = app;
}

/*--- Listeners for messages from server ---*/
socket.on('update-game', function(conversation) {
  App.setState({conversation});
});



/*--- Functions that send messages to the server ---*/
function getActive() {
  socket.emit('get-active', tokenService.getToken());
}


function newConversation() {
  socket.emit('new-conversatiopn', tokenService.getToken());
}

function joinConversation(conversationId) {
  socket.emit('join-conversation', {
    token: tokenService.getToken(),
    conversationId
  });
}

function message(message) {
  socket.emit('message', {
    token: tokenService.getToken(),
    message
  });
}

function logout() {
  socket.emit('logout', tokenService.getToken());
}

export default {
  registerApp,
  logout,
  getActive,
  message,
  newConversation,
  joinConversation
}

// exports = module.exports = function(io) {  
//     // Set socket.io listeners.
//     io.on('connection', (socket) => {
//       //console.log('a user connected');
  
//       // On conversation entry, join broadcast channel
//       socket.on('enter conversation', (conversation) => {
//         socket.join(conversation);
//         // console.log('joined ' + conversation);
//       });
  
//       socket.on('leave conversation', (conversation) => {
//         socket.leave(conversation);
//         // console.log('left ' + conversation);
//       })
  
//       socket.on('new message', (conversation) => {
//         io.sockets.in(conversation).emit('refresh messages', conversation);
//         });
  
//       socket.on('disconnect', () => {
//         //console.log('user disconnected');
//       });
//     });
//   }