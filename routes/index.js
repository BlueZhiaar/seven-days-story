var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '七日間の物語り', user: req.user });
});

module.exports = router;
