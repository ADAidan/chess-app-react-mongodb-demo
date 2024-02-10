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

module.exports = router;
