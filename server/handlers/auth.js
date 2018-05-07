const db = require("../models");
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    console.log("hello")
    try {
        //finding a user 
        let user = await db.User.findOne({
            email: req.body.email
        });
        console.log("user is: ", user);
        let { id, username, profileImageUrl } = user;
        //checking if their password matches what was sent to the server]
        let isMatch = await user.comparePassword(req.body.password);
        //if it all matches
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, 
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid if/else error Email/Password"
            });
        }
    } catch(err) {
        return next({ status: 400, message: "CATCH: Invalid Email/Password"});
    }
};

exports.signup = async function(req, res, next){
    try {
        //create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        //create a token (signing a token)
        let token =jwt.sign(
        {
            id,
            username,
            profileImageUrl
        }, 
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch(err){
        //see what kind of error
        //if it is a certain error
        //respond with username/email already taken
        //otherwise just send back a generic 400

        //if a validation fails
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};