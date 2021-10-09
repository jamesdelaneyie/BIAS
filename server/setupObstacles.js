import Obstacle from '../common/entity/Obstacle.js'

// setup a few obstacles
export default (instance, room, obstacles) => {

    let roomX = room.x
    let roomY = room.y 
    let roomWidth = room.width
    let roomHeight = room.height
    let borderWidth = room.borderWidth
    let backgroundColor = room.wallColor
    let door = room.door
    let type = room.type

    if(room.type == "corridor") {

    } else {
        const topWall = new Obstacle({ 
            x: roomX - borderWidth, 
            y: roomY - borderWidth, 
            width: roomWidth + borderWidth, 
            height: borderWidth, 
            border: borderWidth,
            color: backgroundColor
        })
        instance.addEntity(topWall)
        obstacles.set(topWall.nid, topWall)
    }

    

    const rightWall = new Obstacle({ 
        x: roomX + roomWidth, 
        y: roomY - borderWidth, 
        width: borderWidth, 
        height: roomHeight + borderWidth,
        border: borderWidth,
        color: backgroundColor 
    })
    instance.addEntity(rightWall)
    obstacles.set(rightWall.nid, rightWall)

    const leftWall = new Obstacle({ 
        x: roomX  - borderWidth,
        y: roomY,
        width: borderWidth,
        height: roomHeight + (borderWidth),
        border: borderWidth,
        color: backgroundColor
    })
    instance.addEntity(leftWall)
    obstacles.set(leftWall.nid, leftWall)

    if(door == "bottom") {

        const bottomWallLeft = new Obstacle({ 
            x: roomX - borderWidth, 
            y: roomHeight + roomY, 
            width: (roomWidth/2) - 95, 
            height: borderWidth, 
            border: borderWidth,
            color: backgroundColor
        })
        instance.addEntity(bottomWallLeft)
        obstacles.set(bottomWallLeft.nid, bottomWallLeft)


        const bottomWallRight = new Obstacle({ 
            x: roomX + (roomWidth/2) + 100, 
            y: roomHeight + roomY, 
            width: (roomWidth/2) - 95, 
            height: borderWidth, 
            border: borderWidth,
            color: backgroundColor
        })
        instance.addEntity(bottomWallRight)
        obstacles.set(bottomWallRight.nid, bottomWallRight)

    } else {
        if(type != "corridor") {
            const bottomWall = new Obstacle({ 
                x: roomX - borderWidth, 
                y: roomHeight + roomY, 
                width: roomWidth + (borderWidth*2), 
                height: borderWidth, 
                border: borderWidth,
                color: backgroundColor
            })
            instance.addEntity(bottomWall)
            obstacles.set(bottomWall.nid, bottomWall)
        }

    }
   

    

 

    return obstacles
}