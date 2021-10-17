const url = "/getData"

const data = fetch(url)
  .then((result) => result.json)
  .catch(console.log)

console.log(222)
