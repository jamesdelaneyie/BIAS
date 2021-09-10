import Floor from '../common/entity/Floor.js'

export default (instance, room) => {

    const floors = new Map()

    const floor = new Floor({ 
        x: room.x, 
        y: room.y, 
        width: room.width, 
        height: room.height, 
        floorColor: room.floorColor,
        wallColor: room.wallColor,
        gridColor: room.gridColor
    })
    instance.addEntity(floor)
    floors.set(floor.nid, floor)

    return floors
}