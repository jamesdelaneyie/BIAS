import SAT from 'sat'

export default (entity, obstacle) => {
    if (!entity.isAlive) {
        return
    }
    const response = new SAT.Response()
    let collided = false;
    collided = SAT.testCirclePolygon(entity.collider.circle, obstacle.collider.polygon, response) 
    if(collided == true) {
        obstacle.color = "#ffff00"
    }
}