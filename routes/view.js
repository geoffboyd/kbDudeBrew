const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/dnd-db.sqlite3');
const express = require('express');
const router = express.Router();
const Markdown = require('markdown-it');
const brewdown = require('brewdown');
const md = new Markdown().use(require('markdown-it-imsize')).use(brewdown, {style: "two-col", pageSize: "letter"});
const fs = require('fs');
let html;

// Some database verification. Check if the table "chats" exists. This is where we save the chat log for the Markov chain generator
const markdownSheets = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'mdsaves';").get();
if (!markdownSheets['count(*)']) {
  // If the table isn't there, create it and setup the database correctly.
  db.prepare('CREATE TABLE mdsaves (row INTEGER NOT NULL PRIMARY KEY, title STRING, author STRING, category STRING, created DATETIME, modified DATETIME, md TEXT, child BOOLEAN, child_of STRING);').run();
  // Ensure that the "row" row is always unique and indexed.
  db.prepare('CREATE UNIQUE INDEX idx_markdownSheets_row ON markdownSheets (row);').run();
  db.pragma('synchronous = 1');
  db.pragma('journal_mode = wal');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  let url = req.url;
  url = url.split('=');
  let row = url[1];
  let mdsheet = db.prepare(`SELECT md FROM mdsaves WHERE row='${row}'`).pluck().get();
  if (!mdsheet) {
    fs.readFile('./htmlTemplates/header-err.html', 'utf-8', (err, data) => {
      html = data + `<div><h1>Markdown not found!</h1><p>Use your browser's back button to go back</p></div>`;
      res.send(html)
    })
    return
  }
  mdsheet = mdsheet.replaceAll('\'\'', '\'');
  mdsheet = md.render(mdsheet);
  fs.readFile('./htmlTemplates/header.html', 'utf-8', (err, data) => {
    html = data + mdsheet;
    res.send(html);
  })
});

module.exports = router;
