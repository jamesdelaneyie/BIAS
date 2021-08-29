import nengi from 'nengi'

class SpeakCommand {
    constructor(words, type, x, y) {
        this.text = words
        this.type = type
        this.x = x
        this.y = y
    }
}

SpeakCommand.protocol = {
    text: nengi.String,
    type: nengi.String,
    x: nengi.Int32,
    y: nengi.Int32
}

export default SpeakCommand
