#!/usr/bin/env node

const fs = require("fs")
const inquirer = require("inquirer")
const yargs = require("yargs")
const path = require("path")

const options = yargs.usage("Usage -p <path> to file").options("p", {
  alias: "path",
  describe: "path to file",
  type: "string",
  demandOption: false,
}).argv

const executorDir = path.join(process.cwd(), options.path || "")

const search = (data) => {
  inquirer
    .prompt([
      {
        name: "searchText",
        type: "input",
        message: "enter search text: ",
      },
    ])
    .then((answer) => answer.searchText)
    .then((searchText) => {
      if (!searchText) {
        console.log("should to enter text")
        return search(data)
      }
      const re = new RegExp(searchText, "gi")
      const foundText = data.match(re)
      if (foundText) {
        console.log(`Found '${searchText}': ${foundText.length} times`)
      } else console.log("the search text was not found")
    })
}

const dirFiles = (dir) => {
  let fullPath = dir
  const list = fs.readdirSync(dir)

  if (!list.length) return console.log("directory is empty")

  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Choose a file to read",
        choices: list,
      },
    ])
    .then((answer) => answer.fileName)
    .then((fileName) => {
      fullPath = path.join(fullPath, fileName)

      if (!fs?.lstatSync(fullPath)?.isFile()) {
        return dirFiles(fullPath)
      }
      const data = fs.readFileSync(fullPath, "utf-8")
      search(data)
    })
}

dirFiles(executorDir)
