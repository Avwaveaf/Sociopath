const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
mongoose.set('strictQuery', true);
const userRoutes = require('./routes/userRoutes');
const {
  errorHandlerMiddleware,
} = require('./middlewares/errorHandlerMiddleware');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes middleware
app.use('/api/users', userRoutes);

//error midleware
app.use(errorHandlerMiddleware);

// run server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
