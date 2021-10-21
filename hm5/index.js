#!/usr/bin/env node

const fs = require("fs")
const http = require("http")
const url = require("url")
const path = require("path")

let fullPath = process.cwd()

const dirFiles = (dir) => {
  if (dir) fullPath = path.join(fullPath, dir)
  if (fs?.lstatSync(fullPath)?.isFile()) {
    return fs.readFileSync(fullPath, "utf-8")
  }
  const list = fs.readdirSync(fullPath)

  if (!list.length) return "directory is empty"

  return list
}

const htmlPath = path.join(__dirname, "./public/index.html")

const reqUrl = (url) => {
  const cutIdx = url.indexOf("/?")
  if (cutIdx === -1) return url
  return url.slice(0, cutIdx)
}

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true)

  switch (reqUrl(req.url)) {
    case "/load":
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(dirFiles()))
      break
    case "/getData":
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(dirFiles(query.path)))
      break
    default:
      if (Object.keys(query).length === 0) {
        const readHtml = fs.createReadStream(htmlPath)
        res.writeHead(200, {
          "Content-type": "text/html",
        })
        readHtml.pipe(res)
      }
  }
})

server.listen(8080)
