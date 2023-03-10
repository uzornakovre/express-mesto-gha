const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, DB_ADDRESS } = require('./config');

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '63f247aa1f316ef793534526',
  };

  next();
});
app.use(router);
app.use(errorHandler);

app.listen(PORT);
