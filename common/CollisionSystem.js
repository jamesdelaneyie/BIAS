import SAT from 'sat'

const lineLine = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    //console.log('yo', x1, y1, x2, y2, x3, y3, x4, y4) 
    const axd = x2 - x1
    const ayd = y2 - y1
    const bxd = x4 - x3
    const byd = y4 - y3
    const cyd = y1 - y3
    const cxd = x1 - x3
    const de = byd * axd - bxd * ayd

    const rangeA = (bxd * cyd - byd * cxd) / de
    const rangeB = (axd * cyd - ayd * cxd) / de

    if (rangeA >= 0 && rangeA <= 1 && rangeB >= 0 && rangeB <= 1) {
        return {
            x: x1 + (rangeA * axd),
            y: y1 + (rangeA * ayd)
        }
    }
    return false
}

const distanceSquared = (x, y) => {
    return x * x + y * y
}

const response = new SAT.Response()

class CollisionSystem {
    constructor() {

    }
}





CollisionSystem.createPolygonCollider = (x, y, points) => {

    return {
        baseType: 'sat-polygon',
        polygon: new SAT.Polygon(new SAT.Vector(x, y), points), //.translate(-10, -10)

        get x() {
            return this.polygon.pos.x
        },
        set x(value) {
            this.polygon.pos.x = value
            this.polygon._recalc()
        },

        get y() {
            return this.polygon.pos.y
        },
        set y(value) {
            this.polygon.pos.y = value
        }
    }
}

CollisionSystem.createCircleCollider = (x, y, radius) => {
    return {
        baseType: 'sat-circle',
        circle: new SAT.Circle(new SAT.Vector(x, y), radius),

        get x() {
            return this.circle.pos.x
        },
        set x(value) {
            this.circle.pos.x = value
        },

        get y() {
            return this.circle.pos.y
        },
        set y(value) {
            this.circle.pos.y = value
        }
    }
}

CollisionSystem.createRectangleCollider = (x, y, width, height) => {
    return {
        baseType: 'sat-polygon',
        polygon: new SAT.Box(new SAT.Vector(x, y), width, height).toPolygon(),

        get x() {
            return this.polygon.pos.x
        },
        set x(value) {
            this.polygon.pos.x = value
            this.polygon._recalc()
        },

        get y() {
            return this.polygon.pos.y
        },
        set y(value) {
            this.polygon.pos.y = value
        }
    }
}


CollisionSystem.createRectangleColliderBox = (x, y, width, height) => {
    return {
        baseType: 'sat-polygon',
        polygon: new SAT.Box(new SAT.Vector(x, y), width, height).toPolygon(),

        get x() {
            return this.polygon.pos.x + (width/2)
        },
        set x(value) {
            this.polygon.pos.x = value - (width/2)
            this.polygon._recalc()
        },

        get y() {
            return this.polygon.pos.y + (height/2)
        },
        set y(value) {
            this.polygon.pos.y = value - (height/2)
        }
    }
}




