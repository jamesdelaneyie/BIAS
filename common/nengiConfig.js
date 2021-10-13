import nengi from 'nengi'
import PlayerCharacter from './entity/PlayerCharacter.js'
import Identity from './message/Identity.js'
import WeaponFired from './message/WeaponFired.js'

import Walking from './message/Walking.js'
import Hitting from './message/Hitting.js'
import Notification from './message/Notification.js'

import MoveCommand from './command/MoveCommand.js'
import FireCommand from './command/FireCommand.js'
import SpeakCommand from './command/SpeakCommand.js'
import JoinCommand from './command/JoinCommand.js'
import LeaveCommand from './command/LeaveCommand.js'
import ToggleCommand from './command/ToggleCommand.js'

import Obstacle from './entity/Obstacle.js'
import Box from './entity/Box.js'
import Floor from './entity/Floor.js'
import Portal from './entity/Portal.js'
import Flower from './entity/Flower.js'
import Art from './entity/Art.js'
import InfoPanel from './entity/InfoPanel.js'

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
            ['Box', Box],
            ['Art', Art],
            ['Portal', Portal],
            ['Flower', Flower],
            ['InfoPanel', InfoPanel]
        ],
        localMessages: [
            ['Walking', Walking],
            ['Hitting', Hitting]
        ],
        messages: [
            ['Identity', Identity],
            ['WeaponFired', WeaponFired],
            ['Notification', Notification]
        ],
        commands: [
            ['MoveCommand', MoveCommand],
            ['FireCommand', FireCommand],
            ['SpeakCommand', SpeakCommand],
            ['JoinCommand', JoinCommand],
            ['LeaveCommand', LeaveCommand],
            ['ToggleCommand', ToggleCommand]
        ],
        basics: []
    }
}

export default config