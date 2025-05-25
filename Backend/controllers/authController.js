const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Εγγραφή χρήστη
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) return res.status(400).json({ message: 'Ο χρήστης υπάρχει ήδη' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);
    res.status(201).json({ message: 'Επιτυχής εγγραφή' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Σύνδεση χρήστη
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ message: 'Λάθος στοιχεία' });

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) return res.status(400).json({ message: 'Λάθος στοιχεία' });

    const token = jwt.sign({ id: rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: rows[0].user_id, name: rows[0].name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
