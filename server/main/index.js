require('dotenv').config();
require('./configs/db').connect();

const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', require('./controllers/users/user'));

const midAuth = require('./controllers/middlewares/auth');
const midAdditions = require('./controllers/middlewares/addons');
app.use(midAuth);
app.use(midAdditions.addErrorHandler);


app.use('/post', require('./routes/posts/posts.js'));

app.get('/', (req, res) => res.json({ 
    message: 'Hello World', 
    status: 200, 
    statusMessage: "ok" 
}));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
