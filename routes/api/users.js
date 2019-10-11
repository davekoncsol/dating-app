const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');
const ChatController = require('../../controllers/chat');



const apiRoutes = router;
const chatRoutes = router;


/*---------- Public Routes ----------*/


router.get('/', usersCtrl.allProfiles);
router.get('/:id', usersCtrl.show);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/:id', usersCtrl.deleteOne);
router.put('/:id', usersCtrl.update);

  // Set chat routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/chat', chatRoutes);

  // View messages to and from authenticated user
  chatRoutes.get('/',  ChatController.getConversations);

  // Retrieve single conversation
  chatRoutes.get('/:conversationId', ChatController.getConversation);

  // Send reply in conversation
  chatRoutes.post('/:conversationId', ChatController.sendReply);

  // Start new conversation
  chatRoutes.post('/new/:recipient', ChatController.newConversation);

/*---------- Protected Routes ----------*/




module.exports = router;