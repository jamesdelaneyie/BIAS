import CollisionSystem from '../common/CollisionSystem.js'
import drawHitscan from './graphics/drawHitscan.js'

const handleShot = (x, y, tx, ty, obstacles, renderer) => {
    let endX = tx
    let endY = ty

    obstacles.forEach(obstacle => {
        if(obstacle.collider.polygon) {
            var hitObstacle = CollisionSystem.checkLinePolygon(
                x, y, tx, ty, 
                obstacle.collider.polygon
            )
        } else {
            var  hitObstacle = CollisionSystem.checkLineCircle(
                x, y, tx, ty, 
                obstacle.collider.circle
            )
        }
        

        if (hitObstacle) {
            endX = hitObstacle.x
            endY = hitObstacle.y
        }
    })
    
    drawHitscan(renderer.background, x, y, endX, endY, 0xffffff)
}

export default handleShot