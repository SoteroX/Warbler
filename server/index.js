require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const msgRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// all routes here
app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    msgRoutes
);

app.get('/api/messages', loginRequired,  async function(req, res, next){
    console.log("GETTING MESSAGES");
    try {
        console.log('inside try');
        let messages = await db.Message.find()
            .sort({ createdAt: 'desc'})
            .populate('user', {
                username: true,
                profileImageUrl: true
            });
        console.log('message is: ', messages);
        return res.status(200).json(messages);
    } catch (err) {
        console.log('BAD DATA');
        return next(err);
    }
});

app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log('Server is Running');
});