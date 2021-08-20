import Obstacle from '../common/entity/Obstacle.js'

// setup a few obstacles
export default (instance, room) => {

    const obstacles = new Map()

    let roomX = room.x
    let roomY = room.y 
    let roomWidth = room.width
    let roomHeight = room.height
    let borderWidth = room.borderWidth
    let backgroundColor = room.backgroundColor

    const topWall = new Obstacle({ 
        x: roomX, 
        y: roomY, 
        width: roomWidth + borderWidth, 
        height: borderWidth, 
        border: borderWidth,
        color: backgroundColor
    })
    instance.addEntity(topWall)
    obstacles.set(topWall.nid, topWall)

    const rightWall = new Obstacle({ 
        x: roomX + roomWidth + borderWidth, 
        y: roomY, 
        width: borderWidth, 
        height: roomHeight + borderWidth,
        border: borderWidth,
        color: backgroundColor 
        })
    instance.addEntity(rightWall)
    obstacles.set(rightWall.nid, rightWall)

    const bottomWall = new Obstacle({ 
        x: roomX, 
        y: roomHeight + (borderWidth) + roomY, 
        width: roomWidth + (borderWidth*2), 
        height: borderWidth, 
        border: borderWidth,
        color: backgroundColor
    })
    instance.addEntity(bottomWall)
    obstacles.set(bottomWall.nid, bottomWall)

    const leftWall = new Obstacle({ 
        x: roomX,
        y: roomY,
        width: borderWidth,
        height: roomHeight + (borderWidth),
        border: borderWidth,
        color: backgroundColor
    })
    instance.addEntity(leftWall)
    obstacles.set(leftWall.nid, leftWall)

 

    return obstacles
}