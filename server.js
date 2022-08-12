const express = require('express');
const { double } = require('webidl-conversions');
const db = require('./config/connection');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

routes = require('./routes/')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`running on port ${PORT}`)
    })
})