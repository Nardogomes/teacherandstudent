const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res) => {
    return res.render('teachers/index')
})

server.listen(3000, () => console.log('Server is running'))