var express = require('express');
var router = express.Router();
const app = express();
let test;
test = 'テストだよ'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newchara', { title: test });
});

//キャラ名を受け取る
const bodyParser = require('body-parser');
let charaname;

app.use(bodyParser.urlencoded({ extended: true }));

router.get('/newchara', (req, res,next) => {
  
  next();
})

module.exports = router;
