import Obstacle from '../common/entity/Obstacle.js'

export default (instance, room, obstacles, type) => {

    let roomX = room.x
    let roomY = room.y 
    let roomWidth = room.width
    let roomHeight = room.height
    let borderWidth = room.wallThickness
    let backgroundColor = room.wallColor
    let obstacleType = type

    let holes = room.holes
    let index = 0

    //console.log(obstacleType)

    holes.forEach(hole => {
        if(hole.width > 0) {
            if(index == 0) {
                let width
                if(hole.width >= roomWidth) {
                    width = 0
                } else if (hole.width > 0) {
                    width = hole.offset + borderWidth*2
                } 
                let topWall1 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX - borderWidth -1, 
                    y: roomY - borderWidth -1, 
                    width: width, 
                    height: borderWidth, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(topWall1)
                obstacles.set(topWall1.nid, topWall1)

                if(hole.width >= roomWidth) {
                    width = 0
                } else {
                    width = roomWidth + borderWidth - (hole.offset + hole.width)
                }
                let topWall2 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX + (hole.offset + hole.width), 
                    y: roomY - borderWidth -1, 
                    width: width, 
                    height: borderWidth, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(topWall2)
                obstacles.set(topWall2.nid, topWall2)

            } else if (index == 1) {
                let height
                if(hole.width > 0) {
                    height = hole.offset + borderWidth*2
                } else {
                    height = 0
                }
                let rightWall1 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX + roomWidth, 
                    y: roomY - borderWidth, 
                    width: borderWidth, 
                    height: height, 
                    border: borderWidth,
                    color: backgroundColor 
                })
                instance.addEntity(rightWall1)
                obstacles.set(rightWall1.nid, rightWall1)

                if(hole.width >= roomHeight) {
                    height = 0
                } else {
                    height = roomHeight + borderWidth - (hole.offset + hole.width)
                }
                let rightWall2 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX + roomWidth, 
                    y: roomY + (hole.offset + hole.width), 
                    width: borderWidth, 
                    height: height, 
                    border: borderWidth,
                    color: backgroundColor 
                })
                instance.addEntity(rightWall2)
                obstacles.set(rightWall2.nid, rightWall2)

            } else if (index == 2) {
                let width
                if(hole.width >= roomWidth) {
                    width = 0
                } else {
                    width = hole.offset + borderWidth*2
                }
                let bottomWall1 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX - borderWidth - 1, 
                    y: roomHeight + roomY, 
                    width: width, 
                    height: borderWidth, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(bottomWall1)
                obstacles.set(bottomWall1.nid, bottomWall1)

                if(hole.width >= roomWidth) {
                    width = 0
                } else {
                    width = roomWidth - (hole.offset + hole.width)
                }
                let bottomWall2 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX + (hole.offset + hole.width) + borderWidth, 
                    y: roomHeight + roomY, 
                    width: width, 
                    height: borderWidth, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(bottomWall2)
                obstacles.set(bottomWall2.nid, bottomWall2)

            } else if (index == 3) {

                let height
                if(hole.width >= roomWidth) {
                    height = 0
                } else {
                    height = hole.offset + borderWidth*2
                }
                let leftWall1 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX  - borderWidth - 1,
                    y: roomY - borderWidth,
                    width: borderWidth,
                    height: height, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(leftWall1)
                obstacles.set(leftWall1.nid, leftWall1)
                
                if(hole.width >= roomHeight) {
                    height = 0
                } else {
                    height = roomHeight + borderWidth - (hole.offset + hole.width)
                }
                let leftWall2 = new Obstacle({ 
                    name: obstacleType,
                    x: roomX  - borderWidth - 1,
                    y: roomY + (hole.offset + hole.width), 
                    width: borderWidth,
                    height: height, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(leftWall2)
                obstacles.set(leftWall2.nid, leftWall2)

            }

        } else {
            if(index == 0) {
                let topWall = new Obstacle({ 
                    name: obstacleType,
                    x: roomX - borderWidth -1, 
                    y: roomY - borderWidth -1, 
                    width: roomWidth + borderWidth*2, 
                    height: borderWidth, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(topWall)
                obstacles.set(topWall.nid, topWall)

            } else if (index == 1) {
                let rightWall = new Obstacle({ 
                    name: obstacleType,
                    x: roomX + roomWidth, 
                    y: roomY - borderWidth, 
                    width: borderWidth, 
                    height: roomHeight + borderWidth,
                    border: borderWidth,
                    color: backgroundColor 
                })
                instance.addEntity(rightWall)
                obstacles.set(rightWall.nid, rightWall)

            } else if (index == 2) {
                let bottomWall = new Obstacle({ 
                    name: obstacleType,
                    x: roomX - borderWidth - 1, 
                    y: roomHeight + roomY, 
                    width: roomWidth + borderWidth*2 + 1, 
                    height: borderWidth, 
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(bottomWall)
                obstacles.set(bottomWall.nid, bottomWall)

            } else if (index == 3) {
                let leftWall = new Obstacle({ 
                    name: obstacleType,
                    x: roomX  - borderWidth - 1,
                    y: roomY - borderWidth,
                    width: borderWidth,
                    height: roomHeight + (borderWidth*1),
                    border: borderWidth,
                    color: backgroundColor
                })
                instance.addEntity(leftWall)
                obstacles.set(leftWall.nid, leftWall)

            }
            
        }
        index++
    });
    

   
    


    return obstacles
}