import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import isMobile from 'ismobilejs'
import MultiStyleText from 'pixi-multistyle-text'
import cryptoRandomString from 'crypto-random-string'
import { GlowFilter } from '@pixi/filter-glow'
import { Ease, ease } from 'pixi-ease'

class UIBuilder extends PIXI.Container {
    constructor() {
        super()

        this.count = 0

        const width  = window.innerWidth || document.documentElement.clientWidth
        || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight
        || document.body.clientHeight;


        this.joinModal = new PUXI.Stage(width, height)   

        let modalWidth
        if(width <= 500) {
            modalWidth = 360;
        } else {
            modalWidth = 600;
        }
        let modalRadius = 10

        //Modal Background
        const joinModalWrapper= new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.999999,
                height: 0.99999,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )
        .setBackground(0x000000)
        .setBackgroundAlpha(0.9)
        .setPadding(0)
        
        

        this.joinModalWidgetGroup = new PUXI.WidgetGroup().setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: modalWidth,
                height: 400,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )
        

        
        this.joinModalWidgetGroup.contentContainer.alpha = 0
        ease.add(this.joinModalWidgetGroup.contentContainer, 
            { 
                y: -15, 
                alpha: 1, 
            }, 
            { 
                duration: 1000, 
                ease: 'easeOutExpo',
                wait: 1000
            })
        
        

        //Modal Content
        const backgroundBox = new PUXI.Widget({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )
        

        //Modal Glow Background
        this.modalBackgroundGlow = new PIXI.Graphics()
        this.modalBackgroundGlow.beginFill(0xFFFFFF);
        this.modalBackgroundGlow.alpha = 1
        this.modalBackgroundGlow.drawRoundedRect(0, 0, modalWidth, 400, modalRadius)
        this.modalBackgroundGlow.endFill()
        this.glowFilter = new GlowFilter({ distance: 25, outerStrength: 2.5, innerStrength: 0, color: 0x00ff00, quality: 0.2 })
        this.modalBackgroundGlow.filters = [ this.glowFilter ]
        this.joinModalWidgetGroup.contentContainer.addChild(this.modalBackgroundGlow)

        //Modal Background
        this.modalBackground = new PIXI.Graphics()
        this.modalBackground.beginFill(0xFFFFFF);
        this.modalBackground.alpha = 1
        this.modalBackground.drawRoundedRect(0, 0, modalWidth, 400, modalRadius)
        this.modalBackground.endFill()
        this.joinModalWidgetGroup.contentContainer.addChild(this.modalBackground)
        
        this.joinModalWidgetGroup.addChild(backgroundBox)

        //Logo Wrapper + Logo
        const logoBox = new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 50,
                height: 50,
                x: 0.5,
                y: 0.3,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )
        const logo = PIXI.Sprite.from('images/logo.svg');
        logo.width = 103
        logo.height = 89
        logo.anchor.set(0.5);
        logo.x = 25
        logo.y = 25
        logoBox.contentContainer.addChild(logo)
        


        //Name Input Field
        const inputBox = new PUXI.WidgetGroup().setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 300,
                height: 40,
                x: 0.5,
                y: 0.6,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        ).setBackground(0xE2E2E2).setBackgroundAlpha(1);
        
        //Text Styles for Input and Placeholder
        const textStyles = new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "#000000", 
            fontSize: 18
        })
        //The Text Input
        this.nameFieldInput = new PUXI.TextInput({
            multiLine: false,
            value: "",
            padding: 10,
            maxLength: 25,
            selectedColor: "#000000",
            selectedBackgroundColor: "#FFFFFF",
            caretWidth: 2,
            style: textStyles,
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.99,
                height: 0.95,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )
        
        inputBox.addChild(this.nameFieldInput)
        
        //Placeholder Text
        const nameFieldPlaceholder = new PUXI.TextWidget(
            'Who are you?', 
            textStyles
        ).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                x: 10,
                y: 11,
            })
        )
        nameFieldPlaceholder.alpha = 0.4;
        inputBox.widgetChildren[0].on('focus', () => { 
            nameFieldPlaceholder.alpha = 0;
        });
        inputBox.widgetChildren[0].on('blur', () => { 
            if(this.nameFieldInput.value != '') {
                nameFieldPlaceholder.alpha = 0;
            } else {
                nameFieldPlaceholder.alpha = 0.4;
            }
        });
        
        inputBox.addChild(nameFieldPlaceholder);
        inputBox.contentContainer.interactive = true;
        inputBox.contentContainer.buttonMode = true;
        inputBox.contentContainer.cursor = "text";
        inputBox.contentContainer.on("mouseover", function() {
            inputBox.setBackground("#FFFF00")
        });
        inputBox.contentContainer.on("mouseout", function() {
            inputBox.setBackground("#E2E2E2")
        });
        


        //Join Button 
        const joinButtonWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 100,
                height: 40,
                x: 0.5,
                y: 0.8,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        ).setBackground(0x000000).setBackgroundAlpha(1);

        this.joinButton = new PUXI.Button({
            text: ''
        }).setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 0.97,
            height: 0.95,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        .setBackground(0xFFFFFFF)
        .setBackgroundAlpha(1)
        joinButtonWrapper.addChild(this.joinButton)
        this.joinButton.on("hover", function (over) {
            if(over == true) {
                this.setBackground("#FFFF00")
            } else {
                this.setBackground("#FFFFFF")
            }
        });

        

       const buttonStyles = new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "#FFFFFF", 
            fontSize: 16, 
            letterSpacing: 2
        })
        const joinText = new PUXI.TextWidget('JOIN', buttonStyles)
        joinText.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 50,
            height: 18,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        joinText.tint = 0x000000
        joinButtonWrapper.addChild(joinText)


        const buttonStylesTwo = new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "#FFFFFF", 
            fontSize: 16, 
            letterSpacing: 2
        })
        const joinTextTwo = new PUXI.TextWidget('JOIN', buttonStylesTwo)
        joinTextTwo.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 50,
            height: 18,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        joinTextTwo.tint = 0xFFFFFF
        joinTextTwo.alpha = 0;
        joinButtonWrapper.addChild(joinTextTwo)
        joinButtonWrapper.contentContainer.interactive = true;
        joinButtonWrapper.contentContainer.buttonMode = true;
        joinButtonWrapper.contentContainer.cursor = "pointer";

        const joinButtonClick = new PUXI.ClickManager(this.joinButton, true, false, false)
        //this.addChild(joinButtonClick)
        joinButtonClick.onPress = function(){
            this.setBackground(0xff0000)
            joinText.alpha = 0
            joinTextTwo.alpha = 1
        }
        joinButtonClick.onClick = function(){
            this.setBackground(0xffffff)
            joinText.alpha = 1
            joinTextTwo.alpha = 0
        }

        


        this.joinModal.addChild(joinModalWrapper)

        this.joinModalWidgetGroup.addChild(logoBox)
        this.joinModalWidgetGroup.addChild(inputBox)
        this.joinModalWidgetGroup.addChild(joinButtonWrapper)
        
        this.joinModal.addChild(this.joinModalWidgetGroup)
        

        this.addChild(this.joinModal)

        



       
        
   /*     

        


        
        

        


        




        // Chat Text Entry Element 
        this.textBox = new PUXI.Stage(500, 45)   
        this.textBox.x = 200
        this.textBox.alpha = 0
        //The Text Input
        this.mockInput = new PUXI.TextInput({
            multiLine: false,
            background: 0xFFFFFF,
            value: "",
            padding: 10,
            maxLength: 69,
            selectedColor: "#000000",
            selectedBackgroundColor: "#0000FF",
            caretWidth: 4,
            style: textStyles,
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.999, 
                height: 40,
                x: 0,
                y: 0,
            }),
        )
        this.textBox.addChild(this.mockInput)
        //Placeholder Text
        this.TextBoxPlaceholder = new PUXI.TextWidget(
            'Type to Speak!', 
            textStyles
        ).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                x: 10,
                y: 10,
            })
        )
        this.TextBoxPlaceholder.alpha = 0.4;
        this.textBox.addChild(this.TextBoxPlaceholder);

        //Focus + Blur events, hide placeholder
        this.textBox.widgetChildren[0].on('focus', () => { 
            this.TextBoxPlaceholder.alpha = 0;
        });
        this.textBox.widgetChildren[0].on('blur', () => { 
            this.TextBoxPlaceholder.alpha = 0.4;
        });
        //Add to the UI Layer
        this.addChild(this.textBox)
*/

        window.addEventListener('resize', () => {
            this.joinModal.resize(window.innerWidth, window.innerHeight)
        })

    }

    joinSession(){
        this.joinModalWidgetGroup.contentContainer.alpha = 0
        this.joinModal.alpha = 0
        this.removeChild(this.joinModal)
    }

    getText() {
        return this.nameFieldInput.value;
    }
    
    clearText() {
        this.nameFieldInput.value = ""
        this.nameFieldInput.blur()
    }

    resize() {
        //this.UILayer.render()
        //this.resize(window.innerWidth, window.innerHeight);
    }

    update(){
        this.count++
        this.modalBackgroundGlow.alpha = 0.5 + Math.sin((this.count/20)) * 0.3;
    }


}

