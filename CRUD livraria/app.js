// Criar uma API que realize funções CRUD em um BD de uma livraria com os seguintes requisitos:


// feito - Cada objeto livro deve ter, pelo menos, as propriedades id, titulo, autor, editora, ano, quant, preço 
// nao feito - Implementar as operações CRUD básicas (falta o update!!!)
// feito - Implementar uma operação para buscar os livros de uma determinada editora
// feito - Implementar operação para buscar o livro que o título possui uma palavra chave específica
// feito - Implementar operação para buscar os livros acima de um determinado preço
// feito - Implementar operação para buscar os livros abaixo de um determinado preço
// nao feito - Implementar operação para buscar os livros mais recentes
// nao feito - Implementar operação para buscar os livros mais antigos
// feito - Implementar operação para buscar os livros sem estoque
// feito - Em caso de acesso a um endpoint inexistente deve ser exibido o erro 404


const express = require('express')
const app = express()
const PORT = 3000
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.listen(PORT, () => {
console.log('running...')
})

let db = []

//select
app.get('/library', (req, res) => {
res.json(db)
})

//create
app.post('/library', (req, res) => {
let lastId = Math.max(...db.map(u => u.id))
const library = {
    id: ++lastId,
    titulo: req.body.titulo,
    autor: req.body.autor,
    editora: req.body.editora,
    ano: req.body.ano,
    quant: req.body.quant,
    preco: req.body.preço
}
db.push(library)
res.json(db)
})

//delete
app.delete('/library/:id', (req, res) => {
    db = db.filter(u => u.id !== parseInt(req.params.id))
    res.json(db)
    })



//searching for any editor
app.get('/library/search_for_editor/:editora', (req,res) => {
let library = db.find(u => u.editora.toLowerCase()===(req.params.editora.toLowerCase()))
res.json(library)
})

//searching for any word from title
app.get('/library/search_for_title/:titulo', (req,res) => {
    let library = db.find(u => u.titulo.toLowerCase().includes(req.params.title.toLowerCase()))
    res.json(library)
    })

//searching for any price is above to any price
app.get('/library/preco/maior/:preco', (req,res) => {
    let library = db.find(u => u.preco>parseFloat(req.params.title))
    res.json(library)
    })

//searching for any price is below to any price
app.get('/library/preco/menor/:preco', (req,res) => {
    let library = db.find(u => u.preco<parseFloat(req.params.title))
    res.json(library)
    })

//searching for book out of stock
app.get('/library/outofstock', (req,res) => {
    let library = db.find(u => u.quant===parseInt(0))
    res.json(library)
    })


// no endpoint
app.get('/library/*', (req,res) => {
    res.json({ 
        err: "error 404"
    })
    })