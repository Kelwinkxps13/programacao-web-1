var express = require('express');
var router = express.Router();

/* GET home page. */
const db = require('../database/portfolio.js')
router.get('/', function(req, res, next) {
  res.render('components/main', { 
    title: 'Portifólio', 
    content: '../modulos/portfolio' ,
    db_url: db
  });
});

module.exports = router;
