var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wait', function(req, res, next) {
  setTimeout(() => {
    res.render('index', { title: 'Express' });
  }, 500);
});

router.get('/cpu', function(req, res, next) {
  const start = new Date().getTime();
  while(new Date().getTime() < start + 500);
  res.render('index', { title: 'Express' });
});

module.exports = router;
