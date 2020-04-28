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
//router.use(require('../../config/auth'));
router.put('/:id',usersCtrl.update);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below

//router.post('/', checkAuth, scoresCtrl.create);

/*----- Helper Functions -----*/
// function checkAuth(req, res, next) {
//   console.log(req);
//   if (req.user) return next();
//   return res.status(401).json({msg: 'Not Authorized'});
// }


  // Set chat routes as a subgroup/middleware to apiRoutes




module.exports = router;