const colors = require("colors")

const isSimpleNumber = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false
  }

  return true
}

const paint = (() => {
  let colorNumber = 1
  return (num) => {
    if (colorNumber > 3) colorNumber = 1
    switch (colorNumber) {
      case 1:
        console.log(colors.green(num))
        break
      case 2:
        console.log(colors.yellow(num))
        break
      case 3:
        console.log(colors.red(num))
        break
    }
    colorNumber++
  }
})()

const simpleNumbers = (downLimit, upLimit) => {
  if (!Number.isInteger(downLimit) || !Number.isInteger(upLimit)) {
    return console.log(colors.red("limits are not numbers"))
  }
  if (downLimit < 2) downLimit = 2

  let numbersAmount = 0

  for (let i = downLimit; i <= upLimit; i++) {
    if (isSimpleNumber(i)) {
      paint(i)
      numbersAmount++
    }
  }

  if (numbersAmount) {
    console.log(colors.blue(`Amount of simple numbers: ${numbersAmount}`))
  } else console.log(colors.red(`limit don't have simple numbers`))
}

simpleNumbers(+process.argv[2], +process.argv[3])
