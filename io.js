const jwt = require('jsonwebtoken');
const Conversation = require('./models/conversation');
let io;

const conversations = {};

module.exports = {
  init,
  getIo
}

function findConversationInMemory(user) {
    let conversationsArr = Object.values(conversations);
    const conversation = conversationsArr.find(g => g.participants.some(p => p.participants == user._id));
    return conversation;
  }
  

function init(http) {
    io = require('socket.io')(http);
  
    io.on('connection', function(socket) {
  
      // Clients send this message to receive a message with
      // a pending game (if any) when the app loads, refreshes or when
      // they login

      //will open up to see if user has message historu
      socket.on('get-active', async function(token) {
        const user = await validateToken(token);
        if (!user) return;
        let conversation = findConversationInMemory(user);
        // Active game not in memory, check db just in case
        if (!conversation) conversation = await Coversation.getActiveForUser(user);
        if (conversation) {
          socket.join(conversation._id, function() {
            conversations[conversation._id] = conversation;
            io.to(conversation._id).emit('update-convo', conversation);
          });
        }
      });
  
      // Player clicked to start a new game and will be "moved"
      // to WaitingPage
      socket.on('new-conversation', async function(token) {
        const user = await validateToken(token);
        if (!user) return;
        const message = await Conversation.createForUser(user);
        messages[message._id] = message;
        socket.join(message._id, function() {
          io.to(message._id).emit('update-message', message);
        });
      });
  
      socket.on('join-game', async function({token, messageId}) {
        const user = await validateToken(token);
        if (!user) return;
        const message = messages[messageId];
        message.participants.push({
          profileId: profile._id,
          participants: user._id
        });
        message.save();
        socket.join(message._id, function() {
          io.to(message._id).emit('update-message', message);
        });
      });
  
    //   socket.on('move', async function({token, idx}) {
    //     const user = await validateToken(token);
    //     if (!user) return;
    //     let game = findGameInMemory(user);
    //     if (!game.board[idx]) game.board[idx] = game.turn;
    //     game.winner = getWinner(game.board);
    //     if (!game.winner) game.turn *= -1;
    //     io.to(game._id).emit('update-game', game);
    //     game.save();
    //   });
  
      socket.on('logout', async function(token) {
        const user = await validateToken(token);
        if (!user) return;
        let game = findGameInMemory(user);
        if (!game) game = await Game.getActiveForUser(user);
        if (game) {
          socket.leave(game._id, function() {
            const player = game.players.find(p => p.playerId.equals(user._id));
            game.players.remove(player._id);
            if (!game.players.length) {
              delete games[game._id];
              Game.findByIdAndDelete(game._id).exec();
            }
          });
        }
      });
  
    });
  
  }

  function getIo() {
    return io;
  }

  function validateToken(token) {
    return new Promise(function(resolve) {
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) resolve(false);
        resolve(decoded.user);    
      });
    });
  }