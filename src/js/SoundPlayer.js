function random(max) {
    return Math.round(Math.random() * max)
}

export default class SoundPlayer {
    playing = false
    speed = 'slow'
    speeds = {
        slow: 2000,
        medium: 1500,
        fast: 1000,
        faster: 750
    }
    speedVariances = {
        slow: 500,
        medium: 350,
        fast: 150,
        faster: 100
    }

    mode = 'random'
    modes = ['randomUpDown', 'random']

    lastPlayedString = 'one'
    stringNames = ['one', 'two', 'three', 'four', 'five', 'six']

    constructor() {
        // load sounds
        console.log("SOUND REGISTRY LOADING")

        
        let sounds = {}
        for (let stringName of this.stringNames) { // six strings
            sounds[stringName] = []
            for (let i of [...Array(7).keys()]) {// seven of each sounds is available
                sounds[stringName].push(new Audio(`assets/sounds/${stringName}${i+1}.mp3`))
            }
        }
        
        this.sounds = sounds
    }

    setSpeed(speed) {
        if (!Object.keys(this.speeds).includes(speed)) {
            speed = 'slow'
        }
        this.speed = speed
    }

    get currentTimeout() {
        
        let timeout =  this.speeds[this.speed] + random(this.speedVariances[this.speed])
        console.log('timeout', timeout, this.speed)
        return timeout
    }

    setMode(mode) {
        if (!this.modes.includes(mode)) {
            mode = 'randomUpDown'
        }
        this.mode = mode
    }

    togglePlayback() {
        this.playing = !this.playing
        if(this.playing) {
            this.timeoutNextSound()
        }
    }

    play() {
        this.playing = true
        this.timeoutNextSound()
    }

    stop() {
        this.playing = false
    }

    timeoutNextSound() {
        setTimeout(() => {
            this.playNextSound()
        }, this.currentTimeout)
    }

    playNextSound() {
        if (!this.playing) {
            return
        }

        let nextString, nextIndex
        if (this.mode == 'random') {
            let availableStrings = new Set(this.stringNames)
            availableStrings.delete(this.lastPlayedString)
            nextString = [...availableStrings][random(availableStrings.size - 1)]
            
            nextIndex = random(this.sounds[nextString].length - 1)

            console.log(`Playing ${nextString}${nextIndex}`)
        } else if (this.mode == 'randomUpDown') {

        }

        let sound = this.sounds[nextString][nextIndex]
        sound.play()
        this.lastPlayedString = nextString
        this.timeoutNextSound()
    }
}