import nengi from 'nengi'
import PlayerCharacter from './entity/PlayerCharacter.js'
import Identity from './message/Identity.js'
import WeaponFired from './message/WeaponFired.js'
import Notification from './message/Notification.js'
import MoveCommand from './command/MoveCommand.js'
import FireCommand from './command/FireCommand.js'
import SpeakCommand from './command/SpeakCommand.js'
import RespawnCommand from './command/RespawnCommand.js'
import JoinCommand from './command/JoinCommand.js'
import Obstacle from './entity/Obstacle.js'
import Box from './entity/Box.js'
import Floor from './entity/Floor.js'

const config = {
    UPDATE_RATE: 20, 

    ID_BINARY_TYPE: nengi.UInt16,
    TYPE_BINARY_TYPE: nengi.UInt8, 

    ID_PROPERTY_NAME: 'nid',
    TYPE_PROPERTY_NAME: 'ntype', 

    USE_HISTORIAN: true,
    HISTORIAN_TICKS: 40,

    protocols: {
        entities: [
            ['Floor', Floor],
            ['PlayerCharacter', PlayerCharacter],
            ['Obstacle', Obstacle],
            ['Box', Box]
        ],
        localMessages: [],
        messages: [
            ['Identity', Identity],
            ['WeaponFired', WeaponFired],
            ['Notification', Notification]
        ],
        commands: [
            ['MoveCommand', MoveCommand],
            ['FireCommand', FireCommand],
            ['SpeakCommand', SpeakCommand],
            ['RespawnCommand', RespawnCommand],
            ['JoinCommand', JoinCommand]
        ],
        basics: []
    }
}

export default config