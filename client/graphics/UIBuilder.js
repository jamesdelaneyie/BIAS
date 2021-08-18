import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import isMobile from 'ismobilejs'
import MultiStyleText from 'pixi-multistyle-text'
import cryptoRandomString from 'crypto-random-string'

class UIBuilder extends PIXI.Container {
    constructor() {
        super()

        this.UILayer = new PUXI.Stage(window.innerWidth, window.innerHeight)

        this.logo = new PUXI.Stage(window.innerWidth, window.innerHeight);

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


//const stage = app.stage.addChild(new PUXI.Stage(512, 512));

// Instead of creating a layout widget-group, you can add children
// directly to the stage. This is because Stage supports FastLayout
// natively.
       


        //

        
        /*const emoteSelector = new EmoteSelector({
            options: [
                PIXI.Sprite.from("emote_exclamation"),
                PIXI.Sprite.from("emote_laugh"),
                PIXI.Sprite.from("emote_sleeps"),
                PIXI.Sprite.from("emote_heart"),
            ],
            onItemSelected: (indexSelected) => {
                console.log("Item selected:", indexSelected);
                //statusText.text = `${itemSelected} selected.`;
            },
        });
		this.foreground.addChild(emoteSelector);
        
        const miniMap = new PIXI.Container(
            new PIXI.Graphics({
                
            })
        )

        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFFFFFF);
        graphics.drawRect(20, (window.innerHeight - 200), (window.innerWidth / 10), (window.innerHeight / 10));
*/
       //this.stage.addChild(graphics)



        const padding = 50

        const textWidth = (window.innerWidth / 2) - (padding*3)
        const textHeight = (window.innerHeight / 2) - (padding*2)
        
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

        const inputStyles = new PIXI.TextStyle({
            fill: "black",
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
        //this.UILayer.addChild(text)
        
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
        .setElevation(4)
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


        
    this.mockInput = new PUXI.TextInput({
        multiLine: false,
        background: 0xFFFFFF,
        value: "Type to talk",
        padding: 10,
        //multiLine: true,
        maxLength: 69,
        selectedColor: "#000000",
        selectedBackgroundColor: "#FFFFFF",
        caretWidth: 4,
        style: new PIXI.TextStyle({ 
            fontFamily: 'Roboto Mono',
            fill: "black", 
            fontSize: 18, 
            fontWeight: 300
        }),
    }).setLayoutOptions(
        new PUXI.FastLayoutOptions({
            width: 0.5, 
            height: 40,
            x: 0.25,
            y: 0.90,
        }),
    );

    this.UILayer.addChild(this.mockInput)


    this.mockInput.on('focus', () => { 
        console.log('TextInput focused!'); 
    });

    this.mockInput.on('blur', () => { 
        //console.log(this.mockInput.value); 
    });

    this.mockInput.on('keydown', () => { console.log('TextInput keydowned!'); });

    window.addEventListener('resize', () => {
        this.resize()
    })

    this.addChild(this.UILayer)

    this.UILayer.focusController.on('focusChanged', (next, prev) =>
        {
            if (next)
            {
                next.setBackground(0xddeeff);
            }
            if (prev)
            {
                prev.setBackground(0xfabcdf);
            }
        });

       

    }

    getText() {
        return this.mockInput.value;
        //console.log(this.mockInput.value)
    }
    
    clearText() {
        //this.mockInput.value = ""
        //console.log(this.mockInput.value)
    }

    resize() {
        this.UILayer.resize(window.innerWidth, window.innerHeight);
    }

    
    update(){

       // this.getText();

        if (this.mockButton.isHover) {
            this.mockButton.setBackgroundAlpha(0.5)
            this.mockButton.cursor = 'pointer'
        } else {
            this.mockButton.setBackgroundAlpha(0.2)
        }


    }


}

export default UIBuilder
