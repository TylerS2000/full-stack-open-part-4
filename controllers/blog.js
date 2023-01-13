const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {id:1})
    response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      likes: body.likes,
      author: body.author,
      url: body.url,
      user: user.id
    })
    
    const savedBlog= await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
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