const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let initialBlogs =
[{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test("notes are returned as json", async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test("id test", async()=>{
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
test("post test", async()=>{
    const testBlog={
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }
    await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    })
test("verify likes is present", async()=>{
    const testBlog={
        title: "Test for likes",
        author: "Tyler Schulten",
        url: "https://bobman.poo",
        
    }
    await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
})
test("error if title or url is missing", async()=>{
    const testBlog={
        author:"me"
    }
    await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)
})
test("delete test", async()=>{
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
    const response2 = await api.get('/api/blogs')
    expect(response2.body.length).toBe(1)
})
test("update test", async()=>{
    await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send({
        title: "React Updated"})
    .expect(200)
})
test("user creation short password", async()=>{
    const testUser={
        username:"test",
        name:"test",
        password:"ttt"}
    await api
    .post('/api/users')
    .send(testUser)
    })
afterAll(() => {
    mongoose.connection.close()
})