import CollisionSystem from './CollisionSystem.js'
import { update as updateWeapon } from './weapon.js'

export default (entity, command, obstacles, boxes) => {
    if (!entity.isAlive) {
        return
    }

    // rotation (not important to movement, purely aesthetic)
    entity.rotation = command.rotation
    
    const maxPower = 0.2;
    const maxReverse = 0.0375;
    const powerFactor = 0.005;
    const reverseFactor = 0.0005;

    const drag = 0.95;
    const angularDrag = 0.95;

    // movement logic
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

    //console.log(entity.delta);

    // readjusts this entities position by uncolliding it from obstacles
    CollisionSystem.moveWithCollisions(entity, obstacles, boxes)

    // advances the weapon-related timer(s)
    updateWeapon(entity, command.delta)
}