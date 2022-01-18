import MoveCommand from '../common/command/MoveCommand.js'
import FireCommand from '../common/command/FireCommand.js'
import SpeakCommand from '../common/command/SpeakCommand.js'
import ToggleCommand from '../common/command/ToggleCommand.js'
import applyCommand from '../common/applyCommand.js'
import { fire } from '../common/weapon.js'
import handleShot from './handleShot.js'
import isMobile from 'ismobilejs'
import * as PIXI from 'pixi.js'
import { UInt16 } from 'nengi'

let isFiring = false

const handleInput = (inputSystem, state, client, renderer, delta) => {

    const input = inputSystem.frameState
    inputSystem.releaseKeys()

    const { myRawEntity, obstacles, boxes, artworks, infoPanels } = state


    if (myRawEntity) {

        if(myRawEntity.headphones == false) {
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
            //console.log(input.rotation)
            //console.log(rotationAmount)

            
            


            
            const moveCommand = new MoveCommand(input.w, input.a, input.s, input.d, rotationAmount, delta)
            client.addCommand(moveCommand)

            // apply moveCommand  to our local entity
            applyCommand(myRawEntity, moveCommand, obstacles, boxes, artworks, infoPanels)



            if (input.mouseDown) {
               
                const heartEmoji = renderer.UIBuilder.heartEmoji.contentContainer;
                heartEmoji.on("pointerdown", function () {
                    client.addCommand(new SpeakCommand("❤️", "emojiBlast", myRawEntity.x, myRawEntity.y))
                });
                const partyEmoji = renderer.UIBuilder.partyEmoji.contentContainer;
                partyEmoji.on("pointerdown", function () {
                    client.addCommand(new SpeakCommand("🎉", "emojiBlast", myRawEntity.x, myRawEntity.y))
                });
                /*const coolEmoji = renderer.stage.children[1].coolEmoji.contentContainer;
                coolEmoji.on("pointerdown", function () {
                    client.addCommand(new SpeakCommand("😎", "emojiBlast", myRawEntity.x, myRawEntity.y))
                });
                const lighteningEmoji = renderer.stage.children[1].lighteningEmoji.contentContainer;
                lighteningEmoji.on("pointerdown", function () {
                    client.addCommand(new SpeakCommand("⚡", "emojiBlast", myRawEntity.x, myRawEntity.y))
                });
                
                const whateverEmoji = renderer.stage.children[1].whateverEmoji.contentContainer;
                whateverEmoji.on("pointerdown", function () {
                    client.addCommand(new SpeakCommand("🙄", "emojiBlast", myRawEntity.x, myRawEntity.y))
                });*/
                const sendMessage = renderer.UIBuilder.sendIcon
                sendMessage.on("pointerdown", function () {
                    let message = renderer.UIBuilder.mockInput.value;
                    if(message != "") {
                        const speakCommand = new SpeakCommand(message, "talk", myRawEntity.x, myRawEntity.y)
                        client.addCommand(speakCommand)
                    }
                    renderer.UIBuilder.mockInput.blur();
                    renderer.UIBuilder.mockInput.text = ""
                    renderer.UIBuilder.TextBoxPlaceholder.alpha = 0.4;
                });
            }

            if(renderer.UIBuilder) {

                

                            
                if(renderer.UIBuilder.mockInput.text != "" && renderer.UIBuilder.mockInput._isFocused) {
                    client.addCommand(new ToggleCommand(true, "typing"))
                } else {
                    client.addCommand(new ToggleCommand(false, "typing"))
                }

            }


            document.addEventListener('keydown', event => {
                if (event.key == "Enter") {
                    let message = renderer.UIBuilder.mockInput.value;
                    const speakCommand = new SpeakCommand(message, "talk", myRawEntity.x, myRawEntity.y)
                    client.addCommand(speakCommand)
                    renderer.UIBuilder.mockInput.blur();
                    renderer.UIBuilder.mockInput.text = ""
                    renderer.UIBuilder.TextBoxPlaceholder.alpha = 0.4;
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
                urlParams.set('floor', parseInt(myRawEntity.floor));

                let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString();
                window.history.replaceState({path: newurl}, '', newurl);

                let canFire = true
                //console.log(renderer.UIBuilder)

                //menu button
                if(inputSystem.currentState.mx < 55 && inputSystem.currentState.my < 55) {
                    canFire = false;
                }
                if(renderer.UIBuilder.mainMenuStage.children[1].visible == true) {
                    if(inputSystem.currentState.mx < 145 && inputSystem.currentState.my < 190) {
                        canFire = false;
                    }
                }

                //map button
                if(inputSystem.currentState.mx > (window.innerWidth - 55) && inputSystem.currentState.my > (window.innerHeight - 55)) {
                    canFire = false;
                }
                if(renderer.UIBuilder.miniMap.visible == true) {
                    if(inputSystem.currentState.mx > (window.innerWidth - 210) && inputSystem.currentState.my > (window.innerHeight - 170)) {
                        canFire = false;
                    }
                }
                //console.log(inputSystem.currentState.mx)
                //Text input
                 if(inputSystem.currentState.mx > (window.innerWidth/2 - 220) && inputSystem.currentState.mx < (window.innerWidth/2 + 220)) {
                    if(inputSystem.currentState.my > (window.innerHeight - 70)) {
                        canFire = false;
                    }
                }

                if(renderer.UIBuilder.showingQuote) {
                    canFire = false;
                }

                //inputSystem.currentState.mx < 55 && inputSystem.currentState.my

                //console.log()
                if(!isFiring) {

                    if (fire(myRawEntity) && canFire) {
                        // send shot to the server
                        client.addCommand(new FireCommand(worldCoord.x, worldCoord.y, myRawEntity.color))
                        // draw a predicted shot locally
                        handleShot(myRawEntity.x, myRawEntity.y, worldCoord.x, worldCoord.y, state.obstacles, renderer)
    
                        isFiring = true
                    }

                }

                
                

            } else {
                isFiring = false
            }

        } else {

            const dx = 950 - myRawEntity.x
            const dy = 1980 - myRawEntity.y
            const rotation = Math.atan2(dy, dx)
    
            /* begin movement */
            var rotationAmount = rotation
            if(isMobile(window.navigator).any === true) {
                rotationAmount = input.rotation
            }
    
    
            const moveCommand = new MoveCommand(false, false, false, false, rotationAmount, delta)
            applyCommand(myRawEntity, moveCommand, obstacles, boxes, artworks, infoPanels)
    
            const prediction = {
                nid: myRawEntity.nid,
                x: myRawEntity.x,
                y: myRawEntity.y,
                protocol: myRawEntity.protocol
            }
            client.addCustomPrediction(client.tick, prediction, ['x', 'y'])
    
            const graphics = client.graphicalEntities.get(prediction.nid)
            if(graphics) {
                //graphics.playerBody.rotation = rotationAmount
                renderer.centerCamera(graphics)
            }

        }
    } 
}

export default handleInput