CollisionSystem.moveWithCollisions = (entity, obstacles, boxes, artworks, infoPanels) => {

    if(obstacles) {
        obstacles.forEach(obstacle => {
            if(obstacle.name == "johannBlocker") {
               
                if(entity.floor == 1) {
                    if (SAT.testCircleCircle(entity.collider.circle, obstacle.collider.circle, response)) {
                        entity.x -= response.overlapV.x
                        entity.y -= response.overlapV.y
                    }
                } 
                
            } else if (obstacle.name == "johannInnerWall") {

                if(entity.floor == 1) {
                    if (SAT.testCirclePolygon(entity.collider.circle, obstacle.collider.polygon, response)) {
                        entity.x -= response.overlapV.x
                        entity.y -= response.overlapV.y
                    }
                } 
            
            } else if(obstacle.name == "stairsUp") {
                
            } else if(obstacle.name == "stairsDown") {
                
            } else {
                if (SAT.testCirclePolygon(entity.collider.circle, obstacle.collider.polygon, response)) {
                    entity.x -= response.overlapV.x
                    entity.y -= response.overlapV.y
                }
                
            }
            response.clear()
        })
    }
    
    if(boxes) {    
        boxes.forEach(box => {
            if(box.type == "particle") {

            } else {
                if (SAT.testCirclePolygon(entity.collider.circle, box.collider.polygon, response)) {
                    entity.x -= response.overlapV.x
                    entity.y -= response.overlapV.y
                }
            }
            response.clear()
        })
    }

    if(infoPanels) {
        infoPanels.forEach(infoPanel => {
            if(infoPanel.collider.polygon) {
                if (SAT.testCirclePolygon(entity.collider.circle, infoPanel.collider.polygon, response)) {
                    entity.x -= response.overlapV.x
                    entity.y -= response.overlapV.y
                }
                response.clear()
            } else {
                if (SAT.testCircleCircle(entity.collider.circle, infoPanel.collider.circle, response)) {
                    entity.x -= response.overlapV.x
                    entity.y -= response.overlapV.y
                }
                response.clear()
            }
            
        })
    }

    if(artworks) {
        artworks.forEach(artwork => {
            if(artwork.collider.polygon) {
                if (SAT.testCirclePolygon(entity.collider.circle, artwork.collider.polygon, response)) {
                    entity.x -= response.overlapV.x
                    entity.y -= response.overlapV.y
                }
                response.clear()
            } else {
                if(artwork.name == "<bold>DARK MATTERS</bold>\nJohann Diedrick" && entity.floor == 0) {

                } else if (artwork.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson" && entity.headphones == true) {

                } else {
                    if (SAT.testCircleCircle(entity.collider.circle, artwork.collider.circle, response)) {
                        entity.x -= response.overlapV.x
                        entity.y -= response.overlapV.y
                    }
                }
               
                response.clear()
            }
            
        })
    }


    
}


CollisionSystem.checkCirclePolygon = (circleCollider, polygonCollider, response) => {
    if(polygonCollider) {
        return SAT.testCirclePolygon(circleCollider, polygonCollider, response)
    } else {

    }
    
}

CollisionSystem.checkLineCircle = (x1, y1, x2, y2, circleCollider) => {
    const line = new SAT.Polygon(new SAT.Vector(), [
        new SAT.Vector(x1, y1),
        new SAT.Vector(x2, y2)
    ])
    return SAT.testCirclePolygon(circleCollider, line)
}

// not SAT!
// returns false or { x, y } of the first intersection point w/ the polygon
// if pierce is true returns an array of [{ x, y}, etc] of all intersections
CollisionSystem.checkLinePolygon = (x1, y1, x2, y2, polygonCollider, pierce = false) => {
    const intersections = []

    //console.log(polygonCollider)


    for (let i = 0; i < polygonCollider.points.length; i++) {
        const nextIndex = (i + 1 >= polygonCollider.points.length) ? 0 : i + 1

        const x3 = polygonCollider.points[i].x + polygonCollider.pos.x
        const y3 = polygonCollider.points[i].y + polygonCollider.pos.y
        const x4 = polygonCollider.points[nextIndex].x + polygonCollider.pos.x
        const y4 = polygonCollider.points[nextIndex].y + polygonCollider.pos.y

        const result = lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
        if (result) {
            intersections.push(result)
        }
    }

    if (pierce && intersections.length > 0) {
        return intersections
    } else if (pierce && intersections.length === 0) {
        return -1
    }

    let index = -1
    let previousDistance = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < intersections.length; i++) {
        const dist = distanceSquared(x1 - intersections[i].x, y1 - intersections[i].y)
        if (dist < previousDistance) {
            previousDistance = dist
            index = i
        }
    }

    if (index === -1) {
        return false
    } else {
        return intersections[index]
    }
}

export default CollisionSystem
