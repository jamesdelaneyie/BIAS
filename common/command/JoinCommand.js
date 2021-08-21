import nengi from 'nengi'

class JoinCommand {
    constructor(name, color) {
        this.name = name
        this.color = color
    }
}

JoinCommand.protocol = {
    name: nengi.String,
    color: nengi.String
}

export default JoinCommand
