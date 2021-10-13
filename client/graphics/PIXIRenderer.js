
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
import { AsciiFilter } from '@pixi/filter-ascii'
import * as particles from 'pixi-particles'
import * as particleSettings from "./emitter.json";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { ease } from 'pixi-ease'

class PIXIRenderer {

    constructor(client) {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.collection = []

        let resolution = window.devicePixelRatio

        PIXI.utils.skipHello();
        PIXI.settings.ROUND_PIXELS = true
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            antialias: true,
            resolution: resolution
        })

        
       
        

        this.stage = new PIXI.Container()
        this.camera = new PIXI.Container()

        this.background = new PIXI.Container()
        this.backbackground = new PIXI.Container()
        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()

       // let Loader = new PIXI.Loader()


        

        PIXI.Loader.registerPlugin(WebfontLoaderPlugin);

        PIXI.Loader.shared.add({ name: "css", url: "/css/styles-v0.0.1.css" });
	    PIXI.Loader.shared.add({ name: "light", url: "/fonts/TradeGothicNextLTPro-Lt.woff2" });
        PIXI.Loader.shared.add({ name: "regular", url: "/fonts/TradeGothicNextLTPro-Rg.woff2" });
        PIXI.Loader.shared.add({ name: "bold", url: "/fonts/TradeGothicNextLTPro-Bd.woff2" });
        PIXI.Loader.shared.add({ name: "heavy", url: "/fonts/TradeGothicNextLTPro-Hv.woff2" });
        PIXI.Loader.shared.add({ name: "italic", url: "/fonts/TradeGothicNextLTPro-It.woff2" });

        PIXI.Loader.shared.add({ name: "avatarBackground1", url: "images/avatars/avatar-background-1.svg" });
        PIXI.Loader.shared.add({ name: "avatarBackground2", url: "images/avatars/avatar-background-2.svg" });
        PIXI.Loader.shared.add({ name: "avatarBackground3", url: "images/avatars/avatar-background-3.svg" });
        PIXI.Loader.shared.add({ name: "avatarBackground4", url: "images/avatars/avatar-background-4.svg" });
        PIXI.Loader.shared.add({ name: "avatarBackground5", url: "images/avatars/avatar-background-5.svg" });
        PIXI.Loader.shared.add({ name: "avatarBackground6", url: "images/avatars/avatar-background-6.svg" });
        
        PIXI.Loader.shared.add({ name: "avatarMiddleground1", url: "images/avatars/avatar-middleground-1.svg" });
        PIXI.Loader.shared.add({ name: "avatarMiddleground2", url: "images/avatars/avatar-middleground-2.svg" });
        PIXI.Loader.shared.add({ name: "avatarMiddleground3", url: "images/avatars/avatar-middleground-3.svg" });
        PIXI.Loader.shared.add({ name: "avatarMiddleground4", url: "images/avatars/avatar-middleground-4.svg" });
        PIXI.Loader.shared.add({ name: "avatarMiddleground5", url: "images/avatars/avatar-middleground-5.svg" });
        PIXI.Loader.shared.add({ name: "avatarMiddleground6", url: "images/avatars/avatar-middleground-6.svg" });
        
        PIXI.Loader.shared.add({ name: "avatarForeground1", url: "images/avatars/avatar-frontground-1.svg" });
        PIXI.Loader.shared.add({ name: "avatarForeground2", url: "images/avatars/avatar-frontground-2.svg" });
        PIXI.Loader.shared.add({ name: "avatarForeground3", url: "images/avatars/avatar-frontground-3.svg" });
        PIXI.Loader.shared.add({ name: "avatarForeground4", url: "images/avatars/avatar-frontground-4.svg" });
        PIXI.Loader.shared.add({ name: "avatarForeground5", url: "images/avatars/avatar-frontground-5.svg" });
        PIXI.Loader.shared.add({ name: "avatarForeground6", url: "images/avatars/avatar-frontground-6.svg" });

        //UI ICONS
        PIXI.Loader.shared.add({ name: "sg-logo-white-raster", url: "images/sg-logo-raster.png" })
        PIXI.Loader.shared.add({ name: "scienceGalleryLogoWhite", url: "images/sg-white.svg" })
        PIXI.Loader.shared.add({ name: "menuIcon", url: "images/menu-icon.svg" })
        PIXI.Loader.shared.add({ name: "menuIconClose", url: "images/menu-icon-close.svg" })

        PIXI.Loader.shared.add({ name: "loadingIcon", url: "images/loading-icon.svg" })
        PIXI.Loader.shared.add({ name: "mapIcon", url: "images/map-icon.svg" })

        //'images/sg-white.svg'
        //'images/menu-icon.svg'
        //'images/menu-icon-close.svg')
        //'images/menu-icon.svg'
        //'images/sound-on-icon.svg'
        //'images/sound-off-icon.svg'
        //'images/sound-on-icon.svg'
        //'images/share-icon.svg'
        //'images/twitter-icon.svg'
        //'images/facebook-icon.svg'

       // PIXI.Loader.shared.add({ name: "Loading File", url: "100MiB.bin" });
        

        this.loadingText = new PIXI.Text("Loading 0%", {
            fontFamily : 'Arial',
            fontSize: 21,
            fill : "white"
        });
        this.loadingText.anchor.set(0.5, 0.5);
        this.loadingText.position.set(window.innerWidth/2,window.innerHeight/2)
        let loadingTextyPos = this.loadingText.y
        
        this.loadingBar = new PIXI.Graphics()
        this.loadingBar.lineStyle(0)
        this.loadingBar.beginFill(0x00FF00, 1.0, true)
        this.loadingBar.drawRect(0,0,1,10)
        this.loadingBar.endFill()
        this.loadingBar.x = window.innerWidth/2 - 100
        this.loadingBar.y = window.innerHeight/2 + 25
        let loadingBaryPos = this.loadingBar.y
      
       


        PIXI.Loader.shared.onProgress.add(() => {
            this.loadingText.text = "Loading " + PIXI.Loader.shared.progress.toFixed(0) + "%";
            this.loadingBar.width = PIXI.Loader.shared.progress.toFixed(0)*2
        });

        const Stage = this.stage

        PIXI.Loader.shared.onComplete.once(() => {
            this.loadingText.text = "100% Complete";
            this.UIBuilder = new UIBuilder(this.renderer, client)
            this.UIBuilder.alpha = 0
            this.stage.addChild(this.UIBuilder) 

           

            ease.add(this.loadingText, {alpha: 0, y: loadingTextyPos + 5}, { duration: 250, ease: 'easeOutExpo', wait: 250})
            ease.add(this.loadingBar, {alpha: 0, y: loadingBaryPos - 5}, { duration: 250, ease: 'easeOutExpo', wait: 250})

            ease.add(this.UIBuilder, {alpha: 1 }, { duration: 0, ease: 'easeOutExpo', wait: 250})

            setTimeout(function(){
                Stage.removeChild(this.loadingText)
                Stage.removeChild(this.loadingBar)
            }, 500)

            
            
        })

        PIXI.Loader.shared.load();

        

        this.cameraWrapper = new PIXI.Container()

        this.cameraWrapper.addChild(this.backbackground)
        this.cameraWrapper.addChild(this.background)
        this.cameraWrapper.addChild(this.middleground)
        this.cameraWrapper.addChild(this.foreground)
        

        this.noise = new PIXI.filters.NoiseFilter(0.01, 0.2893);
        //this.stage.filters = [this.noise]

        this.camera.x = 2063
        this.camera.y = 1658
        this.camera.addChild(this.cameraWrapper)

        this.stage.addChild(this.camera)
        

        
        this.stage.addChild(this.loadingBar)
        this.stage.addChild(this.loadingText)
        
        
        
        
        
        
        
        
        
        
        const fpsCounter = new PixiFps();
        //this.stage.addChild(fpsCounter)

        this.particleContainer = new PIXI.ParticleContainer()
        this.foreground.addChild(this.particleContainer)

        //console.log(particleSettings.default)

        this.emitter = new particles.Emitter(this.particleContainer, new PIXI.Texture.from("images/particle.png"), particleSettings.default);
        this.emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
        this.emitter.updateSpawnPos(800, 1300);
        //this.emitter.emit = true;


        /*let lobbyFloor = new PIXI.Sprite.from('/images/lobbyFloor.svg')
        lobbyFloor.x = 1700
        lobbyFloor.y = 800
        this.backbackground.addChild(lobbyFloor)
        lobbyFloor.width = 1000
        lobbyFloor.height = 1000*/

        let scienceGalleryLogo = new PIXI.Sprite.from('/images/sg-white.svg')
        scienceGalleryLogo.x = 2100
        scienceGalleryLogo.y = 1200
        scienceGalleryLogo.width = 175
        scienceGalleryLogo.height = 85
        //this.middleground.addChild(scienceGalleryLogo)

      
      


        // Start the update
        //update();
