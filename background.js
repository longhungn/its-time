class Timer extends EventEmitter {
    constructor() {
        super()
        this.timeRemaining = 0
        this.interval = 0
        this.running = false
    }

    startTimer(timeLength) {
        this.running = true
        this.timeRemaining = timeLength
        console.log('time left: '+ this.timeRemaining)
        this.emit('update', this.timeRemaining)
        this.interval = setInterval( () => {
            this.timeRemaining--
            console.log('time left: '+ this.timeRemaining)
            this.emit('update', this.timeRemaining)
            if (this.timeRemaining <= 0) {
                this.endTimer()
                return
            }
            
        }, 1000)
    }

    endTimer() {
        clearInterval(this.interval)
        this.running = false
        console.log('done')
        chrome.tabs.executeScript({file: 'inject.js'})
    }

    cancelTimer() {
        clearInterval(this.interval)
        this.running = false
        this.timeRemaining = 0
        this.emit('update', this.timeRemaining)
    }
}

window.timer = new Timer()