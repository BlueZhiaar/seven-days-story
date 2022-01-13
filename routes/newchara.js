var express = require('express');
var router = express.Router();
const app = express();
let test;
test = 'テストだよ'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newchara', { title: test });
});



module.exports = router;
