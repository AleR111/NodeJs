const isSimpleNumber = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
};

const simpleNumbers = (downLimit, upLimit) => {

    if(downLimit < 2) downLimit = 2

  for (let i = downLimit; i <= upLimit; i++) {
     if (isSimpleNumber(i)) console.log(i);
  }
};

simpleNumbers(+process.argv[2], +process.argv[3]);
