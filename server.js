const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3004;
app.use(require('./routes'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set('debug', true);
app.listen(PORT, () =>
 console.log(`app is listening on ${PORT}`));