const {formatDistanceToNowStrict, compareAsc} = require('date-fns')
const EventEmitter = require('events');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const timer = (date) => {

    const dateArray = date.split('-').reverse()
    dateArray[1] -= 1
    const finishedDate = new Date(...dateArray)

    const isValidDate = compareAsc(finishedDate, new Date())
    if (isValidDate === -1) return console.log('Please input correct date')

    const emitter = new EventEmitter()

    class Handler {
        static next(payload) {
            console.log(`${payload} left`)
        }
        static finish(payload) {
            console.log('finish')
            clearInterval(payload)
        }
    }

    const intervalId = setInterval(() => {
        console.clear()
        const result = formatDistanceToNowStrict(finishedDate)
        if (+result[0] === 0) {
            emitter.emit('finish', intervalId)
        } else emitter.emit('next', result)

    }, 1000)

    emitter.on('next', Handler.next)
    emitter.on('finish', Handler.finish)

}
rl.question('Enter the date according to the pattern "ss-mm-hh-dd-MM-YYYY": ', (data) => {
    timer(data)
    rl.close()
});
