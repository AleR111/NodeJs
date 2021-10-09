const fs = require("fs")
const readline = require("readline")
const ACCESS_LOG = "./access.log"

const ip_89 = "89.123.1.41"
const ip_34 = "34.48.240.111"

const writeLog = (ip, log) => {
  fs.appendFile(
    `${ip}_requests.log`,
    `${log}\n`,
    {
      encoding: "utf-8",
    },
    (err) => {
      if (err) console.log(err)
    },
  )
}

const refactorLog = (log) => {
  if (log.includes(ip_89)) writeLog(ip_89, log)
  else if (log.includes(ip_34)) writeLog(ip_34, log)
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(ACCESS_LOG),
})

lineReader.on("line", refactorLog)
