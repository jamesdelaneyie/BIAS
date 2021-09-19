import MoveCommand from '../common/command/MoveCommand.js'
import FireCommand from '../common/command/FireCommand.js'
import SpeakCommand from '../common/command/SpeakCommand.js'
import applyCommand from '../common/applyCommand.js'
import { fire } from '../common/weapon.js'
import handleShot from './handleShot.js'
import isMobile from 'ismobilejs'
import * as PIXI from 'pixi.js'
import { Sound, filters } from '@pixi/sound'

const handleInput = (inputSystem, state, client, renderer, delta) => {

    const input = inputSystem.frameState
    inputSystem.releaseKeys()



    const { myRawEntity, obstacles, boxes } = state


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

        // apply moveCommand  to our local entity
        applyCommand(myRawEntity, moveCommand, obstacles, boxes)

        if (input.mouseDown) {
            const coolEmoji = renderer.stage.children[1].coolEmoji.contentContainer;
            coolEmoji.on("pointerdown", function () {
                client.addCommand(new SpeakCommand("😎", "emojiBlast", myRawEntity.x, myRawEntity.y))
            });
           /*const heartEmoji = renderer.stage.children[1].heartEmoji.contentContainer;
            heartEmoji.on("pointerdown", function () {
                client.addCommand(new SpeakCommand("❤️", "emojiBlast", myRawEntity.x, myRawEntity.y))
            });
            const lighteningEmoji = renderer.stage.children[1].lighteningEmoji.contentContainer;
            lighteningEmoji.on("pointerdown", function () {
                client.addCommand(new SpeakCommand("⚡", "emojiBlast", myRawEntity.x, myRawEntity.y))
            });
            const sadEmoji = renderer.stage.children[1].sadEmoji.contentContainer;
            sadEmoji.on("pointerdown", function () {
                client.addCommand(new SpeakCommand("🎉", "emojiBlast", myRawEntity.x, myRawEntity.y))
            });
            const whateverEmoji = renderer.stage.children[1].whateverEmoji.contentContainer;
            whateverEmoji.on("pointerdown", function () {
                client.addCommand(new SpeakCommand("🙄", "emojiBlast", myRawEntity.x, myRawEntity.y))
            });*/
        }

        const sendMessage = renderer.stage.children[1].textBox.children[0].children[0].children[3]
        sendMessage.on("pointerdown", function () {
            let message = renderer.stage.children[1].mockInput.value;
            //console.log(message)
            if(message != "") {
                const speakCommand = new SpeakCommand(message, "talk", myRawEntity.x, myRawEntity.y)
                client.addCommand(speakCommand)
            }
            renderer.stage.children[1].mockInput.blur();
            renderer.stage.children[1].mockInput.text = ""
        });



        if(input.message != "") {
            const speakCommand = new SpeakCommand(input.message, "talk", myRawEntity.x, myRawEntity.y)
            client.addCommand(speakCommand)
        }

       

        if(input.r == true) {
            //const respawnCommand = new RespawnCommand(true)
            //client.addCommand(respawnCommand)
        }
       
      

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
        if(graphics) {
            graphics.x = prediction.x
            graphics.y = prediction.y
            graphics.playerBody.rotation = rotationAmount
       
            renderer.centerCamera(graphics)

            let trail = new PIXI.Graphics()
            trail.beginFill()
            trail.drawCircle(graphics.x, graphics.y, 10)
            trail.endFill()
            //renderer.middleground.addChild(trail)
        }
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
    }
}

export default handleInput