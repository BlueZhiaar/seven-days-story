var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('timestatus', { title: '七日間の物語り時間経過の状態' });
});

module.exports = router;
