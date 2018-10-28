var express = require('express');
var router = express.Router();
var Bairro = require('../models/Bairro')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Batata', batata: [1, 2] });
});

router.get('/cadastrar/bairro', (req, res, next) => {
  res.render('inserirBairro');
});
router.post('/cadastrar/bairro', async (req, res, next) => {
  try {

    let bairro = req.body.nomeBairro
    let body = {
      nome: bairro,
      casos: 0
    }
    console.log(bairro);
    let novoBairro = await new Bairro(body);
    await novoBairro.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
});
router.get('/cadastrar/casos', async (req, res, next) => {
  try {
    let bairro = await Bairro.find({})
    let casosInArray = await bairro.map(e => { return e.casos })
    let total = casosInArray.reduce((a, b) => { return a + b }, 0);
    res.render('inserirCasos', { bairros: bairro, total: total });
  } catch (err) {
    next(err)
  }
});
router.post('/cadastrar/casos', async (req, res, next) => {
  try {
    let bairro = req.body.idBairro;
    let casos = req.body.numeroCasos
    let bairros = await Bairro.findById(bairro);
    await bairros.set({ casos: casos });
    await bairros.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
});
router.get('/listar/casos', async (req, res, next) => {
  try {
    let bairro = await Bairro.find({})
    res.render('listarCasos', { bairros: bairro });
  } catch (err) {
    next(err)
  }
});


module.exports = router;
