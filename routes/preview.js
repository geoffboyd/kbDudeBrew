const express = require('express');
const router = express.Router();
const Markdown = require('markdown-it');
const brewdown = require('brewdown');
const md = new Markdown().use(require('markdown-it-imsize')).use(brewdown, {style: "two-col", pageSize: "letter"});
const fs = require('fs');
let html;

/* POST homebrew preview. */
router.post('/', function(req, res, next) {
  let markdown = req.body.markdown;
  markdown = md.render(markdown);
  fs.readFile('./htmlTemplates/header.html', 'utf-8', (err, data) => {
    html = data + markdown;
    res.send(html);
  })

});

module.exports = router;
