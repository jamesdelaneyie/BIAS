import { Joystick } from './graphics/Joystick';
import * as PIXI from 'pixi.js'


class InputSystem {
    constructor(renderer) {
        this.canvasEle = document.getElementById('main-canvas')
        this.onmousemove = null

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
            mouseDown: false
        }

        this.frameState = {
            w: false,
            s: false,
            a: false,
            d: false,
            f: 0,
            rotation: 0,
            r: false,
            mouseDown: false,
            justReleasedR: false
        }

        // disable right click
        document.addEventListener('contextmenu', event =>
            event.preventDefault()
        )

        //if(isMobile == false) {

            document.addEventListener('keydown', event => {
                //console.log('keydown', event)
                // w or up arrow
                if (event.keyCode === 87 || event.keyCode === 38) {
                    this.currentState.w = true
                    this.frameState.w = true
                }
                // a or left arrow
                if (event.keyCode === 65 || event.keyCode === 37) {
                    this.currentState.a = true
                    this.frameState.a = true
                }
                // s or down arrow
                if (event.keyCode === 83 || event.keyCode === 40) {
                    this.currentState.s = true
                    this.frameState.s = true
                }
                // d or right arrow
                if (event.keyCode === 68 || event.keyCode === 39) {
                    this.currentState.d = true
                    this.frameState.d = true
                }

                // r
                if (event.keyCode === 82) {
                    this.currentState.r = true
                    this.frameState.r = true
                }
            })

            document.addEventListener('keyup', event => {
                //console.log('keyup', event)
                if (event.keyCode === 87 || event.keyCode === 38) {
                    this.currentState.w = false
                }
                if (event.keyCode === 65 || event.keyCode === 37) {
                    this.currentState.a = false
                }
                if (event.keyCode === 83 || event.keyCode === 40) {
                    this.currentState.s = false
                }
                if (event.keyCode === 68 || event.keyCode === 39) {
                    this.currentState.d = false
                }

                if (event.keyCode === 82) {
                    if (this.currentState.r === true) {
                        // used to implement reload on keyup instead of keydown
                        this.frameState.justReleasedR = true
                    }
                    this.currentState.r = false
                }
            })

            document.addEventListener('mousemove', event => {
                this.currentState.mx = event.clientX
                this.currentState.my = event.clientY
                if (this.onmousemove) {
                    this.onmousemove(event)
                }
            })

            document.addEventListener('mousedown', event => {
                this.currentState.mouseDown = true
                this.frameState.mouseDown = true
            })


            document.addEventListener('mouseup', event => {
                this.currentState.mouseDown = false
            })

            this.leftController = new Joystick({
            
                outerScale: { x: 0.5, y: 0.5 },
                innerScale: { x: 0.5, y: 0.5 },
            
                onStart: (data) => {
                    this.currentState.mouseDown = false
                    this.frameState.mouseDown = false
                    this.currentState.power = 0
                    this.frameState.power = 0
                },
                
                onChange: (data) => {
                            
                    //console.log(data.power);
            
                    this.currentState.mouseDown = false
                    
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
                    }
            
                    if (dd == 'left_top') {
                        this.currentState.w = true
                        this.frameState.w = true
                        this.currentState.a = true
                        this.frameState.a = true
                        this.currentState.s = false
                        this.frameState.s = false
                        this.currentState.d = false
                        this.frameState.d = false
                    }
            
            
                },
                onEnd: () => {
                    this.currentState.w = false
                    this.currentState.a = false
                    this.currentState.s = false
                    this.currentState.d = false
                }
            });
            this.leftController.position.set(this.leftController.width, window.innerHeight - this.leftController.height);
            
            renderer.stage.addChild(this.leftController);

            


            this.rightController = new Joystick({
            
                outerScale: { x: 0.5, y: 0.5 },
                innerScale: { x: 0.5, y: 0.5 },
            
                onStart: (data) => {
                    this.currentState.mouseDown = false
                    this.frameState.mouseDown = false
                },
                
                onChange: (data) => {

                    this.currentState.mouseDown = false
                    this.currentState.rotation = (data.angle)
                    this.frameState.rotation = (data.angle)
                                
                },
                onEnd: () => {
                    this.currentState.mouseDown = false
                }
            });
            this.rightController.position.set(window.innerWidth - this.rightController.width, window.innerHeight - this.rightController.height);
            
            renderer.stage.addChild(this.rightController);


        //}
    }

    releaseKeys() {
        this.frameState.w = this.currentState.w
        this.frameState.a = this.currentState.a
        this.frameState.s = this.currentState.s
        this.frameState.d = this.currentState.d
        this.frameState.r = this.currentState.r
        this.frameState.rotation = this.currentState.rotation
        this.frameState.mouseDown = this.currentState.mouseDown
        this.frameState.justReleasedR = false
    }
}

export default InputSystem
