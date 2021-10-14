#!/usr/bin/env node

const fs = require("fs")
const readline = require("readline")
const inquirer = require("inquirer")
const path = require("path")

const executorDir = process.cwd()

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
