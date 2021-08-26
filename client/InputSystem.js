import { Joystick } from './graphics/Joystick';
import * as PIXI from 'pixi.js'
import isMobile from 'ismobilejs'
import UIBuilder from './graphics/UIBuilder.js'
import JoinCommand from '../common/command/JoinCommand.js'

class InputSystem {

    constructor(renderer, client) {
        this.canvasEle = document.getElementById('main-canvas')
        this.onmousemove = null

        this.UIBuilder = renderer.UIBuilder

        let isJoined = false;
        const joinButton = renderer.stage.children[1].joinButton
        joinButton.on("click", function () {
            
            if(isJoined == false) {
                let name = renderer.UIBuilder.getText();
                let playerColor = Math.floor(Math.random()*16777215).toString(16);
                client.addCommand(new JoinCommand(""+name+"", playerColor))
                renderer.UIBuilder.clearText();
                renderer.UIBuilder.joinSession();
                isJoined = true
            }
        });

        this.currentState = {
            w: false,
            s: false,
            a: false,
            d: false,
            r: false,
            spacebar: false,
            f: 0,
            rotation: 0,
            mx: 0,
            my: 0,
            mouseDown: false,
            message: "",
            viewArt: false
            
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
            message: "",
            viewArt: false,
            spacebar: false
        }

        

        this.isMobile = isMobile();

        // disable right click
        /*document.addEventListener('contextmenu', event =>
            event.preventDefault()
        )*/

        let iframe = "";

        //this.currentState.message = this.UIBuilder.getText();

        /*document.body.addEventListener("mousedown", function(e) {
            console.log(e.target.nodeName, e.target.id)
            if (e.target.nodeName === "DIV"){
              document.getElementById("iframe").remove()
              e.target.remove()
            }
          }, false)*/


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

                // spacebar
                if (event.keyCode === 32) {
                    this.currentState.spacebar = true
                    this.frameState.spacebar = true
                }

                if (event.keyCode === 13) {
                    //console.log(this.UIBuilder)
                    //this.frameState.message = this.UIBuilder.getText();
                    this.currentState.message = this.UIBuilder.getText();//this.frameState.message;
                    this.UIBuilder.clearText();
                } 

                if (event.keyCode === 9) {
                    //console.log(this.UIBuilder)
                    //this.frameState.message = this.UIBuilder.getText();
                    this.currentState.message = this.UIBuilder.getText();//this.frameState.message;
                    this.UIBuilder.clearText();
                }

                //Right Bracket
                if(event.keyCode === 221) {
                    this.currentState.viewArt = true
                    this.frameState.viewArt = true
                    iframe = document.createElement('iframe');
                    //iframe.src = "https://www.youtube.com/embed/daixJKnzc4o?autoplay=1&modestbranding=1&showinfo=0&rel=0&fs=0&color=white&controls=0"
                    iframe.src = "https://stealingurfeelin.gs/"
                    iframe.style = "position:absolute;top:50%;left:50%;transform:translateX(-50%)translateY(-50%);border:0;width:1120px;height:630px"
                    iframe.allow = "camera"
                    iframe.id = "iframe"
                    iframe.allowfullscreen = "allowfullscreen"
                    //document.body.appendChild(iframe);

                    var close = document.createElement('div');
                    close.style = "position:absolute;50px;top:50px;right:50px;background-color:red;width:20px;height:20px"
                    //document.body.appendChild(close);
                }

                    //shift
                if (event.keyCode === 16) {
                    //iframe = document.createElement('iframe');
                    //"https://stealingurfeelin.gs/"
                    //iframe.allow = "camera"
                    //                    

                    //iframe.src = "http://vylevylevyle.com/drk_webvr_test/"
                    
                    //document.body.appendChild(iframe);

                   // var close = document.createElement('div');
                    //close.style = "position:absolute;50px;top:50px;right:50px;background-color:red;width:20px;height:20px"
                    //document.body.appendChild(close);
                    
                    
                    
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
                 // spacebar
                 if (event.keyCode === 32) {
                    if (this.currentState.spacebar === true) {
                        this.frameState.spacebarRelease = true
                    }
                    this.currentState.spacebar = false
                }

                if (event.keyCode === 13) {
                    this.frameState.message = ""
                    this.currentState.message = ""
                }

                //Right Bracket
                if(event.keyCode === 221) {
                    this.currentState.viewArt = false
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

            if(this.isMobile) {
                var joypadSize = 1
            } else {
                var joypadSize = 0.5
            }

            //console.log(this.isMobile.any)


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
                            
                    //console.log(data.power);
            
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
           
            if(this.isMobile.any || window.innerWidth < 600) {
                this.leftController.position.set(this.leftController.width, window.innerHeight - this.leftController.height);
                renderer.stage.addChild(this.leftController);
            }

            this.rightController = new Joystick({
            
                outerScale: { x: joypadSize, y: joypadSize },
                innerScale: { x: joypadSize, y: joypadSize },
            
                onStart: (data) => {
                    this.currentState.mouseDown = false
                    this.frameState.mouseDown = false
                },
                
                onChange: (data) => {

                    let angle = data.angle * (pi/180);

                    this.currentState.mouseDown = false
                    this.frameState.mouseDown = false
                    this.currentState.rotation = (angle)
                    this.frameState.rotation = (angle)
                                
                },
                onEnd: () => {
                    this.currentState.mouseDown = false
                }
            });
            if(this.isMobile.any || window.innerWidth < 600) {
                this.rightController.position.set(window.innerWidth - this.rightController.width, window.innerHeight - this.rightController.height);
                renderer.stage.addChild(this.rightController);
            }
           
            


        //}
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
        this.frameState.message = this.currentState.message
        this.frameState.message = this.currentState.message
        this.frameState.viewArt = this.currentState.viewArt
    }
}

export default InputSystem
