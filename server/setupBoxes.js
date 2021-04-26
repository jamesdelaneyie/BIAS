import Box from '../common/entity/Box.js'
import p2 from 'p2'

// setup a few boxes
export default (instance, world) => {

    const boxes = new Map()

    const BoxA = new Box({ x: 400, y: 400, width: 50, height: 50, color: 0xffffff })
    BoxA.x = 400
    instance.addEntity(BoxA)
    world.addBody(BoxA.body)
    boxes.set(BoxA.nid, BoxA)
    

    const BoxB = new Box({ x: 800, y: 800, width: 50, height: 50, color: 0xffffff })
    instance.addEntity(BoxB)
    world.addBody(BoxB.body)
    boxes.set(BoxB.nid, BoxB)

    var groundBody = new p2.Body({
        mass: 0,
        position: [0, 2000]
    });
    var groundShape = new p2.Plane();
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    return boxes
}