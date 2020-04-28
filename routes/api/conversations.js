const express = require('express');
const router = express.Router();
const convosCtrl = require('../../controllers/conversations');




/*---------- Public Routes ----------*/



// router.put('/:id', convosCtrl.message);
router.post('/message', convosCtrl.newMessage);
router.get('/:id', convosCtrl.getConversations);



  // Set chat routes as a subgroup/middleware to apiRoutes




module.exports = router;