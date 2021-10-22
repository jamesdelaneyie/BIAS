
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
import { AsciiFilter } from '@pixi/filter-ascii'
import * as particles from 'pixi-particles'
import * as particleSettings from "./emitter.json";
import { WebfontLoaderPlugin } from "pixi-webfont-loader";
import { ease } from 'pixi-ease'
import TaggedText from 'pixi-tagged-text'
import { Graphics } from 'pixi.js';


function opacityRatio(image) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 260;
    canvas.height = 260;
    context.drawImage(image, 0, 0);
    console.log(image)
    const data = context.getImageData(0, 0, 260, 260).data;
    let opacity = 0;
    for (let i = 0; i < data.length; i += 4) {
        opacity += data[i + 3];
    }
    return (opacity / 255) / (data.length / 4);
}


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

        this.backbackbackground = new PIXI.Container()
        this.backbackground = new PIXI.Container()
        this.background = new PIXI.Container()
      
        

        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()
        this.foreforeground = new PIXI.Container()

       // let Loader = new PIXI.Loader()


        

        PIXI.Loader.registerPlugin(WebfontLoaderPlugin);

        PIXI.Loader.shared.add({ name: "css", url: "/css/styles-v0.0.1.css" });
	    PIXI.Loader.shared.add({ name: "light", url: "/fonts/TradeGothicNextLTPro-Lt.woff2" });
        PIXI.Loader.shared.add({ name: "regular", url: "/fonts/TradeGothicNextLTPro-Rg.woff2" });
        PIXI.Loader.shared.add({ name: "bold", url: "/fonts/TradeGothicNextLTPro-Bd.woff2" });
        PIXI.Loader.shared.add({ name: "heavy", url: "/fonts/TradeGothicNextLTPro-Hv.woff2" });
        PIXI.Loader.shared.add({ name: "italic", url: "/fonts/TradeGothicNextLTPro-It.woff2" });
        PIXI.Loader.shared.add({ name: "darkMatters", url: "/fonts/VG5000-Regular_web.woff2" });

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
            fill : "white",
            align: "center"
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




            this.displacementSprite = PIXI.Sprite.from('images/displacement-1.png')
            this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
            this.displacementFilterText1 = new PIXI.filters.DisplacementFilter(this.displacementSprite)
            this.displacementFilterText1.padding = 200


            
            
            this.mushonTitle = new TaggedText("Normalizi.ng\n<title>HOW DO <bold>NORMAL</bold> POEPLE LOOK LIKE?</title>", {
                "default": {
                    fontFamily: 'American Typewriter,monospace',
                    fill: 0x6b378f, 
                    fontWeight: 400,
                    fontSize: "32px",
                    lineHeight: 32,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: 200
                },"title": {
                    fontFamily: "sans-serif",
                    fill: 0x000000,
                    fontSize: "10px"
                }, "bold": {
                    fontWeight: 700
                }
            })

            this.mushonTitle.x = 3280,
            this.mushonTitle.y = 1020
            this.background.addChild(this.mushonTitle)

            var verticalNoRepeat = {
                fill: ['#ff4d5f','#70108e'],
                fillGradientStops: [0, 1],
                fontSize: 40,
                fontFamily: "VG",
                fontWeight: 400,
                lineHeight: 35,
                wordWrap: true,
                wordWrapWidth: 200,
                letterSpacing: 4,
                align: "center",
            }

            var textVerticalNoRepeat = new PIXI.Text('Dark\nMatters', verticalNoRepeat);
            textVerticalNoRepeat.x = 3940,
            textVerticalNoRepeat.y = 2940
            textVerticalNoRepeat.alpha = 0.7
            this.background.addChild(textVerticalNoRepeat)

        


            //Jo's Quote
            this.floorQuote1 = new TaggedText("“We need to normalize the idea that technology itself is not neutral.”\n\n                   - Mutale Nkonde", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 700,
                    fontSize: "30px",
                    lineHeight: 32,
                    leading: 1,
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 500
                }
            })

            this.floorQuote1.x = 2559
            this.floorQuote1.y = 2199
            this.floorQuote1.alpha = 0
            this.backbackground.addChild(this.floorQuote1)
            this.floorQuote1.filters = [this.displacementFilterText1]



            // Libby Quote
            this.floorQuote2 = new TaggedText("“Zeros and ones, if we are not careful, could deepen the divides between haves and have-nots, between the deserving and the undeserving – rusty value judgments embedded in shiny new systems.” \n\n                                       — Ruha Benjamin", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: 26,
                    leading: 1,
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 500
                }
            })
            
            
            this.floorQuote2.x = 720
            this.floorQuote2.y = 1450
            this.floorQuote2.alpha = 0
            this.background.addChild(this.floorQuote2)
            this.floorQuote2.filters = [this.displacementFilterText1]





            // Noah Quote
            this.floorQuote3 = new TaggedText(" “If Kindle is upgraded with face recognition and biometric sensors, it can know what made you laugh, what made you sad and what made you angry. Soon, books will read you while you are reading them.” \n\n                                       — Yuval Noah Harari", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: 22,
                    leading: 1,
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 400
                }
            })


            this.floorQuote3.x = 1400
            this.floorQuote3.y = 2129
            this.floorQuote3.alpha = 0
            this.backbackground.addChild(this.floorQuote3)
            this.floorQuote3.filters = [this.displacementFilterText1]



            // Noah Quote
            this.floorQuote4 = new TaggedText("There is no such thing as an innocent reading, we must ask what reading we are guilty of.” \n\n                                       ― Louis Althusser", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: 26,
                    leading: 1,
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 420
                }
            })


            this.floorQuote4.x = 3143
            this.floorQuote4.y = 1410
            this.floorQuote4.alpha = 0
            this.backbackground.addChild(this.floorQuote4)
            this.floorQuote4.filters = [this.displacementFilterText1]


            for(let x=1; x<13; x++) {
                let squareGraphic = new Graphics()
                let randomWidth = Math.floor(Math.random() * 10)
                squareGraphic.lineStyle(randomWidth, 0xFFFFFF)
                squareGraphic.drawRect(0,0,45,45)
                let randomX = Math.floor(Math.random() * 12) + 1
                let randomY = Math.floor(Math.random() * 12) + 1
                squareGraphic.x = 2910 + (randomX* 59)
                squareGraphic.y = 300 + (randomY* 59)
                this.background.addChild(squareGraphic)
    
                let randomFace1 = Math.floor(Math.random() * 10)
                let randomFace2 = Math.floor(Math.random() * 10)
    
                let sprite = new PIXI.Sprite.from("https://normalizing-us-files.fra1.cdn.digitaloceanspaces.com/feature-tiles/3/faces/8/"+randomFace1+"/"+randomFace2+"")
               

                var img2 = new Image();
                img2.crossOrigin='anonymous'
                img2.src="https://normalizing-us-files.fra1.cdn.digitaloceanspaces.com/feature-tiles/3/faces/8/"+randomFace1+"/"+randomFace2+"";

                setTimeout(function(){
                    let isImage = opacityRatio(img2)
                    console.log("image: "+isImage)
                }, 1000)

                
    
                sprite.width = 45
                sprite.height = 45
                sprite.x = 2910 + (randomX* 59)
                sprite.y = 300 + (randomY* 59)
                this.background.addChild(sprite)

                if(x == 7) {
                    this.spriteShader = new PIXI.Graphics()
                    this.spriteShader.x = 2910 + (randomX* 59)
                    this.spriteShader.y = 300 + (randomY* 59)
                    this.spriteShader.width = 55
                    this.spriteShader.height = 55
                    this.spriteShader.beginFill(0xFFFFFF)
                    this.spriteShader.drawRect(0,0,45,45)
                    this.spriteShader.endFill()
                    this.spriteShader.alpha = 0
                    this.background.addChild(this.spriteShader)
                }
                
            }
    
            for(let x=1; x<13; x++) {

                let randomX = Math.floor(Math.random() * 12) + 1
                let randomY = Math.floor(Math.random() * 12) + 1
                
                if(randomX > 6 && randomX < 10) {
                    console.log('skipping')
                    continue
                }


                let squareGraphic = new Graphics()
                let randomWidth = Math.floor(Math.random() * 10)
                squareGraphic.lineStyle(randomWidth, 0xFFFFFF)
                squareGraphic.drawRect(0,0,45,45)
               
                squareGraphic.x = 2910 + (randomX* 59)
                squareGraphic.y = 300 + (randomY* 59)
                this.background.addChild(squareGraphic)
    
                let randomFace1 = Math.floor(Math.random() * 10)
                let randomFace2 = Math.floor(Math.random() * 10)
    
                let sprite = new PIXI.Sprite.from("https://normalizing-us-files.fra1.cdn.digitaloceanspaces.com/feature-tiles/3/faces/8/"+randomFace1+"/"+randomFace2+"")
               

                var img2 = new Image();
                img2.crossOrigin='anonymous'
                img2.src="https://normalizing-us-files.fra1.cdn.digitaloceanspaces.com/feature-tiles/3/faces/8/"+randomFace1+"/"+randomFace2+"";

                setTimeout(function(){
                    let isImage = opacityRatio(img2)
                    //console.log("image: "+isImage)
                }, 1000)

                
    
                sprite.width = 45
                sprite.height = 45
                sprite.x = 2910 + (randomX* 59)
                sprite.y = 300 + (randomY* 59)
                this.background.addChild(sprite)

                if(x == 7 || x == 8) {
                    this.spriteShader = new PIXI.Graphics()
                    this.spriteShader.x = 2910 + (randomX* 59)
                    this.spriteShader.y = 300 + (randomY* 59)
                    this.spriteShader.width = 55
                    this.spriteShader.height = 55
                    this.spriteShader.beginFill(0xFFFFFF)
                    this.spriteShader.drawRect(0,0,45,45)
                    this.spriteShader.endFill()
                    this.spriteShader.alpha = 0
                    this.background.addChild(this.spriteShader)
                }
                
            }





            //If Kindle is upgraded with face recognition and biometric sensors, it can know what made you laugh, what made you sad and what made you angry. Soon, books will read you while you are reading them.” - Yuval Noah Harari

            
        })

        PIXI.Loader.shared.load();

        

        this.cameraWrapper = new PIXI.Container()
        this.cameraWrapper.addChild(this.backbackbackground)
        this.cameraWrapper.addChild(this.backbackground)
        this.cameraWrapper.addChild(this.background)
        this.cameraWrapper.addChild(this.middleground)
        this.cameraWrapper.addChild(this.foreground)
        this.cameraWrapper.addChild(this.foreforeground)
        

        this.noise = new PIXI.filters.NoiseFilter(0.01, 0.2893);
        //this.stage.filters = [this.noise]

        this.camera.x = 2063
        this.camera.y = 1658
        this.camera.addChild(this.cameraWrapper)

        this.stage.addChild(this.camera)
        

        
        this.stage.addChild(this.loadingBar)
        this.stage.addChild(this.loadingText)
        
        
        
        
        
        
        
        
        
        
        const fpsCounter = new PixiFps();
        this.stage.addChild(fpsCounter)

        this.particleContainer = new PIXI.ParticleContainer()
        this.foreground.addChild(this.particleContainer)

        //console.log(particleSettings.default)

        //this.emitter = new particles.Emitter(this.particleContainer, new PIXI.Texture.from("images/particle.png"), particleSettings.default);
        //this.emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
        //this.emitter.updateSpawnPos(800, 1300);
        //this.emitter.emit = true;

        let roughLayout = new PIXI.Sprite.from('/images/world-map.svg')
        roughLayout.x = 0
        roughLayout.y = 0
        this.backbackground.addChild(roughLayout)

       

        let lobbyFloor = new PIXI.Sprite.from('/images/lobby-background.svg')
        lobbyFloor.x = 1481
        lobbyFloor.y = 1180
        this.backbackground.addChild(lobbyFloor)



        this.videoTexture = PIXI.Texture.from('/video/inspace-jo1.mp4');
        this.videoTexture.baseTexture.resource.source.muted = true
        this.videoTexture.baseTexture.resource.source.loop = true
        this.videoTexture.baseTexture.resource.source.playsinline = true
        this.videoTexture.baseTexture.resource.autoPlay = true
        this.videoTexture.baseTexture.resource.volume = 0

        this.displacementSprite = PIXI.Sprite.from('images/displacement-1.png')
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)

        this.displacementFilter.padding = 0

        const video = this.videoTexture.baseTexture.resource.source
        video.muted = true
        video.playbackRate = 0.5;

        const videoSprite = new PIXI.Sprite(this.videoTexture);

        videoSprite.width = 436 //.width;
        videoSprite.height = 532//state.height;
        
        videoSprite.x = 3769//&y=
        videoSprite.y = 2433
        videoSprite.blendMode = PIXI.BLEND_MODES.SCREEN
        this.foreground.addChild(videoSprite);

        let firstFloor = new PIXI.Sprite.from('/images/1st-floor.svg')
        firstFloor.x = 0
        firstFloor.y = 0
        this.foreforeground.addChild(firstFloor)

        //inspace-jo.mp4


       
        this.count = 0


        
      





        this.chars = '01'
        this.charsArray = this.chars.split('')
        this.drops = []
        this.fontSize = 10,
        this.numberOfColumns = window.innerWidth / this.fontSize,
        this.matrixCounter
        this.randomChar;


        for (let i = 0; i < this.numberOfColumns; i++) {
            this.drops[i] = 0;
        }

        

        



      
    

      
      


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

    updateMatrix() {
        //console.log('checker')

        ///ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        //ctx.fillStyle = 'green';
        //ctx.font = FONT_SIZE + 'px arial';
        
        /*for (let i = 0; i < this.drops.length; i++) {

            let randomChar = this.charsArray[Math.floor( Math.random() * this.chars.length )];
            
            let text = new PIXI.Text(randomChar, {fontSize: 10})
            text.x = this.fontSize * this.matrixCounter
            text.y = this.drops[i] * this.fontSize
            //this.foreground.addChild(text)
            
            if (this.drops[i] * this.fontSize > window.innerHeight && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }*/
        
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

        this.updateMatrix()
       
       
        if(this.UIBuilder) {
            this.UIBuilder.update(delta)
        }

        //this.emitter.update(delta)
        this.count++

        this.displacementSprite.y = delta*500
        this.displacementSprite.x = delta*500
        this.renderer.render(this.stage)

        if(this.count > 360) {
            this.spriteShader.alpha = 0.1 + Math.sin((this.count/10)) * 0.1;

        }
        

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
