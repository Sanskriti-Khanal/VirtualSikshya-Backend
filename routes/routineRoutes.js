const express = require("express");
const router = express.Router();
const pool = require("./db");

// Get all routines
router.get("/routines", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM routines");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new routine
router.post("/routines", async (req, res) => {
  const { day, time, class_name, room, class_type, teacher } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO routines (day, time, class_name, room, class_type, teacher) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [day, time, class_name, room, class_type, teacher]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a routine by ID
router.delete("/routines/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM routines WHERE id = $1", [id]);
    res.json({ message: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
