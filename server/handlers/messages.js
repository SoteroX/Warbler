const db = require('../models');

exports.createMessage = async function(req,res, next) {
    try {
        //create message
        let message = await db.Message.create({
           text: req.body.text,
           user: req.params.id
        });
        console.log('creating messaging');
        //find user
        let foundUser = await db.User.findById(req.params.id);
        console.log('found user');
        console.log('message id: ', message.id);
        foundUser.messages.push(message.id);
        console.log('push msg now saving');
        await foundUser.save();
        console.log('finding msg');
        let foundMessage = await db.Message.findById(message._id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        console.log('Found msg');
        console.log('msg is: ', foundMessage);
        return res.status(200).json(foundMessage);
    } catch(err){
        return next(err);
    }
};

exports.getMessage = async function(req, res, next) {
    console.log('GETING MESSAGES');
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch(err) {
        return next(err);
    }
};

// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id)
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch(err){
        return next(err);
    }
};