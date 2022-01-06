var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('decidepol', { title: '七日間の物語りの行動の指針の入力画面', name: charaname});
});

module.exports = router;
