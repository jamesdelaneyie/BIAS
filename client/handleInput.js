import MoveCommand from '../common/command/MoveCommand.js'
import FireCommand from '../common/command/FireCommand.js'
import SpeakCommand from '../common/command/SpeakCommand.js'
import ToggleCommand from '../common/command/ToggleCommand.js'
import applyCommand from '../common/applyCommand.js'
import { fire } from '../common/weapon.js'
import handleShot from './handleShot.js'
import isMobile from 'ismobilejs'
import * as PIXI from 'pixi.js'

const handleInput = (inputSystem, state, client, renderer, delta) => {

    const input = inputSystem.frameState
    inputSystem.releaseKeys()


    const { myRawEntity, obstacles, boxes } = state


    if (myRawEntity && myRawEntity.headphones == false) {
        
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
        if(input.mouseDown) {
            rotationAmount = rotation
        }

        
        

        if(input.message != "") {
            //console.log('typing')
            client.addCommand(new ToggleCommand(true, "typing"))
        } else {
            //console.log('not typing')
            client.addCommand(new ToggleCommand(false, "typing"))
        }

        
        const moveCommand = new MoveCommand(input.w, input.a, input.s, input.d, rotationAmount, delta)
        client.addCommand(moveCommand)

        // apply moveCommand  to our local entity
        applyCommand(myRawEntity, moveCommand, obstacles, boxes)

        //if (input.mouseDown) {
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
        //}

        const sendMessage = renderer.stage.children[1].textBox.children[0].children[0].children[3]
        sendMessage.on("pointerdown", function () {
            let message = renderer.stage.children[1].mockInput.value;
            if(message != "") {
                const speakCommand = new SpeakCommand(message, "talk", myRawEntity.x, myRawEntity.y)
                client.addCommand(speakCommand)
            }
            renderer.stage.children[1].mockInput.blur();
            renderer.stage.children[1].mockInput.text = ""
        });


        document.addEventListener('keydown', event => {
            if (event.key == "Enter") {
                let message = renderer.stage.children[1].mockInput.value;
                const speakCommand = new SpeakCommand(message, "talk", myRawEntity.x, myRawEntity.y)
                client.addCommand(speakCommand)
                renderer.stage.children[1].mockInput.blur();
                renderer.stage.children[1].mockInput.text = ""
            }
        })



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
        }
        /* end movement */

        /* shooting */
        if (input.mouseDown) {

            const urlParams = new URLSearchParams(window.location.search);

            urlParams.set('x', parseInt(myRawEntity.x));
            urlParams.set('y', parseInt(myRawEntity.y));

            let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString();
            window.history.replaceState({path: newurl}, '', newurl);

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