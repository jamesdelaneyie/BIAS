import Obstacle from '../common/entity/Obstacle.js'

// setup a few obstacles
export default (instance, room) => {

    const obstacles = new Map()

    /*const obsA = new Obstacle({ x: 150, y: 150, width: 250, height: 150 })
    instance.addEntity(obsA)
    obstacles.set(obsA.nid, obsA)

    const obsB = new Obstacle({ x: 450, y: 600, width: 60, height: 150 })
    instance.addEntity(obsB)
    obstacles.set(obsB.nid, obsB)*/

    const roomWidth = room.width
    const roomHeight = room.height
    const borderWidth = room.borderWidth


    const topWall = new Obstacle({ x: 0, y: 0, width: roomWidth, height: borderWidth })
    instance.addEntity(topWall)
    obstacles.set(topWall.nid, topWall)

   const rightWall = new Obstacle({ x: roomWidth, y: 0, width: borderWidth, height: roomHeight  + borderWidth })
    instance.addEntity(rightWall)
    obstacles.set(rightWall.nid, rightWall)

    const leftWall = new Obstacle({ x: 0, y: 0, width: borderWidth, height: roomHeight })
    instance.addEntity(leftWall)
    obstacles.set(leftWall.nid, leftWall)

    const bottomWall = new Obstacle({ x: 0, y: roomHeight, width: roomWidth, height: borderWidth})
    instance.addEntity(bottomWall)
    obstacles.set(bottomWall.nid, bottomWall)

    return obstacles
}