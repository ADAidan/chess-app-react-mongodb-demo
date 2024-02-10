var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const jsonResponse = {
    message: `respond with a resource`
  };
  res.json(jsonResponse);
});

router.get('/:user', function(req, res, next) {
  const jsonResponse = {
    user: req.params.user
  };
  res.json(jsonResponse);
});

module.exports = router;
