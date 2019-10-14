const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const convosCtrl = require('../../controllers/conversations');




/*---------- Public Routes ----------*/



// router.put('/:id', convosCtrl.message);
router.post('/message', convosCtrl.newMessage);



  // Set chat routes as a subgroup/middleware to apiRoutes




module.exports = router;