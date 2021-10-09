import nengi from 'nengi'

class FireCommand {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }
}

FireCommand.protocol = {
    x: nengi.Int32,
    y: nengi.Int32,
    color: nengi.String
}

export default FireCommand
