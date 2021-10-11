import floorHooks from './floorHooks.js'
import obstacleHooks from './obstacleHooks.js'
import playerHooks from './playerHooks.js'
import boxHooks from './boxHooks.js'
import artHooks from './artHooks.js'
import portalHooks from './portalHooks.js'
import flowerHooks from './flowerHooks.js'


export default (state, renderer) => {
    return {
        'PlayerCharacter': playerHooks(state, renderer),
        'Obstacle': obstacleHooks(state, renderer),
        'Portal': portalHooks(state, renderer),
        'Box': boxHooks(state, renderer),
        'Art': artHooks(state, renderer),
        'Floor': floorHooks(state, renderer),
        'Flower': flowerHooks(state, renderer)
    }
}
