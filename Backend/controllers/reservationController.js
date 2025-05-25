const db = require('../db');

// Δημιουργία κράτησης
exports.createReservation = async (req, res) => {
  const { restaurant_id, date, time, people_count } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      'INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?)',
      [user_id, restaurant_id, date, time, people_count]
    );
    res.status(201).json({ message: 'Η κράτηση καταχωρήθηκε' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ενημέρωση κράτησης
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { date, time, people_count } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      'UPDATE reservations SET date = ?, time = ?, people_count = ? WHERE reservation_id = ? AND user_id = ?',
      [date, time, people_count, id, user_id]
    );
    res.json({ message: 'Η κράτηση ενημερώθηκε' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Διαγραφή κράτησης
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    await db.query('DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?', [id, user_id]);
    res.json({ message: 'Η κράτηση διαγράφηκε' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Προβολή κρατήσεων του χρήστη
exports.getUserReservations = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [rows] = await db.query(
      'SELECT * FROM reservations WHERE user_id = ? ORDER BY date, time',
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
