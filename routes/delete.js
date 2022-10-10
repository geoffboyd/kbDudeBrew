const SQLite3 = require('better-sqlite3');
const db = new SQLite3('./db/dnd-db.sqlite3');
const express = require('express');
const router = express.Router();

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

/* DELETE recipe listing. */
router.get('/', function(req, res) {
  let url = req.url;
  url = url.split('=');
  let rowNumber = url[1];
  let removeRecipe = db.prepare(`DELETE FROM mdsaves WHERE row=${rowNumber};`);
  removeRecipe.run();
  res.redirect('/success');
});

module.exports = router;
