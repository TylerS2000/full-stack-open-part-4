const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
require('express-async-errors');

userRouter.post('/', async (request, response) => {
    const body = request.body;
    const saltRounds = 10;
 
    if(body.password.length < 3){
        return response.status(400).json({error: 'password must be at least 3 characters long'})
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash:passwordHash
    });  
    const savedUser = await user.save();
    
    response.status(201).json(savedUser);
    });

userRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', {title:1, author:1, url:1, likes:1});

    response.status(200).json(users)
    });

module.exports = userRouter;