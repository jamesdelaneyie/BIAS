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
    
        /*
    

    
    // Add objects to the room
    /*const objects = room.objects
    console.log(objects);

    objects.forEach(object => {
        console.log(object.name)
        let objectProps = new Box({
            name: object.name,
            x: object.x + room.x,
            y: object.y + room.y,
            width: object.w,
            height: object.h,
            mass: object.mass,
            color: object.color,
            spin: 0, 
            material: wallMaterial 
        })
        instance.addEntity(objectProps)
        world.addBody(objectProps.body)
        boxes.set(objectProps.nid, objectProps)
    });*/




    


    /*onst BoxD = new Box({ name: 'Floor', x: 0, y: 1000, width: 1000, height: 20, color: "#0000ff", mass: 0, spin: 0, material: wallMaterial })
    instance.addEntity(BoxD)
    world.addBody(BoxD.body)
    boxes.set(BoxD.nid, BoxD)*/


    /*const BoxA = new Box({ x: 400, y: 400, width: 200, height: 200, color: 0xffffff, mass: 1, spin: 1, material: circleMaterial})
    instance.addEntity(BoxA)
    world.addBody(BoxA.body)
    boxes.set(BoxA.nid, BoxA)
    
    const BoxB = new Box({ x: 800, y: 800, width: 50, height: 50, color: 0xffffff, mass: 1, spin: 0, material: circleMaterial})
    instance.addEntity(BoxB)
    world.addBody(BoxB.body)
    boxes.set(BoxB.nid, BoxB)*/

    
    /**/



   /* const BoxF = new Box({ name: 'Floor2', x: 0, y: 0, width: 20, height: 1000, color: "#ffffff", mass: 0, spin: 0, material: wallMaterial })
    instance.addEntity(BoxF)
    world.addBody(BoxF.body)
    boxes.set(BoxF.nid, BoxF)
*/
   

    /*const BoxC = new Box({ name: 'gallery', x: 200, y: 500, width: 100, height: 100, color: "#000000", mass: 1, spin: 0, material: wallMaterial })
    instance.addEntity(BoxC)
    world.addBody(BoxC.body)
    boxes.set(BoxC.nid, BoxC)*/

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

    /*setInterval(function(){
        let BoxE = new Box({ name: 'science', x: 300, y: 200, width: 101, height: 100, radius: 70, color: "#1A171B", mass: 1, spin: 0, material: wallMaterial })
        instance.addEntity(BoxE)
        world.addBody(BoxE.body)
        boxes.set(BoxE.nid, BoxE)
    }, 3000)*/

    var touch = new p2.ContactMaterial(circleMaterial, wallMaterial, {
        friction: 0,
        restitution: 0.1,
        surfaceVelocity: 10
    });

    world.addContactMaterial(touch);

    return boxes
}