const fs = require("fs")
const inquirer = require("inquirer")
const http = require("http")
const url = require("url")
const yargs = require("yargs")
const path = require("path")

const htmlPath = path.join(__dirname, "./public/index.html")

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true)

  if (Object.keys(query).length === 0) {
    const readHtml = fs.createReadStream(htmlPath)
    res.writeHead(200, {
      "Content-type": "text/html",
    })
    readHtml.pipe(res)
  }
  if (req.method === "GET") {
    if (query?.we === "12") res.end("kek")
    else {
      res.writeHead(405, {
        "X-Custom-Header": "Test",
      })
      res.write("Method not Allowed")
      res.end()
    }
  }
})

server.listen(8080)
