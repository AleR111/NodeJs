const fs = require("fs")
const inquirer = require("inquirer")
const http = require("http")
const url = require("url")
const yargs = require("yargs")
const path = require("path")

const htmlPath = path.join(__dirname, "./public/index.html")

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true)
  console.log(req.url)

  if (req.method === "GET") {
    if (query?.we === "12") res.end("kek")
    switch (req.url) {
      case "/load":
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify([1, 2, 3, 5]))
        break
      case "/getData":
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify([1, 2, 3]))
        break
      default:
        if (Object.keys(query).length === 0) {
          console.log("dfgfdg")
          const readHtml = fs.createReadStream(htmlPath)
          res.writeHead(200, {
            "Content-type": "text/html",
          })
          readHtml.pipe(res)
        }
    }
  }
})

server.listen(8080)
