const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {id:1})
    response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
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
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() !== user.id){
      return response.status(401).json({error: 'you are not authorized to delete this blog'})
    }
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