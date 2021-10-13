import CollisionSystem from './CollisionSystem.js'
import { update as updateWeapon } from './weapon.js'

export default (entity, command, obstacles, boxes, artworks, infoPanels) => {
    
        /*if (!entity.isAlive) {
            return
        }*/
    
        //console.log(entity)
        entity.bodyRotation = command.rotation
        //entity.rotation = command.rotation

        //console.log(entity)

        let unitX = 0
        let unitY = 0
    
        // create forces from input
        if (command.forward) { unitY -= 1 }
        if (command.backward) { unitY += 1 }
        if (command.left) { unitX -= 1 }
        if (command.right) { unitX += 1 }
    
        // normalize
        const len = Math.sqrt(unitX * unitX + unitY * unitY)
        if (len > 0) {
            unitX = unitX / len
            unitY = unitY / len
        }
    
        entity.x += unitX * entity.speed * command.delta
        entity.y += unitY * entity.speed * command.delta

    // readjusts this entities position by uncolliding it from obstacles
    CollisionSystem.moveWithCollisions(entity, obstacles, boxes, artworks, infoPanels)

    // advances the weapon-related timer(s)
    //updateWeapon(entity, command.delta)
}