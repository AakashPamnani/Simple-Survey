const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/submit", (req, res) => {
  const { name, answers } = req.body;

  if (!name || !answers) {
    return res.status(400).json({ error: "Missing data" });
  }

  const score = Object.values(answers)
    .map(Number)
    .reduce((sum, v) => sum + v, 0);

  let classification = "Vacationer";
  if (score >= 7) classification = "Traveler";

  try {
    db.prepare(
      "INSERT INTO responses (name, score, classification) VALUES (?, ?, ?)"
    ).run(name, score, classification);

    res.json({ score, classification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;

/*
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/submit", (req, res) => {
  const { name, answers } = req.body;

  if (!name || !answers) {
    return res.status(400).json({ error: "Missing data" });
  }

  const score = Object.values(answers)
    .map(Number)
    .reduce((sum, v) => sum + v, 0);

  let classification = "Vacationer";
  if (score >= 7) classification = "Traveler";

  db.prepare(
    "INSERT INTO responses (name, score, classification) VALUES (?, ?, ?)"
  ).run(name, score, classification);

  res.json({ score, classification });
});

module.exports = router;
*/

/*
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/submit", (req, res) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: "Missing answers" });
  }

  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);

  let classification = "Vacationer";
  if (score >= 15) classification = "Traveler";

  db.prepare(
    "INSERT INTO responses (score, classification) VALUES (?, ?)"
  ).run(score, classification);

  res.json({ score, classification });
});

module.exports = router;
*/