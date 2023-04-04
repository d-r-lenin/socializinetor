require('dotenv').config();
require('./configs/db').connect();

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
