// authMiddleware.js - Middleware για προστασία routes μέσω JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Αν δεν υπάρχει token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Αν δεν είναι έγκυρο

    req.user = user; // Προσθέτουμε τα στοιχεία του χρήστη στο request
    next(); // Συνεχίζουμε προς το επόμενο middleware ή route
  });
};

module.exports = authenticateToken;
