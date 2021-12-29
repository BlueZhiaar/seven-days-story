var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('alldayslog', { title: '七日間の物語りの行動のすべてのログ' });
});

module.exports = router;
