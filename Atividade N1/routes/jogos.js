var express = require('express');
var path = require('path');
var fs = require('fs'); // Importando o fs
var router = express.Router();

/* GET home page. */
const dbPath = path.join(__dirname, '../database', 'jogos.json');

// Lê o arquivo JSON e converte em objeto
const getDbData = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData); // Converte o JSON em um objeto JavaScript
};

router.get('/', function(req, res, next) {
  const db = getDbData(); // Carrega os dados do JSON
  res.render('components/main', { 
    title: 'Jogos', 
    content: '../modulos/jogos',
    db_url: db // Passa o array para o template
  });
});

router.get('/create', function(req, res, next) {
  res.render('components/main', { 
    title: 'Adicionar Jogos',
    page: 'Jogos',
    content: '../modulos/create',
    db_url: [] // Passando um array vazio, já que não estamos mostrando dados aqui
  });
});

module.exports = router;


// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// var path = require('path'); 
// const db = path.join(__dirname, '../database', 'jogos.json');
// router.get('/', function(req, res, next) {
//   res.render('components/main', { 
//     title: 'Jogos', 
//     content: '../modulos/jogos',
//     db_url: db
//   });
// });

// router.get('/create', function(req, res, next) {
//   res.render('components/main', { 
//     title: 'Adicionar Jogos',
//     page: 'Jogos',
//     content: '../modulos/create',
//     db_url: db
//   });
// });

// module.exports = router;
