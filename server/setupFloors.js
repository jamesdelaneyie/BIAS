import Floor from '../common/entity/Floor.js'

export default (instance, room) => {

    const floor = new Floor({ 
        x: room.x, 
        y: room.y, 
        width: room.width, 
        height: room.height, 
        floorColor: room.floorColor,
        gridGap: room.gridGap,
        gridColor: room.gridColor
    })
    instance.addEntity(floor)

}