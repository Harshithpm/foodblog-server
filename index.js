const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/posts', postsRouter);

app.use(express.static('client/build'));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to: ${PORT}`));
