import obstacleHooks from './obstacleHooks.js'
import playerHooks from './playerHooks.js'
import boxHooks from './boxHooks.js'


export default (state, renderer) => {
    return {
        'PlayerCharacter': playerHooks(state, renderer),
        'Obstacle': obstacleHooks(state, renderer),
        'Box': boxHooks(state, renderer)
    }
}
