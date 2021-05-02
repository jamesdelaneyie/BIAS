import CollisionSystem from './CollisionSystem.js'
import { update as updateWeapon } from './weapon.js'

export default (entity, command, obstacles, boxes) => {
    if (!entity.isAlive) {
        return
    }
    
    // rotation (not important to movement, purely aesthetic)
    entity.rotation = command.rotation
    
    const maxPower = 1;
    const maxReverse = 0.0375;
    
    const reverseFactor = 0.0005;

    const drag = 0.95;
    const angularDrag = 0.95;

    // movement logic
    let unitX = 0
    let unitY = 0

    entity.footDown = false

    // create forces from input 
    if (command.forward) { 
        unitY -= 1 
        entity.footDown = true
    }

    if (command.backward) { 
        unitY += 1
        entity.footDown = true
    }

    if (command.left) { 
        unitX -= 1 
        entity.footDown = true
    }

    if (command.right) { 
        unitX += 1
        entity.footDown = true
    }

    // normalize
    const len = Math.sqrt(unitX * unitX + unitY * unitY)
    if (len > 0) {
        unitX = unitX / len
        unitY = unitY / len
    }

    const powerFactor = 0.1;
    if (entity.footDown) {
        entity.power += powerFactor * entity.footDown;
    } else {
        entity.power -= powerFactor;
    }

    entity.power = Math.max(0, Math.min(maxPower, entity.power));

    //console.log(entity.footDown)
    //console.log(entity.power)

    entity.x += unitX * (entity.speed * entity.power) * command.delta
    entity.y += unitY * (entity.speed * entity.power) * command.delta
    //entity.rotation = 
    //console.log(entity.delta);

    // readjusts this entities position by uncolliding it from obstacles
    CollisionSystem.moveWithCollisions(entity, obstacles, boxes)

    // advances the weapon-related timer(s)
    updateWeapon(entity, command.delta)
}