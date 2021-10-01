const {formatDistanceToNowStrict, compareAsc} = require('date-fns')
const EventEmitter = require('events');

const timer = (date) => {

    const dateArray = date.split('-')
    const finishedDate = new Date(...dateArray.reverse())

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

timer(process.argv[2])