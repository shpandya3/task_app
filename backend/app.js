const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(bodyParser.json({limit: "100mb"}));

app.use('/users', userRoutes);

app.use('/tasks', taskRoutes);

module.exports = app;

