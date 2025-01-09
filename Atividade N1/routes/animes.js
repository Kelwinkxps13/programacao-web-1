var express = require('express');
var router = express.Router();

/* GET animes page. */
router.get('/', function(req, res, next) {
  res.render('modulos/animes', { title: 'Animes' });
});

module.exports = router;
