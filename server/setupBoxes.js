import Box from '../common/entity/Box.js'
import p2 from 'p2'

// setup a few boxes
export default (instance, world, room, boxes) => {



    const circleMaterial = new p2.Material();
    const wallMaterial = new p2.Material();

    //Build Room: walls 
    const roomX = room.x
    const roomY = room.y
    const roomWidth = room.width
    const roomHeight = room.height
    const borderWidth = room.borderWidth
    const borderColor = room.borderColor


   const topWall = new Box({ 
        name: 'topWall', 
        x: roomX, 
        y: roomY, 
        width: roomWidth, 
        height: borderWidth, 
        color: borderColor, 
        mass: 0, 
        spin: 0, 
        material: wallMaterial 
    })
    instance.addEntity(topWall)
    world.addBody(topWall.body)
    boxes.set(topWall.nid, topWall)


    const rightWall = new Box({ 
        name: 'rightWall', 
        x: roomX + roomWidth - borderWidth, 
        y: roomY, 
        width: borderWidth, 
        height: roomHeight, 
        color: borderColor, 
        mass: 0, 
        spin: 0, 
        material: wallMaterial 
    })
    instance.addEntity(rightWall)
    world.addBody(rightWall.body)
    boxes.set(rightWall.nid, rightWall)


    const bottomWall = new Box({ 
        name: 'bottomWall', 
        x: roomX, 
        y: roomY + roomHeight - borderWidth, 
        width: roomWidth, 
        height: borderWidth, 
        color: borderColor, 
        mass: 0, 
        spin: 0, 
        material: wallMaterial 
    })
    instance.addEntity(bottomWall)
    world.addBody(bottomWall.body)
    boxes.set(bottomWall.nid, bottomWall)


    const leftWall = new Box({ 
        name: 'leftWall', 
        x: roomX, 
        y: roomY, 
        width: borderWidth, 
        height: roomHeight - borderWidth, 
        color: borderColor, 
        mass: 0, 
        spin: 0, 
        material: wallMaterial 
    })
    instance.addEntity(leftWall)
    world.addBody(leftWall.body)
    boxes.set(leftWall.nid, leftWall)
    
    

    
    //Add objects to the room
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

    world.addContactMaterial(touch);

    return boxes
}