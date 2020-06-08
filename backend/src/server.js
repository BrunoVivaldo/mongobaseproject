const express = require('express');
const mongoose = require('mongoose');

const dbConfig = require('./config/dbConfig.json');
const routes = require('./app/routes');


const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const dbPath = isProduction ? dbConfig.production : dbConfig.develpoment;

mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(express.json());
app.use(routes);


app.listen(port, () => {
  console.log(`Server is running at port${port}`);
});
