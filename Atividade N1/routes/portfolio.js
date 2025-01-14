var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs'); // Para manipulação do arquivo JSON

// Caminho para o arquivo JSON
const dbPath = path.join(__dirname, '../database', 'portfolio.json');

// Função para carregar dados do arquivo JSON
const getDbData = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData); // Convertendo o JSON para um objeto JavaScript
};

// Função para salvar os dados no arquivo JSON
const saveDbData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); // Salvando os dados no arquivo
};

/* GET home page. */
router.get('/', function(req, res, next) {
  const db = getDbData(); // Carregar os dados do JSON
  res.render('components/main', { 
    title: 'Portifólio', 
    content: '../modulos/portfolio',
    db_url: db // Passando os dados para o template
  });
});

router.get('/create', function(req, res, next) {
  res.render('components/main', { 
    title: 'Adicionar Portifólio',
    page: 'Portifólio',
    content: '../modulos/create',
    db_url: [] // Passa um array vazio para a criação de novos portfólios
  });
});

module.exports = router;



// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// var path = require('path'); 
// const db = path.join(__dirname, '../database', 'portfolio.json');
// router.get('/', function(req, res, next) {
//   res.render('components/main', { 
//     title: 'Portifólio', 
//     content: '../modulos/portfolio' ,
//     db_url: db
//   });
// });
// router.get('/create', function(req, res, next) {
//   res.render('components/main', { 
//     title: 'Adicionar Portifólio',
//     page: 'Portifólio',
//     content: '../modulos/create',
//     db_url: db
//   });
// });

// module.exports = router;
