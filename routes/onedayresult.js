var express = require('express');
var router = express.Router();
const jsonData = require('../public/storys/routine.json');
const storyControl = require('../app/story-control.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('onedayresult', { title: '七日間の物語り一日の結果です' });
});

module.exports = router;
