import Box from '../common/entity/Box.js'
import p2 from 'p2'

// setup a few boxes
export default (instance, world, room, boxes) => {

    const circleMaterial = new p2.Material();
    const wallMaterial = new p2.Material();

    
    const roomX = room.x
    const roomY = room.y
    const roomWidth = room.width
    const roomHeight = room.height
    const borderWidth = room.wallThickness

    let holes = room.holes
    let index = 0

    holes.forEach(hole => {
        if(hole.width > 0) {
            if(index == 0) {
                let width
                if(hole.width >= roomWidth) {
                    width = 0
                } else if (hole.width > 0) {
                    width = hole.offset + borderWidth*2
                } 
                let topWall1 = new Box({ 
                    x: roomX - borderWidth - 1, 
                    y: roomY - borderWidth - 1, 
                    width: width, 
                    height: borderWidth, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(topWall1)
                world.addBody(topWall1.body)
                boxes.set(topWall1.nid, topWall1)

                if(hole.width >= roomWidth) {
                    width = 0
                } else {
                    width = roomWidth + borderWidth - (hole.offset + hole.width)
                }
                let topWall2 = new Box({ 
                    x: roomX + (hole.offset + hole.width), 
                    y: roomY - borderWidth - 1, 
                    width: width, 
                    height: borderWidth, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(topWall2)
                world.addBody(topWall2.body)
                boxes.set(topWall2.nid, topWall1)


            } else if (index == 1) {
                let height
                if(hole.width > 0) {
                    height = hole.offset + borderWidth*2
                } else {
                    height = 0
                }
                let rightWall1 = new Box({ 
                    x: roomX + roomWidth, 
                    y: roomY, 
                    width: borderWidth, 
                    height: height, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(rightWall1)
                world.addBody(rightWall1.body)
                boxes.set(rightWall1.nid, rightWall1)

                if(hole.width >= roomHeight) {
                    height = 0
                } else {
                    height = roomHeight + borderWidth - (hole.offset + hole.width)
                }
                let rightWall2 = new Box({ 
                    x: roomX + roomWidth, 
                    y:  roomY + (hole.offset + hole.width), 
                    width: borderWidth, 
                    height: height,
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(rightWall2)
                world.addBody(rightWall2.body)
                boxes.set(rightWall2.nid, rightWall2)

            } else if (index == 2) {
                let width
                if(hole.width >= roomWidth) {
                    width = 0
                } else if (hole.width > 0) {
                    width = hole.offset + borderWidth*2
                }
                let bottomWall = new Box({ 
                    x: roomX - borderWidth, 
                    y: roomHeight + roomY, 
                    width: width, 
                    height: borderWidth, 
                    border: borderWidth,
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(bottomWall)
                world.addBody(bottomWall.body)
                boxes.set(bottomWall.nid, bottomWall)


                if(hole.width >= roomWidth) {
                    width = 0
                } else {
                    width = roomWidth - (hole.offset + hole.width)
                }
                let bottomWall2 = new Box({ 
                    x: roomX + (hole.offset + hole.width) + borderWidth, 
                    y: roomHeight + roomY, 
                    width: width, 
                    height: borderWidth, 
                    border: borderWidth,
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(bottomWall2)
                world.addBody(bottomWall2.body)
                boxes.set(bottomWall2.nid, bottomWall2)
                
            } else if (index == 3) {

                let height
                if(hole.width > 0) {
                    height = hole.offset + borderWidth
                } else {
                    height = 0
                }
                let leftWall = new Box({ 
                    name: 'leftWall', 
                    x: roomX - borderWidth - 1, 
                    y: roomY, 
                    width: borderWidth, 
                    height: height,
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(leftWall)
                world.addBody(leftWall.body)
                boxes.set(leftWall.nid, leftWall)
                
                if(hole.width >= roomHeight) {
                    height = 0
                } else {
                    height = roomHeight + borderWidth - (hole.offset + hole.width)
                }
                let leftWall2 = new Box({ 
                    name: 'leftWall', 
                    x: roomX - borderWidth - 1, 
                    y: roomY + (hole.offset + hole.width), 
                    width: borderWidth, 
                    height: height, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(leftWall2)
                world.addBody(leftWall2.body)
                boxes.set(leftWall2.nid, leftWall2)

            }

        } else {
            if(index == 0) {
                let topWall = new Box({ 
                    x: roomX - borderWidth - 1, 
                    y: roomY - borderWidth - 1, 
                    width: roomWidth + borderWidth*2, 
                    height: borderWidth, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(topWall)
                world.addBody(topWall.body)
                boxes.set(topWall.nid, topWall)

            } else if (index == 1) {
                let rightWall = new Box({ 
                    x: roomX + roomWidth, 
                    y: roomY, 
                    width: borderWidth, 
                    height: roomHeight, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(rightWall)
                world.addBody(rightWall.body)
                boxes.set(rightWall.nid, rightWall)

            } else if (index == 2) {
                let bottomWall = new Box({ 
                    x: roomX - borderWidth, 
                    y: roomHeight + roomY, 
                    width: roomWidth + (borderWidth*2), 
                    height: borderWidth, 
                    border: borderWidth,
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(bottomWall)
                world.addBody(bottomWall.body)
                boxes.set(bottomWall.nid, bottomWall)

            } else if (index == 3) {
                let leftWall = new Box({ 
                    name: 'leftWall', 
                    x: roomX - borderWidth - 1, 
                    y: roomY, 
                    width: borderWidth, 
                    height: roomHeight, 
                    mass: 0, 
                    spin: 0, 
                    material: wallMaterial 
                })
                instance.addEntity(leftWall)
                world.addBody(leftWall.body)
                boxes.set(leftWall.nid, leftWall)

            }
            
        }
        index++
    });


    
    var touch = new p2.ContactMaterial(circleMaterial, wallMaterial, {
        friction: 1,
        restitution: 0.5
    });

    world.addContactMaterial(touch);

    return boxes
}