export default UIBuilder







        

        ///this.logo = new PUXI.Stage(window.innerWidth, window.innerHeight);
/*
        const version = cryptoRandomString({length: 10});
        const texty = new MultiStyleText('<logo>BIAS</logo>\n<white>○○○○</white>\n\n' + version + '_alpha \n\nbi-dimensi-\n-onal intimate \nambient space.', {
            "logo": {
                fontSize: "14px",
                letterSpacing: 6,
                leading: 200,
                lineHeight: 200,
                fontWeight: 500
            },
            "default": {
                fontFamily: "Helvetica",
                fontSize: "10px",
                fill: "#cccccc",
                valign: "middle",
                letterSpacing: 1.5,
                align: "left",
                fontWeight: 400
            },
            "white": {
                fill: "#ffffff",
                fontSize: '20px'
            },
            "red": {
                fill: "#ff0000",
                fontSize: '20px'
            },
            "blue": {
                fill: "#0000ff",
                fontSize: '20px'
            },
            "green": {
                fill: "#00ff00",
                fontSize: '20px'
            }
        });
        this.addChild(texty);
        texty.x = 10
        texty.y = 10



        const padding = 50

        const textWidth = (window.innerWidth / 2) - (padding*3)
        
        const style = new PIXI.TextStyle({
            fill: "white",
            fontFamily: "Helvetica, sans-serif",
            fontSize: 19,
            fontWeight: 300,
            lineHeight: 31,
            height: 100,
            lineJoin: "round",
            stroke: "#37ff00",
            whiteSpace: "normal",
            wordWrap: true,
            wordWrapWidth: textWidth
        })


        const text = new PUXI.TextWidget('BIAS: bi-dimensional intimate ambient space -space, where it could be played from various rooms, including the back room, to the other side. It would be a virtual environment for a full-time character and a companion with the same experience. This is the main point for us to make at the end of the story. What will the world look like in real-time? I will be creating the world of the character.  The story is set in a space between the two realms, and is very unique in general but of course I have never been seen around  the world, and the world is too beautiful to be taken seriously. This project aims to have me that the character and the companions would not have the same experience at all.\n\n\n', style)
        
        const contentBox = new PUXI.ScrollWidget({
            scrollY: false,
            //scrollX: false,
            softness: 0,
            //height: 200,
            //radius: 45,
            expandMask: 0,
            //overflowY: -2000,
            scrollBars: false
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.5,
                height: 0.5,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )
        .setBackground(0xffffff)
        .setBackgroundAlpha(0.8)
        .setPadding(50, 50, 50, 50)
        .addChild(text)


        this.mockButton = new PUXI.Button({
            text: 'MENU',
        })
        .setLayoutOptions(new PUXI.FastLayoutOptions({
            width: PUXI.LayoutOptions.WRAP_CONTENT,
            height: PUXI.LayoutOptions.WRAP_CONTENT,
            x: 10,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.LEFT_ANCHOR,
        }))
        .setPadding(8)
        .setBackground(0xffffff)
        .setBackgroundAlpha(0.2)
        //.setElevation(4)
        this.mockButton.textWidget.textDisplay._style._fontSize = 12
        this.mockButton.textWidget.textDisplay._style._fontWeight = 700
        this.mockButton.textWidget.textDisplay._style._letterSpacing = 4
        this.mockButton.on('click', () => { 
            this.UILayer.addChild(contentBox)
            if(contentBox.alpha == 1) {
                contentBox.alpha = 0
            } else {
                contentBox.alpha = 1
            }
        });
        this.UILayer.addChild(this.mockButton);

        if (this.mockButton.isHover) {
            this.mockButton.setBackgroundAlpha(0.5)
            this.mockButton.cursor = 'pointer'
        } else {
            this.mockButton.setBackgroundAlpha(0.2)
        }
        \
        const mockTitle = new PUXI.TextWidget('PUXI Expo')
        .setBackground(new this.PIXI.Graphics()
            .beginFill(0xabcdef)
            .drawRoundedRect(0, 0, 20, 10, 2)
            .endFill())
        .setPadding(8, 8, 8, 8);


*/

        
