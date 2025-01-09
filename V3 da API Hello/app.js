const express = require('express');
const app = express();
const PORT = 8000;
app.listen(PORT, () => {
    console.log('Hello API on port 8000');
})

app.get('/', function (req, res) {
    res.send('hello, world!');
})

app.get('/v2/:name/json', function (req, res) {
    res.json({ msg: 'hello, ' + req.params.name });
})

//version 3


app.get('/v3/:lang/:name/json', function (req, res) {
    if (req.params.lang == "pt-br") {
        res.json({ msg: 'Olá, ' + req.params.name });
    } else if (req.params.lang == "en") {
        res.json({ msg: 'Hello, ' + req.params.name });
    } else {
        res.json({ err: "invalid endpoint" });
    }
})
app.get('/v3/*', function (req, res) {
    res.json({ err: "invalid endpoint" });
})