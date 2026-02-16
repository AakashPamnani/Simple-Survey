const Database = require("better-sqlite3");
const db = new Database("survey.db");

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    classification TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;
