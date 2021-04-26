import Obstacle from '../common/entity/Obstacle.js'

// setup a few obstacles
export default (instance) => {

    const obstacles = new Map()

    const obsA = new Obstacle({ x: 150, y: 150, width: 250, height: 150 })
    instance.addEntity(obsA)
    obstacles.set(obsA.nid, obsA)

    const obsB = new Obstacle({ x: 450, y: 600, width: 60, height: 150 })
    instance.addEntity(obsB)
    obstacles.set(obsB.nid, obsB)

    const topWall = new Obstacle({ x: 0, y: 0, width: 1000, height: 20 })
    instance.addEntity(topWall)
    obstacles.set(topWall.nid, topWall)

    const leftWall = new Obstacle({ x: 0, y: 0, width: 20, height: 1000 })
    instance.addEntity(leftWall)
    obstacles.set(leftWall.nid, leftWall)

    const rightWall = new Obstacle({ x: 1000, y: 0, width: 20, height: 1000 })
    instance.addEntity(rightWall)
    obstacles.set(rightWall.nid, rightWall)

    const bottomWall = new Obstacle({ x: 0, y: 1000, width: 1000, height: 20 })
    instance.addEntity(bottomWall)
    obstacles.set(bottomWall.nid, bottomWall)

    return obstacles
}