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
  res.render('modulos/portfolio', { 
    title: 'Portifólio', 
    content: '../modulos/portfolio',
    db_url: db // Passando os dados para o template
  });
});

router.get('/nome/:id', function (req, res, next) {
  const id = parseInt(req.params.id); // Obtém o ID da rota e converte para número
  const db = getDbData(); // Carrega os dados do JSON
  
  // Filtra o item correspondente ao ID
  const k = db.find(item => item.id === id);

  if (!k) {
    // Retorna 404 se o ID não for encontrado
    return res.status(404).send('Portifólio não encontrado');
  }

  // Renderiza a página com os dados do anime correspondente
  res.render('modulos/veja', {
    title: k.title,
    content: '../modulos/animes',
    db_url: k // Passa os dados do anime para o template
  });
});

router.get('/create', function(req, res, next) {
  res.render('modulos/create', { 
    title: 'Adicionar Portifólio',
    page: 'Portifólio',
    url: 'portfolio',
    content: '../modulos/create',
    db_url: [] // Passa um array vazio para a criação de novos portfólios
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

  res.render('modulos/portfolio', { 
    title: 'Portifólio', 
    content: '../modulos/portfolio',
    db_url: db // Passando os dados para o template
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
