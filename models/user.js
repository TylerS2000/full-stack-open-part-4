const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true, minlength:3},
    name: String,
    passwordHash: {type:String, required:true, minlength:3},
    blogs:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
    ]
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.passwordHash
        delete returnedObject.__v
        returnedObject.id = returnedObject._id
        delete returnedObject._id
    }})

module.exports = mongoose.model('User', userSchema)