const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./router');
const {mongoDB} = require('./config');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use('/api', authRouter);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const start = async () => {
  try {
    await mongoose.connect(mongoDB);
    app.listen(PORT, () => console.log(`server running on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
};

start();

