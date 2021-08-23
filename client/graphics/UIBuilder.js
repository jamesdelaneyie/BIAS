import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import isMobile from 'ismobilejs'
import MultiStyleText from 'pixi-multistyle-text'
import cryptoRandomString from 'crypto-random-string'

class UIBuilder extends PIXI.Container {
    constructor() {
        super()

        
        //Background Layer for joining
        const joinWrapper = new PIXI.Graphics()
        joinWrapper.beginFill();
        joinWrapper.drawRect(0, 0, window.innerWidth, window.innerHeight);
        joinWrapper.endFill()
        joinWrapper.alpha = 0.8
        this.addChild(joinWrapper);


        const joinModal = new PUXI.Widget();
        

        

        // Chat Text Entry Element 
        this.textBox = new PUXI.Stage(500, 45)   
        this.textBox.x = 200

        //Text Styles for Input and Placeholder
        const textStyles = new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "#000000", 
            fontSize: 18, 
            fontWeight: 300
        })
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






        // Create basic command UI panel
        const commandPanelWidth = 100
        const commandPanelHeight = 30
        const commandPanelPositioning = 20
        const commandPanelPadding = 10
        const commandPanelButtonHeight = 30

        this.commandPanel = new PUXI.Stage(commandPanelWidth, commandPanelHeight+(commandPanelPadding*2))   
        this.commandPanel.x = window.innerWidth - (commandPanelWidth + commandPanelPositioning)
        this.commandPanel.y = commandPanelPositioning 
        this.commandPanel.buttonMode = true;
        
        //Join Button 
        const joinButton = new PUXI.Button({
            text: ''
        }).setLayoutOptions(new PUXI.FastLayoutOptions({
            width: commandPanelWidth - (commandPanelPadding*2),
            height: commandPanelButtonHeight,
            x: commandPanelPadding,
            y: commandPanelPadding
        }))
        .setBackground(0xffffff)
        .setBackgroundAlpha(1)
       
        this.commandPanel.addChild(joinButton)
        this.addChild(this.commandPanel)

        const buttonStyles = new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "#000000", 
            fontSize: 16, 
            fontWeight: 700,
            letterSpacing: 2
        })
        const joinText = new PUXI.TextWidget('JOIN', buttonStyles)
        joinText.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: PUXI.LayoutOptions.WRAP_CONTENT,
            height: commandPanelHeight,
            x: 0.5,
            y: commandPanelHeight + 1,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR
        }))
        joinText.tint = 0xFFFFFF
        this.commandPanel.addChild(joinText)


        const buttonStylesTwo = new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "#FFFFFF", 
            fontSize: 15, 
            fontWeight: 700,
            letterSpacing: 2
        })
        const joinTextTwo = new PUXI.TextWidget('JOIN', buttonStylesTwo)
        joinTextTwo.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: PUXI.LayoutOptions.WRAP_CONTENT,
            height: commandPanelHeight,
            x: 0.5,
            y: commandPanelHeight + 1,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR
        }))
        joinTextTwo.tint = 0xFFFFFF
        joinTextTwo.alpha = 0;
        this.commandPanel.addChild(joinTextTwo)

        joinButton.on("hover", function (over) {
            if(over == true) {
                this.setBackground("#FFFF00")
            } else {
                this.setBackground("#FFFFFF")
            }
        });


        const joinButtonClick = new PUXI.ClickManager(joinButton, true, false, false)
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



        window.addEventListener('resize', () => {
            this.resize()
        })

    }
    
    onPointerOver() {
        console.log('tester')
    }

    getText() {
        return this.mockInput.value;
    }
    
    clearText() {
        this.mockInput.value = ""
        this.mockInput.blur()
    }

    resize() {
        this.UILayer.resize(window.innerWidth, window.innerHeight);
    }

    update(){
        this.UILayer.render()
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

        
