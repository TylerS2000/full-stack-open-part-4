const mongoDB = require('../utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const blogSchema = new mongoose.Schema({
    title:{type:String ,required:true},
    author: String,
    url: {type:String, required:true},
    likes: {type:Number, default:0}
  })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
    }})

  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = Blog