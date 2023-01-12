const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    name: String,
    passwordHash: {type:String, required:true}
})

module.exports = mongoose.model('User', userSchema)