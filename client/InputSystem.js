import { Joystick } from './graphics/Joystick';
import isMobile from 'ismobilejs'
import JoinCommand from '../common/command/JoinCommand.js'
import ToggleCommand from '../common/command/ToggleCommand.js'
import { Sound } from '@pixi/sound'


class InputSystem {

    constructor(renderer, client) {
        this.canvasEle = document.getElementById('main-canvas')
        this.onmousemove = null

        this.UIBuilder = renderer.UIBuilder

        /* document.addEventListener('contextmenu', event =>
            event.preventDefault()
        )*/
        
        let isJoined = false;

        const joinButton = renderer.stage.children[1].joinButton
        const UIBuilder = this.UIBuilder

        const footstep = Sound.from('audio/footstep.mp3');
        footstep.speed = 2
        footstep.volume = 0.005

        const viewArtButton = renderer.stage.children[1].viewArtButton
        viewArtButton.on('pointerdown', function(){
            client.addCommand(new ToggleCommand(true, "headphones"))
            viewArtButton.alpha = 0
        })

        document.addEventListener( "pointerdown", closeArtButton );
        function closeArtButton(event){
            var element = event.target;
            if(element.id == 'back-to-bias'){
                setTimeout(()=>{
                    client.addCommand(new ToggleCommand(false, "headphones"))
                }, 1300)
            }
        }
        
        
        joinButton.on("click", function () {
            
            if(isJoined == false) {

                if(UIBuilder.nameGiven == true) {

                    let name = renderer.UIBuilder.getText();
                    let color = renderer.UIBuilder.getColor()
                    let avatar = renderer.UIBuilder.getAvatar();

                    client.addCommand(new JoinCommand(""+name+"", ""+avatar+"", ""+color+""))
                    
                    isJoined = true
                    

                }
                
            }
        });


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


        //if(isMobile == false) {

            

            document.addEventListener('keydown', event => {
                //console.log('keydown', event)
                // w or up arrow


                if(!renderer.stage.children[1].mockInput._isFocused) {
                    
                


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
            
                this.currentState.message = this.UIBuilder.getMessageText();
                this.frameState.message = this.UIBuilder.getMessageText();

                

            

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

            if(this.isMobile.any || window.innerWidth <= 500) {
                var joypadSize = 0.5
            } else {
                var joypadSize = 0.2
            }


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
                    
                    var dd = data.direction;
            
                    if(dd == 'top') {
                        this.currentState.w = true
                        this.frameState.w = true
                        this.currentState.a = false
                        this.frameState.a = false
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = false
                        this.frameState.d = false
                        this.currentState.rotation = -1.5708
                        this.frameState.rotation = -1.5708
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
                        this.currentState.rotation = -0.785398
                        this.frameState.rotation = -0.785398
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
                        this.currentState.rotation = 0
                        this.frameState.rotation = 0
            
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
                        this.currentState.rotation = 0.785398
                        this.frameState.rotation = 0.785398
   
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
                        this.currentState.rotation = 1.5708
                        this.frameState.rotation = 1.5708
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
                        this.currentState.rotation = 2.35619
                        this.frameState.rotation = 2.35619
            
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
                        this.currentState.rotation = 3.141592
                        this.frameState.rotation = 3.141592
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
                        this.currentState.rotation = 3.92699
                        this.frameState.rotation = 3.92699
                    }
            
            
                },
                onEnd: () => {
                    this.currentState.w = false
                    this.currentState.a = false
                    this.currentState.s = false
                    this.currentState.d = false
                }
            });
           
            
             
            if(this.isMobile.any || window.innerWidth <= 500) {
                this.leftController.position.set(45, window.innerHeight - this.leftController.height*1.6);
                this.leftController.alpha = 0
                renderer.UIBuilder.addChild(this.leftController);
            } else {
                renderer.UIBuilder.removeChild(this.leftController);
            }
    
    }

    placeJoySticks(){

        if(this.isMobile.any || window.innerWidth <= 500) {
            this.leftController.position.set(45, window.innerHeight - this.leftController.height*1.6);
            renderer.UIBuilder.addChild(this.leftController);
        } else {
            renderer.UIBuilder.removeChild(this.leftController);
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
