// app.js - βασικό αρχείο του backend

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config(); // Φορτώνει τις μεταβλητές από το αρχείο .env

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ο server τρέχει στη θύρα ${PORT}`);
});
