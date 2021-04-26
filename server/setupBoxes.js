import Box from '../common/entity/Box.js'
import p2 from 'p2'

// setup a few boxes
export default (instance, world) => {

    const boxes = new Map()

    const BoxA = new Box({ x: 400, y: 400, width: 200, height: 200, color: 0xffffff, mass: 5, spin: 0.2})
    BoxA.x = 400
    instance.addEntity(BoxA)
    world.addBody(BoxA.body)
    boxes.set(BoxA.nid, BoxA)
    
    const BoxB = new Box({ x: 800, y: 800, width: 50, height: 50, color: 0xffffff, mass: 5, spin: 0})
    instance.addEntity(BoxB)
    world.addBody(BoxB.body)
    boxes.set(BoxB.nid, BoxB)

    const BoxC = new Box({ x: 500, y: 1000, width: 1000, height: 20, color: 0xffffff, mass: 0, spin: 0 })
    instance.addEntity(BoxC)
    world.addBody(BoxC.body)
    boxes.set(BoxC.nid, BoxC)

    return boxes
}