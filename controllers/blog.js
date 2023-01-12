const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogResults = await Blog.find({})
    response.json(blogResults)
  })
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if(!blog.url||!blog.title){
      response.status(400).end()
    }
  else{
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })}
  })
  blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
    }
  )
  blogRouter.put('/:id', async (request, response)=>{
    const id = request.params.id
    const body = request.body
    const blog = {
      title: body.title,
      likes: body.likes,
      author: body.author,
      url: body.url
    }
    await Blog.findByIdAndUpdate({_id:id}, blog).then(result=>{
      response.status(200).json(result)
    })
  })
  module.exports = blogRouter