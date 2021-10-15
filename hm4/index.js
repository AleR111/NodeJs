#!/usr/bin/env node

const fs = require("fs")
const readline = require("readline")
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

const dirFiles = (dir) => {
  let fullPath = dir
  const list = fs.readdirSync(dir)
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
      console.log(__dirname)
      if (!fs?.lstatSync(fullPath)?.isFile()) {
        return dirFiles(fullPath)
      }
      const data = fs.readFileSync(fullPath, "utf-8")

      console.log(data)
    })
}

dirFiles(executorDir)
