import nengi from 'nengi'

class SpeakCommand {
    constructor(words, x, y) {
        this.text = words
        this.x = x
        this.y = y
    }
}

SpeakCommand.protocol = {
    text: nengi.String,
    x: nengi.Int32,
    y: nengi.Int32
}

export default SpeakCommand
