import MoveCommand from '../common/command/MoveCommand.js'
import FireCommand from '../common/command/FireCommand.js'
import SpeakCommand from '../common/command/SpeakCommand.js'
import RespawnCommand from '../common/command/RespawnCommand.js'
import JoinCommand from '../common/command/JoinCommand.js'
import applyCommand from '../common/applyCommand.js'
import { fire } from '../common/weapon.js'
import handleShot from './handleShot.js'
import isMobile from 'ismobilejs'

const handleInput = (inputSystem, state, client, renderer, delta) => {

    const input = inputSystem.frameState
    inputSystem.releaseKeys()

    const { myRawEntity, obstacles, boxes, floors} = state

    //console.log(renderer.stage.children[1]);

   



    if (myRawEntity) {
        // which way are we pointing?
        const worldCoord = renderer.toWorldCoordinates(
            inputSystem.currentState.mx, 
            inputSystem.currentState.my
        )
        const dx = worldCoord.x - myRawEntity.x
        const dy = worldCoord.y - myRawEntity.y
        const rotation = Math.atan2(dy, dx)

        /* begin movement */
        var rotationAmount = rotation
        if(isMobile(window.navigator).any === true) {
            rotationAmount = input.rotation
        }
        const moveCommand = new MoveCommand(input.w, input.a, input.s, input.d, rotationAmount, delta)
        client.addCommand(moveCommand)


        if(input.message != "") {
            const speakCommand = new SpeakCommand(input.message, myRawEntity.x, myRawEntity.y)
            client.addCommand(speakCommand)
        }

        if(input.r == true) {
            const respawnCommand = new RespawnCommand(true)
            client.addCommand(respawnCommand)
        }
       
        // apply moveCommand  to our local entity
        applyCommand(myRawEntity, moveCommand, obstacles, boxes)

        // save the result of applying the command as a prediction
        const prediction = {
            nid: myRawEntity.nid,
            x: myRawEntity.x,
            y: myRawEntity.y,
            protocol: myRawEntity.protocol
        }
        client.addCustomPrediction(client.tick, prediction, ['x', 'y'])

        // also apply the result of the prediction to the graphical entity
        const graphics = client.graphicalEntities.get(prediction.nid)
        graphics.x = prediction.x
        graphics.y = prediction.y
        graphics.playerBody.rotation = rotationAmount
       
        // make the camera look at our entity
        renderer.centerCamera(graphics)
        /* end movement */

        /* shooting */
        if (input.mouseDown) {
            if (fire(myRawEntity)) {
                // send shot to the server
                client.addCommand(new FireCommand(worldCoord.x, worldCoord.y))
                // draw a predicted shot locally
                handleShot(myRawEntity.x, myRawEntity.y, worldCoord.x, worldCoord.y, state.obstacles, renderer)
            }
        }
    } else {

        if(input.spacebar == true) {
            //client.addCommand(new JoinCommand(input.message, 'Red'))
        }

    }
}

export default handleInput