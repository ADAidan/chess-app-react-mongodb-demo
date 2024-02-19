var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', async function(req, res, next) {
  const user = await User.findOne({ username: /^Aidan/ });
  const jsonResponse = {
    message: `Welcome ${user.username}!`
  };
  res.json(jsonResponse);
});

router.get('/hello', function(req, res, next) {
  const jsonResponse = {
    message: `Hello!`
  };
  res.json(jsonResponse);
});

router.get('/hello/:name', function(req, res, next) {
  const jsonResponse = {
    message: `Hello ${req.params.name}!`
  };
  res.json(jsonResponse);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {
  try {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    user.welcome();
    res.status(201).json({ message: 'Username set successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to set username' });
  }
});

module.exports = router;