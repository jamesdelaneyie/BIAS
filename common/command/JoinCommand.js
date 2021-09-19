import nengi from 'nengi'

class JoinCommand {
    constructor(name, avatar, color) {
        this.name = name
        this.avatar = avatar
        this.color = color
    }
}

JoinCommand.protocol = {
    name: nengi.String,
    avatar: nengi.String,
    color: nengi.String
}

export default JoinCommand
