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


         // Showcase scrolling widget
        const mockScroll = new PUXI.ScrollWidget({
            scrollY: true,
            scrollBars: true,
        }).setBackground(0xffaabb)
        .setBackgroundAlpha(0.5)
        .setElevation(10)
        //this.uxStage.addChild(mockScroll)

        const frame = new PIXI.Graphics({
            x: 5,
            y: 5            
        })

        const textStyle = new PIXI.TextStyle({
            fill: 0xffffff,
        });
        const words = new PUXI.TextWidget('Hello World', textStyle).setBackground(0xffffff).setBackgroundAlpha(0.5);
        words.tint = 0xffffff
       
        const version = cryptoRandomString({length: 10});
        const texty = new MultiStyleText('<logo>BIAS</logo>\n<white>○○○○</white>\n\n' + version + '_alpha \n\nbi-dimensional \nintimate ambient \nspace', {
            "logo": {
                fontSize: "14px",
                letterSpacing: 4,
                leading: 200,
                lineHeight: 200,
                fontWeight: 600
            },
            "default": {
                fontFamily: "Helvetica",
                fontSize: "10px",
                fill: "#cccccc",
                valign: "middle",
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

        // Add rounded button in center
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
        this.mockButton.textWidget.textDisplay._style._fontSize = 14
        this.mockButton.textWidget.textDisplay._style._fontWeight = 700
        this.mockButton.textWidget.textDisplay._style._letterSpacing = 2
        this.mockButton.on('hover', () => { 
            this.mockButton.setBackgroundAlpha(0.5) 
        });


        this.uiLayer.addChild(this.mockButton);

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
        })

        // Move physics bodies forward in time
        this.world.step(1/20);

        for (var i = this.collection.length - 1; i >= 0; i--) {
            var graphic = this.collection[i];
            if (graphic.body.world && graphic.shape.type == p2.Shape.CIRCLE) {
                var x = this.world.bodies[i+2].position[0];
                var y = this.world.bodies[i+2].position[1];
                graphic.position.set(x,y)
            }
        }

        this.renderer.render(this.stage)
    }
}

export default PIXIRenderer
