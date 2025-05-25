const db = require('../db');

// Επιστροφή λίστας εστιατορίων
exports.getAllRestaurants = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM restaurants');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
