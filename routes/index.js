var fs = require('fs');
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

router.get('/exception', function(req, res, next) {
  throw new Error('Kaboom!');
});

router.get('/error', function(req, res, next) {
  console.error("418: I'm a teapot");
  res.status(418).send("I'm a teapot"); // https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol
});

router.get('/crash', function(req, res, next) {
  process.exit(1);
});

const mem = [];
router.get('/leak', function(req, res, next) {
  mem.push(new Uint8Array(50000));
  res.render('index', { title: 'Express' });
});

// http://buildnewgames.com/garbage-collector-friendly-code/
router.get('/gc', function(req, res, next) {
  const func = () => {
    global.x = new Array(1000);
  }
  for(let i = 0; i < 1000; i++) func();
  res.render('index', { title: 'Express' });
});

const handles = [];
router.get('/handles', function(req, res, next) {
  var filename = __dirname+'package.json';
  var readStream = fs.createReadStream(filename);
  handles.push(readStream);
  res.render('index', { title: 'Express' });
});

module.exports = router;
