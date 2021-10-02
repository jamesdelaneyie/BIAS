import Box from '../common/entity/Box.js'
import p2 from 'p2'

// setup a few boxes
export default (instance, world, room, boxes) => {

    const circleMaterial = new p2.Material();
    const wallMaterial = new p2.Material();

    const roomX = room.x
    const roomY = room.y

    const objects = room.objects
    if(objects) {
        objects.forEach(object => {
            //.log(object.name)
            let objectProps = new Box({
                name: object.name,
                type: object.type,
                x: object.x + roomX,
                y: object.y + roomY,
                width: object.width,
                height: object.height,
                mass: object.mass,
                color: object.color,
                material: wallMaterial 
            })
            instance.addEntity(objectProps)
            world.addBody(objectProps.body)
            boxes.set(objectProps.nid, objectProps)
        });
    }
    
    var touch = new p2.ContactMaterial(circleMaterial, wallMaterial, {
        friction: 1,
        restitution: 0.5
    });

    //world.addContactMaterial(touch);

    return boxes
}