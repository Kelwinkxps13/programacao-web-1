var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'index',
    teste: 'Vini'
   });
   console.log('está no index');
});

module.exports = router;
