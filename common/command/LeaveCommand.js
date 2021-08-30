import nengi from 'nengi'

class LeaveCommand {
    constructor(name) {
        this.name = name
    }
}

LeaveCommand.protocol = {
    name: nengi.String,
}

export default LeaveCommand
