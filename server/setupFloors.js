import Floor from '../common/entity/Floor.js'

export default (instance, room) => {

    const floors = new Map()

    let roomX = room.x
    let roomY = room.y 
    let roomWidth = room.width
    let roomHeight = room.height
    let roomColor = room.color

    if(!roomX == 0) {
        roomX = roomX/2
    }
    if(!roomY == 0) {
        roomY = roomY/2
    }

    const floor = new Floor({ 
        x: roomX, 
        y: roomY, 
        width: roomWidth, 
        height: roomHeight, 
        color: roomColor
    })
    instance.addEntity(floor)
    floors.set(floor.nid, floor)

    return floors
}