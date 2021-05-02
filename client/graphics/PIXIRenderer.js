import p2 from 'p2'
import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import BackgroundGrid from './BackgroundGrid.js'

import { CRTFilter } from '@pixi/filter-crt'
import { EmoteSelector } from 'pixi-emote-selector'
import MultiStyleText from 'pixi-multistyle-text'
import cryptoRandomString from 'crypto-random-string'
import { TypeFlags } from 'typescript'



class PIXIRenderer {

    constructor() {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.world = new p2.World({gravity: [0, 9.82]});
        this.collection = []

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            autoDensity: true,
            antialias: true,
            transparent: false,
            resolution: 2
        })


        this.stage = new PIXI.Container()
        this.camera = new PIXI.Container()

        this.background = new PIXI.Container()
        this.background.addChild(new BackgroundGrid())

        const blurFilter1 = new CRTFilter(1);
        //this.background.filters = [blurFilter1];


        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()

        const emoteSelector = new EmoteSelector({
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

        this.camera.addChild(this.background)
        this.camera.addChild(this.middleground)
        this.camera.addChild(this.foreground)

        this.stage.addChild(this.camera)
        
        //Build UI
        this.uiLayer = new PUXI.Stage(window.innerWidth, window.innerHeight);
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
        this.stage.addChild(texty)
        texty.x = 10
        texty.y = 10

        // Add button in center
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
            if(contentBox.alpha == 1) {
                contentBox.alpha = 0
            } else {
                contentBox.alpha = 1
            }
        });
        this.uiLayer.addChild(this.mockButton);

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

        const text = new PUXI.TextWidget('BIAS: bi-dimensional intimate ambient space -space, where it could be played from various rooms, including the back room, to the other side. It would be a virtual environment for a full-time character and a companion with the same experience. This is the main point for us to make at the end of the story. What will the world look like in real-time? I will be creating the world of the character.  The story is set in a space between the two realms, and is very unique in general but of course I have never been seen around  the world, and the world is too beautiful to be taken seriously. This project aims to have me that the character and the companions would not have the same experience at all.\n\n\n', style)
        this.uiLayer.addChild(text)
        
        const contentBox = new PUXI.ScrollWidget({
            scrollY: true,
            //scrollX: false,
            softness: 0,
            //height: 200,
            //radius: 45,
            expandMask: 0,
            //overflowY: -2000,
            scrollBars: true
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
        contentBox.alpha = 0
        this.uiLayer.addChild(contentBox)

        this.stage.addChild(this.uiLayer)

        window.addEventListener('resize', () => {
            this.resize()
        })

        this.resize()
    }


    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
    }
 
    centerCamera(entity) {
        this.camera.x = -entity.x + 0.5 * window.innerWidth
        this.camera.y = -entity.y + 0.5 * window.innerHeight
    }

    followSmoothlyWithCamera(entity, delta) {
        const cameraSpeed = 5
        const targetX = -entity.x + 0.5 * window.innerWidth
        const targetY = -entity.y + 0.5 * window.innerHeight
        const dx = targetX - this.camera.x
        const dy = targetY - this.camera.y
        this.camera.x += dx * cameraSpeed * delta
        this.camera.y += dy * cameraSpeed * delta
    }

    toWorldCoordinates(mouseX, mouseY) {
        return {
            x: -this.camera.x + mouseX,
            y: -this.camera.y + mouseY
        }
    }

    update(delta) {
        this.entities.forEach(entity => {
            entity.update(delta)
            ///console.log(entity);
        })

        if (this.mockButton.isHover) {
            this.mockButton.setBackgroundAlpha(0.5)
            this.mockButton.cursor = 'pointer'
        } else {
            this.mockButton.setBackgroundAlpha(0.2)
        }
        

        this.renderer.render(this.stage)
    }
}

export default PIXIRenderer
