var express = require('express');
var path = require('path');
var fs = require('fs'); // Importando fs para manipulação de arquivos
var router = express.Router();

// Caminho para o arquivo JSON
const dbPath = path.join(__dirname, '../database', 'animes.json');

// Função para carregar dados do arquivo JSON
const getDbData = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData); // Convertendo o JSON para um objeto JavaScript
};

// Função para salvar os dados no arquivo JSON
const saveDbData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); // Salvando os dados no arquivo
};

/* GET animes page. */
router.get('/', function (req, res, next) {
  const db = getDbData(); // Carregar os dados do JSON
  res.render('components/main', {
    title: 'Animes',
    content: '../modulos/animes',
    db_url: db // Passa os dados de animes para o template
  });
});

router.get('/create', function (req, res, next) {
  res.render('components/main', {
    title: 'Adicionar Animes',
    page: 'Animes',
    content: '../modulos/create',
    db_url: [] // Passa um array vazio para a criação de novos animes
  });
});

router.post('/', function (req, res, next) {
  const db = getDbData(); // Carregar os dados do JSON
  const lastId = Math.max(...db.map(u => u.id), 0); // Pegando o último id e incrementando

  const newData = {
    id: lastId + 1, // Incrementa o id
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  };

  db.push(newData); // Adiciona o novo anime ao array

  saveDbData(db); // Salva os dados atualizados de volta no arquivo JSON

  res.render('components/main', {
    title: 'Animes',
    content: '../modulos/animes',
    db_url: db // Passa os dados atualizados para o template
  });
});

module.exports = router;



// var express = require('express');
// var router = express.Router();


// //piv means Public Images to View
// /* GET animes page. */

// var path = require('path'); 
// const db = path.join(__dirname, '../database', 'animes.json');
// router.get('/', function (req, res, next) {
//   res.render('components/main', {
//     title: 'Animes',
//     content: '../modulos/animes',
//     db_url: db
//   });
// });
// router.get('/create', function (req, res, next) {
//   res.render('components/main', {
//     title: 'Adicionar Animes',
//     page: 'Animes',
//     content: '../modulos/create',
//     db_url: db
//   });
// });

// router.post('/', function (req, res, next) {
//   let lastId = Math.max(...db.map(u => u.id))

//   let new_data = {
//     id: ++lastId,
//     title: req.body.title,
//     description: req.body.description,
//     image: req.body.image
//   }

//   db.push(new_data)
  
//   res.render('components/main', {
//     title: 'Animes',
//     content: '../modulos/animes',
//     db_url: db
//   });
// });

// module.exports = router;

