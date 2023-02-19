const path            = require('path');
const express         = require('express');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Connected to MongoDB')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use((req, res, next) => {
  req.user = {
    _id: '63f247aa1f316ef793534526'
  };

  next();
});
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})