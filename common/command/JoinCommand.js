import nengi from 'nengi'

class JoinCommand {
    constructor(name, avatar) {
        this.name = name
        this.avatar = avatar
    }
}

JoinCommand.protocol = {
    name: nengi.String,
    avatar: nengi.String
}

export default JoinCommand
