var express = require('express');
var router = express.Router();

//piv means Public Images to View
/* GET animes page. */

const db = require('../database/animes.js')
router.get('/', function(req, res, next) {
  res.render('components/main', { 
    title: 'Animes', 
    content: '../modulos/animes',
    db_url: db
  });
});

module.exports = router;

