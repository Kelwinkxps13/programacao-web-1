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
  res.render('modulos/animes', {
    title: 'Animes',
    content: '../modulos/animes',
    db_url: db // Passa os dados de animes para o template
  });
});

router.get('/nome/:id', function (req, res, next) {
  const id = parseInt(req.params.id); // Obtém o ID da rota e converte para número
  const db = getDbData(); // Carrega os dados do JSON
  
  // Filtra o item correspondente ao ID
  const k = db.find(item => item.id === id);

  if (!k) {
    // Retorna 404 se o ID não for encontrado
    return res.status(404).send('Anime não encontrado');
  }

  // Renderiza a página com os dados do anime correspondente
  res.render('modulos/veja', {
    title: k.title,
    content: '../modulos/animes',
    db_url: k // Passa os dados do anime para o template
  });
});

router.get('/create', function (req, res, next) {
  res.render('modulos/create', {
    title: 'Adicionar Animes',
    page: 'Animes',
    url: 'animes',
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
    image: req.body.image,
    long_description: {
      about: {
        text: req.body.long_about_text
      },
      for_me: {
        text: req.body.long_for_me_text
      }
    }
  };

  db.push(newData); // Adiciona o novo anime ao array

  saveDbData(db); // Salva os dados atualizados de volta no arquivo JSON

  res.render('modulos/animes', {
    title: 'Animes',
    content: '../modulos/animes',
    db_url: db // Passa os dados atualizados para o template
  });
});

router.put('/:id', function (req, res, next) {
  const db = getDbData(); // Carregar os dados do JSON
  const id = req.params.id;
  const k = db.find(item => item.id === id);

  k.is_deleted = true

  if (!k) {
    // Retorna 404 se o ID não for encontrado
    return res.status(404).send('Anime não encontrado');
  }

  db.push(k); // Adiciona o novo anime ao array

  saveDbData(db);
  // Renderiza a página com os dados do anime correspondente
  res.render('modulos/animes', {
    title: 'Animes',
    content: '../modulos/animes',
    db_url: db // Passa os dados de animes para o template
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