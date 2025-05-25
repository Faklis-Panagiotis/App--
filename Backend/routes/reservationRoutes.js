const express = require('express');
const router = express.Router();
const {
  createReservation,
  updateReservation,
  deleteReservation,
  getUserReservations,
} = require('../controllers/reservationController');

const authenticateToken = require('../middlewares/authMiddleware');

router.post('/reservations', authenticateToken, createReservation);
router.put('/reservations/:id', authenticateToken, updateReservation);
router.delete('/reservations/:id', authenticateToken, deleteReservation);
router.get('/user/reservations', authenticateToken, getUserReservations);

module.exports = router;