/*

        
        //FISHIES
        this.fishCountOne = 7;
        this.fishCountTwo = 2;
        this.fishes = [];
        this.bounds = new PIXI.Rectangle(
            0,
            0,
            window.innerWidth + 500,
            window.innerHeight + 500,
        );

        for (let i = 0; i < this.fishCountOne; i++){
            const fish = new PIXI.Sprite.from('images/fish.svg');

            fish.anchor.set(0.5);

            fish.direction = Math.random() * Math.PI * 2;
            fish.speed = 2 + (Math.random() * 2);
            fish.turnSpeed = Math.random() - 0.8;

            fish.x = Math.random() * 1000;
            fish.y = Math.random() * 1000;

            fish.scale.set(0.3 + (Math.random() * 0.8));
            //this.backbackground.addChild(fish);
            fish.alpha = 0.5
            //this.fishes.push(fish)
        }

        for (let i = 0; i < this.fishCountTwo; i++){
            const fish = new PIXI.Sprite.from('images/fish-white.svg');

            fish.anchor.set(0.5);

            fish.direction = Math.random() * Math.PI * 2;
            fish.speed = 2 + (Math.random() * 2);
            fish.turnSpeed = Math.random() - 0.8;

            fish.x = Math.random() * 1000;
            fish.y = Math.random() * 1000;
            fish.alpha = 0.2

            fish.scale.set(2.3 + (Math.random() * 0.8));
            //this.backbackground.addChild(fish);
            //this.fishes.push(fish);
        }

*/
        
        this.ascaiiFilter = new AsciiFilter()
        
        this.displacementSprite = PIXI.Sprite.from('images/displacement-3.png');
	    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
        this.displacementFilter.padding = 50
        
        


        
        window.addEventListener('resize', () => {
            this.resize()
        })
    }


    
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)

        if(this.loadingText.visible == true) {
            this.loadingText.position.set(window.innerWidth/2,window.innerHeight/2);
            this.loadingBar.x = window.innerWidth/2 - 100
            this.loadingBar.y = window.innerHeight/2 + 25
        }

        const userInterface = this.UIBuilder
        clearTimeout(resizeTimer);
        var resizeTimer = setTimeout(function() {
      
            if(userInterface) {
                console.log('resize')
                userInterface.resize(window.innerWidth, window.innerHeight)
            }
                  
        }, 250);
      

        
        
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

    toLocalCoordinates(x, y) {
        let width = window.innerWidth/2
        let height = window.innerHeight/2
        let cameraX = this.camera.x*-1
        let cameraY = this.camera.y*-1

        return {
            x: x - (cameraX ),
            y: y - (cameraY )
        }
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
       
       
        if(this.UIBuilder) {
            this.UIBuilder.update(delta)
        }

        //this.emitter.update(delta)

        this.displacementSprite.y = delta*500
        this.displacementSprite.x = delta*500
        this.renderer.render(this.stage)
        

        //this.backbackground.filters =  [this.ascaiiFilter, this.displacementFilter]

/*
        for (let i = 0; i < this.fishes.length; i++) {
            const fish = this.fishes[i];

            fish.direction += fish.turnSpeed * 0.01;

            fish.x += Math.sin(fish.direction) * fish.speed;
            fish.y += Math.cos(fish.direction) * fish.speed;

            fish.rotation = -fish.direction - (Math.PI / 2);

            if (fish.x < this.bounds.x)
            {
                fish.x += this.bounds.width;
            }
            if (fish.x > this.bounds.x + this.bounds.width)
            {
                fish.x -= this.bounds.width;
            }
            if (fish.y < this.bounds.y)
            {
                fish.y += this.bounds.height;
            }
            if (fish.y > this.bounds.y + this.bounds.height)
            {
                fish.y -= this.bounds.height;
            }
        }*/
    }
}

export default PIXIRenderer
