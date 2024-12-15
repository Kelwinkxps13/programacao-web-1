var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.redirect('/users/signup');
  console.log('Redirecionado para users/signup')
});

router.get('/:userid', function (req, res, next) {
  const userid = req.params.userid;

  if (userid !== 'signin' && userid !== 'signup') {
    res.render('index', { title: userid , content: "Bem vindo " + userid});
    console.log('Usuário entrou em users/' + userid);
  } else {
    if (userid === 'signin') {
      res.render('index', { title: 'Sign In' , content: ""});
      console.log('Usuário entrou em users/signin')
    } else if (userid === 'signup') {
        res.render('index', { title: 'Sign Up' , content: ""});
        res.send
        console.log('Usuário entrou em users/signup')
    }
  }
});


// router.get('/', function (req, res, next) {
//   res.redirect('/users/signup');
//   console.log('Redirecionado para users/signup')
// });

module.exports = router;
