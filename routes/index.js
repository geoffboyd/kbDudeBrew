const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KB DudeBrew' });
});

router.post('/'), function(req, res, next) {
  res.render('/search', { req })
}

module.exports = router;
