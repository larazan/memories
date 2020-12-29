const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://ratriwiranti:ratriwiranti29@cluster0.9vl7w.mongodb.net/memories_app?retryWrites=true&w=majority';
const LOCAL_DB = 'mongodb://localhost:27017/memories';
const PORT = process.env.port || 5000;

mongoose.connect(LOCAL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server  running on port: ${PORT}` )))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

