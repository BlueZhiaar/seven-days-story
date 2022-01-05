var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newchara', { title: '七日間の物語り' });
});


module.exports = router;
