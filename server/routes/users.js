var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    User.find().then(users => {
      const jsonResponse = {
        users: users
      }
      res.json(jsonResponse);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

router.get('/:user', function(req, res, next) {
  try {
    User.find({ username: req.params.user }).then(user => {
      const jsonResponse = {
        user: user
      }
      res.json(jsonResponse);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

module.exports = router;
