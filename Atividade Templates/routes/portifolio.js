var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('portifolio', { title: 'Portifolio' });
  console.log('está no portif');
});

module.exports = router;
