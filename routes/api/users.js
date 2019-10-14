const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');




/*---------- Public Routes ----------*/


router.get('/', usersCtrl.allProfiles);
router.get('/:id', usersCtrl.show);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/:id', usersCtrl.deleteOne);
router.put('/:id', usersCtrl.update);



  // Set chat routes as a subgroup/middleware to apiRoutes




module.exports = router;