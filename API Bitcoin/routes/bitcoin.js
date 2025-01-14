var express = require('express');
var router = express.Router();
var axios = require('axios'); 

/* GET home page. */
router.get('/usd', async function (req, res, next) {

    const bitcoin = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

    res.render('components/main', {
        title: 'Crypto Data',
        content: '../bitcoin',
        b: bitcoin.data,
        locate: 'USD'
    });
});
router.get('/pound', async function (req, res, next) {

    const bitcoin = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

    res.render('components/main', {
        title: 'Crypto Data',
        content: '../bitcoin',
        b: bitcoin.data,
        locate: 'GBP'
    });
});
router.get('/euro', async function (req, res, next) {

    const bitcoin = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

    res.render('components/main', {
        title: 'Crypto Data',
        content: '../bitcoin',
        b: bitcoin.data,
        locate: 'EUR'
    });
});

module.exports = router;
