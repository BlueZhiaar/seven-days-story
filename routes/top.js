var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('top', { title: '七日間の物語りTOPです' });
});

module.exports = router;
