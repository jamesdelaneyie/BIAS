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
    const backgroundColor = room.backgroundColor

    //console.log(roomX)

    const topWall = new Box({ 
        name: 'topWall', 
        x: roomX + roomWidth/2, 
        y: roomY - borderWidth/2, 
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
        x: roomX + roomWidth + (borderWidth/2), 
        y: roomY + roomHeight/2, 
        width: borderWidth, 
        height: roomHeight + (borderWidth*2), 
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
        x: roomX + roomWidth/2, 
        y: roomY + roomHeight + (borderWidth/2), 
        width: roomWidth + (borderWidth*2), 
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
        x: roomX - (borderWidth/2), 
        y: roomY + roomHeight/2, 
        width: borderWidth, 
        height: roomHeight + borderWidth*2, 
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
            console.log(object.name)
            let objectProps = new Box({
                name: object.name,
                x: object.x + roomX,
                y: object.y + roomY,
                width: object.width,
                height: object.height,
                mass: object.mass,
                color: object.color,
                spin: 0, 
                material: wallMaterial 
            })
            instance.addEntity(objectProps)
            world.addBody(objectProps.body)
            boxes.set(objectProps.nid, objectProps)
        });
    }

    setInterval(function(){
        let newBox = new Box({ name: 'gallery', x: roomX+ 100, y: roomY + 200, width: 50, height: 50, color: "#ffffff", mass: 5, spin: 0.2, material: circleMaterial })
        instance.addEntity(newBox)
        world.addBody(newBox.body)
        boxes.set(newBox.nid, newBox)

        setTimeout(function(){
            instance.removeEntity(newBox)
            world.removeBody(newBox.body)
            boxes.delete(newBox.nid)
        }, 20000)
    }, 2000)
    


    var touch = new p2.ContactMaterial(circleMaterial, wallMaterial, {
        friction: 0,
        restitution: 0.1,
        surfaceVelocity: 10
    });

    world.addContactMaterial(touch);

    return boxes
}