import nengi from 'nengi'

class ToggleCommand {
    constructor(boolean, type) {
        this.boolean = boolean
        this.type = type
    }
}

ToggleCommand.protocol = {
    boolean: nengi.Boolean,
    type: nengi.String
}

export default ToggleCommand
