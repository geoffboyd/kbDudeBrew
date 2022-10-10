const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JDK Cave of Horrors' });
});

router.post('/'), function(req, res, next) {
  res.render('/search', { req })
}

module.exports = router;
