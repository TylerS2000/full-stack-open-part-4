const app = require('./app') 
const http = require('http')

const server = http.createServer(app)

server.listen(4003, () => {
    console.log(`Server running on port ${4003}`)
});