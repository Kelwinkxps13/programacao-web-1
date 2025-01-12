var express = require('express');
var router = express.Router();

/* GET home page. */
const db = require('../database/jogos.js')
router.get('/', function(req, res, next) {
  res.render('components/main', { 
    title: 'Jogos', 
    content: '../modulos/jogos',
    db_url: db
  });
});

module.exports = router;
