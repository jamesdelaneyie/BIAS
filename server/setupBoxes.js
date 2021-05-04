import Box from '../common/entity/Box.js'
import p2 from 'p2'

// setup a few boxes
export default (instance, world) => {

    const boxes = new Map()

    const circleMaterial = new p2.Material();

    const wallMaterial = new p2.Material();
/*
    const BoxA = new Box({ x: 400, y: 400, width: 200, height: 200, color: 0xffffff, mass: 1, spin: 1, material: circleMaterial})
    instance.addEntity(BoxA)
    world.addBody(BoxA.body)
    boxes.set(BoxA.nid, BoxA)
    
    const BoxB = new Box({ x: 800, y: 800, width: 50, height: 50, color: 0xffffff, mass: 1, spin: 0, material: circleMaterial})
    instance.addEntity(BoxB)
    world.addBody(BoxB.body)
    boxes.set(BoxB.nid, BoxB)
*/
    const BoxC = new Box({ x: 0, y: 0, width: 100, height: 100, color: 0xffffff, mass: 1, spin: 0, material: wallMaterial })
    instance.addEntity(BoxC)
    world.addBody(BoxC.body)
    boxes.set(BoxC.nid, BoxC)

    var touch = new p2.ContactMaterial(circleMaterial, wallMaterial, {
        friction: 0,
        restitution: 0.5
    });

    world.addContactMaterial(touch);

    return boxes
}