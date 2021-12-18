import { Joystick } from './graphics/Joystick';
import isMobile from 'ismobilejs'
import JoinCommand from '../common/command/JoinCommand.js'
import ToggleCommand from '../common/command/ToggleCommand.js'
import { Sound } from '@pixi/sound'
import MoveCommand from '../common/command/MoveCommand';


class InputSystem {

    constructor(renderer, client) {
        this.canvasEle = document.getElementById('main-canvas')
        this.onmousemove = null

        this.UIBuilder = renderer.UIBuilder

        /* document.addEventListener('contextmenu', event =>
            event.preventDefault()
        )*/
        
        let isJoined = false;

        const footstep = Sound.from('audio/footstep.mp3');
        footstep.speed = 2
        footstep.volume = 0.005      

        window.onblur = function() {
            //console.log('leave')
            client.addCommand(new ToggleCommand(true, "sleeping"))
        }
        window.onfocus = function() {
            //console.log('comeback')
            client.addCommand(new ToggleCommand(false, "sleeping"))
        }


        let listenersOn = false
        
        let placeButton = setInterval(function(){
            let userInterface = renderer.UIBuilder
            if(userInterface) {
                if(listenersOn == false) {

                    renderer.UIBuilder.joinButton.on("click", function () {
    
                        if(isJoined == false) {
            
                            if(renderer.UIBuilder.nameGiven == true) {
            
                                let name = renderer.UIBuilder.getText();
                                let color = renderer.UIBuilder.getColor()
                                let avatar = renderer.UIBuilder.getAvatar();
                                renderer.UIBuilder.joinSession()
    
                                client.addCommand(new JoinCommand(""+name+"", ""+avatar+"", ""+color+""))
                                isJoined = true
                                listenersOn = true
                                clearInterval(placeButton)
                                
            
                            }
                            
                        }
                        
                    });

                    renderer.UIBuilder.viewArtButton.on('pointerdown', function(){
                        client.addCommand(new ToggleCommand(true, "headphones"))
                    })

                    renderer.UIBuilder.mainMenuStage.children.forEach((element, index) => {
                        if(index == 0) {
                            return;
                        }
                        element.on('pointerdown', function(){
                            client.addCommand(new ToggleCommand(true, "headphones"))
                        })
                    })

                   
                    renderer.UIBuilder.viewInfoButton.on('pointerdown', function(){
                        client.addCommand(new ToggleCommand(true, "headphones"))
                    });
                    

                    

                    console.log(renderer.UIBuilder)//renderer.UIBuilder.showQuoteButton
                    

                    document.addEventListener( "pointerdown", closeArtButton );
                    function closeArtButton(event){
                        var element = event.target;
                        if(element.id == 'back-to-bias'){
                            client.addCommand(new ToggleCommand(false, "headphones"))
                            client.rawEntity.artNumber++
                            console.log(client.rawEntity);
                        }
                    }

                    renderer.UIBuilder.leaveButtonWrapper.contentContainer.on('pointerdown', function(){
                        if(renderer.UIBuilder.showingQuote == true) {
                            client.addCommand(new ToggleCommand(false, "headphones"))
                        }
                    });
                    
                    listenersOn == true
                    clearInterval(placeButton)
                }
            }
        }, 200 )



        window.addEventListener('resize', () => {
            
            this.placeJoySticks()
        
        })

        

        this.currentState = {
            w: false,
            s: false,
            a: false,
            d: false,
            r: false,
            f: 0,
            rotation: 0,
            mx: 0,
            my: 0,
            mouseDown: false,
            mouseMoving: false,
            message: false
            
        }

        this.frameState = {
            w: false,
            s: false,
            a: false,
            d: false,
            f: 0,
            rotation: 0,
            r: false,
            justReleasedR: false,
            spacebar: false,
            spacebarRelease: false,
            mouseDown: false,
            mouseMoving: false,
            message: false
        }

        

        this.isMobile = isMobile();

            

            document.addEventListener('keydown', event => {
                               
                if(!renderer.UIBuilder.mockInput._isFocused) {

                    if (event.keyCode === 87 || event.keyCode === 38) {
                        this.currentState.w = true
                        this.frameState.w = true
                        if(!footstep.isPlaying) {
                            footstep.play()
                        }
                    }
                    // a or left arrow
                    if (event.keyCode === 65 || event.keyCode === 37) {
                        this.currentState.a = true
                        this.frameState.a = true
                        if(!footstep.isPlaying) {
                            footstep.play()
                        }
                    }
                    // s or down arrow
                    if (event.keyCode === 83 || event.keyCode === 40) {
                        this.currentState.s = true
                        this.frameState.s = true
                        if(!footstep.isPlaying) {
                            footstep.play()
                        }
                    }
                    // d or right arrow
                    if (event.keyCode === 68 || event.keyCode === 39) {
                        this.currentState.d = true
                        this.frameState.d = true
                        if(!footstep.isPlaying) {
                            footstep.play()
                        }
                    }

                }


                // r
                if (event.keyCode === 82) {
                    this.currentState.r = true
                    this.frameState.r = true
                }

                // spacebar
                if (event.keyCode === 32) {
                    this.currentState.spacebar = true
                    this.frameState.spacebar = true
                }

            

            })

            document.addEventListener('keyup', event => {
                //console.log('keyup', event)
                if (event.keyCode === 87 || event.keyCode === 38) {
                    this.currentState.w = false
                    footstep.stop()
                }
                if (event.keyCode === 65 || event.keyCode === 37) {
                    this.currentState.a = false
                    footstep.stop()
                }
                if (event.keyCode === 83 || event.keyCode === 40) {
                    this.currentState.s = false
                    footstep.stop()
                }
                if (event.keyCode === 68 || event.keyCode === 39) {
                    this.currentState.d = false
                    footstep.stop()
                }

                if (event.keyCode === 82) {
                    if (this.currentState.r === true) {
                        // used to implement reload on keyup instead of keydown
                        this.frameState.justReleasedR = true
                    }
                    this.currentState.r = false
                }
                 // spacebar
                 if (event.keyCode === 32) {
                    if (this.currentState.spacebar === true) {
                        this.frameState.spacebarRelease = true
                    }
                    this.currentState.spacebar = false
                }

                 //enter
                 if (event.keyCode === 13) {
                     this.frameState.message = ""
                     this.currentState.message = ""
                 }



            })

            document.addEventListener('mousemove', event => {
                this.currentState.mx = event.clientX
                this.currentState.my = event.clientY
                if (this.onmousemove) {
                    this.onmousemove(event)
                }
                this.currentState.mouseMoving = true
                this.frameState.mouseMoving = true
            })

            document.addEventListener('pointerdown', event => {
                this.currentState.mouseDown = true
                this.frameState.mouseDown = true
                this.currentState.mx = event.clientX
                this.currentState.my = event.clientY
            })


            document.addEventListener('pointerup', event => {
                this.currentState.mouseDown = false
                this.currentState.mouseMoving = false
                this.frameState.mouseMoving = false
            })

            var joypadSize = 0.5


            this.leftController = new Joystick({
                
                outerScale: { x: joypadSize, y: joypadSize },
                innerScale: { x: joypadSize, y: joypadSize },
            
                onStart: (data) => {
                    this.currentState.mouseDown = false
                    this.frameState.mouseDown = false
                    this.currentState.power = 0
                    this.frameState.power = 0
                },
                
                onChange: (data) => {
                                        
                    this.currentState.mouseDown = false
                    this.frameState.mouseDown = false
                    
                    var dd = data.direction

                    var angle = data.angle
                    var pi = Math.PI
                    angle = (angle * (pi/180) * -1)
            
                    if(dd == 'top') {
                        this.currentState.w = true
                        this.frameState.w = true
                        this.currentState.a = false
                        this.frameState.a = false
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = false
                        this.frameState.d = false
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
                    }
            
                    if(dd == 'top_right') {
                        this.currentState.w = true
                        this.frameState.w = true
                        this.currentState.a = false
                        this.frameState.a = false
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = true
                        this.frameState.d = true
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
                    }
            
                    if(dd == 'right') {
                        this.currentState.w = false
                        this.frameState.w = false
                        this.currentState.a = false
                        this.frameState.a = false
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = true
                        this.frameState.d = true
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
            
                    }
            
                    if(dd == 'bottom_right') {
                        this.currentState.w = false
                        this.frameState.w = false
                        this.currentState.a = false
                        this.frameState.a = false
                        this.currentState.s = true
                        this.frameState.s = true
                        this.currentState.d = true
                        this.frameState.d = true
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
   
                    }
                    
                    if (dd == 'bottom') {
                        this.currentState.w = false
                        this.frameState.w = false
                        this.currentState.a = false
                        this.frameState.a = false
                        this.currentState.s = true
                        this.frameState.s = true
                        this.currentState.d = false
                        this.frameState.d = false
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
                    }
            
                    if (dd == 'bottom_left') {
                        this.currentState.w = false
                        this.frameState.w = false
                        this.currentState.a = true
                        this.frameState.a = true
                        this.currentState.s = true
                        this.frameState.s = true
                        this.currentState.d = false
                        this.frameState.d = false
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
            
                    }
            
                    if (dd == 'left') {
                        this.currentState.w = false
                        this.frameState.w = false
                        this.currentState.a = true
                        this.frameState.a = true
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = false
                        this.frameState.d = false
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
                    }
            
                    if (dd == 'top_left') {
                        this.currentState.w = true
                        this.frameState.w = true
                        this.currentState.a = true
                        this.frameState.a = true
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = false
                        this.frameState.d = false
                        this.currentState.rotation = angle
                        this.frameState.rotation = angle
                    }
            
            
                },
                onEnd: () => {
                    this.currentState.w = false
                    this.currentState.a = false
                    this.currentState.s = false
                    this.currentState.d = false
                }
            });

            
            let placed = false
            let mobile = this.isMobile.any
            let leftController = this.leftController
            let placeStick = setInterval(function(){
                let userInterface = renderer.UIBuilder
                if(userInterface) {
                    if(placed == false) {
                        if(mobile || window.innerWidth <= 500) {
                            renderer.UIBuilder.addChildAt(leftController, 5);
                            placed == true
                            clearInterval(placeStick)
                        }
                    }
                }
            }, 200 )
             
            if(this.isMobile.any || window.innerWidth <= 500) {
                this.leftController.position.set(45, window.innerHeight - this.leftController.height + 15);
                this.leftController.alpha = 0
            } 
    
    }

    placeJoySticks(){

        if(this.isMobile.any || window.innerWidth <= 500) {
            this.leftController.position.set(45, window.innerHeight - this.leftController.height + 15);
            if(renderer.UIBuilder) {
                renderer.UIBuilder.addChildAt(this.leftController, 5);
            }
            
        } else {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.removeChild(this.leftController);
            }
        }

    }

    isMobile(){
        if(isMobile(window.navigator).any === true) {
            return true
        } else {
            return false
        }
    }


    releaseKeys() {
        this.frameState.w = this.currentState.w
        this.frameState.a = this.currentState.a
        this.frameState.s = this.currentState.s
        this.frameState.d = this.currentState.d
        this.frameState.r = this.currentState.r
        this.frameState.spacebar = this.currentState.spacebar
        this.frameState.justReleasedR = false
        this.frameState.spacebarRelease = false;
        this.frameState.rotation = this.currentState.rotation
        this.frameState.mouseDown = this.currentState.mouseDown
        this.frameState.mouseMoving = this.currentState.mouseMoving
        this.frameState.message = this.currentState.message
    }
}

export default InputSystem
