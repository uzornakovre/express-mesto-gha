const path            = require('path');
const express         = require('express');
const mongoose        = require('mongoose');
const router          = require('express').Router();
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('connected')
  })

router.get('/', (req, res) => {
  console.log('asdasd');
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})