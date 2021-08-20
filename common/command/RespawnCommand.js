import nengi from 'nengi'

class respawnCommand {
    constructor(respawn) {
        this.respawn = nengi.Boolean
    }
}

respawnCommand.protocol = {
    respawn: nengi.Boolean
}

export default respawnCommand
