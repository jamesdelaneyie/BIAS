
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
import { AsciiFilter } from '@pixi/filter-ascii'
import * as particles from 'pixi-particles'
import * as particleSettings from "./emitter.json";
import { WebfontLoaderPlugin } from "pixi-webfont-loader"
import { ease } from 'pixi-ease'
import TaggedText from 'pixi-tagged-text'
import { Graphics } from 'pixi.js'
import { GlowFilter } from '@pixi/filter-glow'
import { Sound, filters } from '@pixi/sound'
import FireCommand from '../../common/command/FireCommand.js'





function opacityRatio(image) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 260;
    canvas.height = 260;
    context.drawImage(image, 0, 0);
    //console.log(image)
    const data = context.getImageData(0, 0, 260, 260).data;
    let opacity = 0;
    for (let i = 0; i < data.length; i += 4) {
        opacity += data[i + 3];
    }
    return (opacity / 255) / (data.length / 4);
}


class PIXIRenderer {

    constructor(client, state) {
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

        const cubeSprite = [ 
            "images/white-cube/layer_1.png",
            "images/white-cube/layer_2.png",
            "images/white-cube/layer_3.png",
            "images/white-cube/layer_4.png",
            "images/white-cube/layer_5.png",
            "images/white-cube/layer_6.png",
            "images/white-cube/layer_7.png",
            "images/white-cube/layer_8.png",
            "images/white-cube/layer_9.png",
            "images/white-cube/layer_10.png",
            "images/white-cube/layer_11.png",
            "images/white-cube/layer_12.png",
            "images/white-cube/layer_13.png",
            "images/white-cube/layer_14.png",
            "images/white-cube/layer_15.png",
            "images/white-cube/layer_16.png",
            "images/white-cube/layer_17.png",
            "images/white-cube/layer_18.png",
            "images/white-cube/layer_19.png",
            "images/white-cube/layer_20.png",
            "images/white-cube/layer_21.png",
            "images/white-cube/layer_22.png",
            "images/white-cube/layer_23.png",
            "images/white-cube/layer_24.png",
            "images/white-cube/layer_25.png",
            "images/white-cube/layer_26.png",
            "images/white-cube/layer_27.png",
            "images/white-cube/layer_28.png",
            "images/white-cube/layer_29.png",
            "images/white-cube/layer_30.png",
            "images/white-cube/layer_31.png",
            "images/white-cube/layer_32.png",
            "images/white-cube/layer_33.png",
            "images/white-cube/layer_34.png",
            "images/white-cube/layer_35.png",
            "images/white-cube/layer_36.png",
            "images/white-cube/layer_37.png",
            "images/white-cube/layer_38.png",
            "images/white-cube/layer_39.png",
            "images/white-cube/layer_40.png",
            "images/white-cube/layer_41.png",
            "images/white-cube/layer_42.png",
            "images/white-cube/layer_43.png",
            "images/white-cube/layer_44.png",
            "images/white-cube/layer_45.png",
            "images/white-cube/layer_46.png",
            "images/white-cube/layer_47.png",
            "images/white-cube/layer_48.png",
            "images/white-cube/layer_49.png",
            "images/white-cube/layer_50.png",
            "images/white-cube/layer_51.png",
            "images/white-cube/layer_52.png",
            "images/white-cube/layer_53.png",
            "images/white-cube/layer_54.png",
            "images/white-cube/layer_55.png",
            "images/white-cube/layer_56.png",
            "images/white-cube/layer_57.png",
            "images/white-cube/layer_58.png",
            "images/white-cube/layer_59.png",
            "images/white-cube/layer_60.png",
            "images/white-cube/layer_61.png",
            "images/white-cube/layer_62.png",
            "images/white-cube/layer_63.png",
            "images/white-cube/layer_64.png",
            "images/white-cube/layer_65.png",
            "images/white-cube/layer_66.png",
            "images/white-cube/layer_67.png",
            "images/white-cube/layer_68.png",
            "images/white-cube/layer_69.png",
            "images/white-cube/layer_70.png",
            "images/white-cube/layer_71.png",
            "images/white-cube/layer_72.png",
            "images/white-cube/layer_73.png",
            "images/white-cube/layer_74.png",
            "images/white-cube/layer_75.png",
            "images/white-cube/layer_76.png",
            "images/white-cube/layer_77.png",
            "images/white-cube/layer_78.png",
            "images/white-cube/layer_79.png",
            "images/white-cube/layer_80.png",
            "images/white-cube/layer_81.png",
            "images/white-cube/layer_82.png",
            "images/white-cube/layer_83.png",
            "images/white-cube/layer_84.png",
            "images/white-cube/layer_85.png",
            "images/white-cube/layer_86.png",
            "images/white-cube/layer_87.png",
            "images/white-cube/layer_88.png",
            "images/white-cube/layer_89.png",
            "images/white-cube/layer_90.png",
            "images/white-cube/layer_91.png",
            "images/white-cube/layer_92.png",
            "images/white-cube/layer_93.png",
            "images/white-cube/layer_94.png",
            "images/white-cube/layer_95.png",
            "images/white-cube/layer_96.png",
            "images/white-cube/layer_97.png",
            "images/white-cube/layer_98.png",
            "images/white-cube/layer_99.png",
            "images/white-cube/layer_100.png",
            "images/white-cube/layer_101.png",
            "images/white-cube/layer_102.png",
            "images/white-cube/layer_103.png",
            "images/white-cube/layer_104.png",
            "images/white-cube/layer_105.png",
            "images/white-cube/layer_106.png",
            "images/white-cube/layer_107.png",
            "images/white-cube/layer_108.png",
            "images/white-cube/layer_109.png",
            "images/white-cube/layer_110.png",
            "images/white-cube/layer_111.png",
            "images/white-cube/layer_112.png",
            "images/white-cube/layer_113.png",
            "images/white-cube/layer_114.png",
            "images/white-cube/layer_115.png",
            "images/white-cube/layer_116.png",
            "images/white-cube/layer_117.png",
            "images/white-cube/layer_118.png",
            "images/white-cube/layer_119.png",
            "images/white-cube/layer_120.png",
            "images/white-cube/layer_121.png",
            "images/white-cube/layer_122.png",
            "images/white-cube/layer_123.png",
            "images/white-cube/layer_124.png",
            "images/white-cube/layer_125.png",
            "images/white-cube/layer_126.png",
            "images/white-cube/layer_127.png",
            "images/white-cube/layer_128.png",
            "images/white-cube/layer_129.png",
            "images/white-cube/layer_130.png",
            "images/white-cube/layer_131.png",
            "images/white-cube/layer_132.png",
            "images/white-cube/layer_133.png",
            "images/white-cube/layer_134.png",
            "images/white-cube/layer_135.png",
            "images/white-cube/layer_136.png",
            "images/white-cube/layer_137.png",
            "images/white-cube/layer_138.png",
            "images/white-cube/layer_139.png",
            "images/white-cube/layer_140.png",
            "images/white-cube/layer_141.png",
            "images/white-cube/layer_142.png",
            "images/white-cube/layer_143.png",
            "images/white-cube/layer_144.png",
            "images/white-cube/layer_145.png",
            "images/white-cube/layer_146.png",
            "images/white-cube/layer_147.png",
            "images/white-cube/layer_148.png",
            "images/white-cube/layer_149.png",
            
        ];
        PIXI.Loader.shared.add(cubeSprite)

        //UI ICONS
        PIXI.Loader.shared.add({ name: "sg-logo-white-raster", url: "images/sg-logo-raster.png" })
        PIXI.Loader.shared.add({ name: "scienceGalleryLogoWhite", url: "images/sg-white.svg" })
        PIXI.Loader.shared.add({ name: "menuIcon", url: "images/menu-icon.svg" })
        PIXI.Loader.shared.add({ name: "menuIconClose", url: "images/menu-icon-close.svg" })

        PIXI.Loader.shared.add({ name: "loadingIcon", url: "images/loading-icon.svg" })
        PIXI.Loader.shared.add({ name: "mapIcon", url: "images/map-icon.svg" })
        PIXI.Loader.shared.add({ name: "mapIconClose", url: "images/map-icon-close.svg" })



        PIXI.Loader.shared.add({ name: "noahMusic", url: "audio/MoseyForSomeMimosas.wav" })
        PIXI.Loader.shared.add({ name: "lobbyMusic", url: "audio/TheMost.wav" })


        PIXI.Loader.shared.add({ name: "vines1", url: "audio/Vines1.wav" })       
        PIXI.Loader.shared.add({ name: "vines2", url: "audio/Vines2.wav" })       
        PIXI.Loader.shared.add({ name: "vines3", url: "audio/Vines3.wav" })       
        PIXI.Loader.shared.add({ name: "vines4", url: "audio/Vines4.wav" })       
        PIXI.Loader.shared.add({ name: "vines5", url: "audio/Vines5.wav" })       
        PIXI.Loader.shared.add({ name: "vines6", url: "audio/Vines6.wav" })       
        PIXI.Loader.shared.add({ name: "vines7", url: "audio/Vines7.wav" })       
        PIXI.Loader.shared.add({ name: "vines8", url: "audio/Vines8.wav" })       
        PIXI.Loader.shared.add({ name: "vines9", url: "audio/Vines9.wav" })       

        PIXI.Loader.shared.add({ name: "slap", url: "audio/StickerSlap.wav" }) 
        PIXI.Loader.shared.add({ name: "slapLaugh", url: "audio/StickerSlapGiggle.wav" })        
       
        PIXI.Loader.shared.add({ name: "gruntBirthdayParty", url: "audio/grunt-birthday-party.wav" })        


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
        this.loadingBar.beginFill(0x00b140, 1.0, true)
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

        this.faces = []

        PIXI.Loader.shared.onComplete.once(() => {

            this.loadingText.text = "100% Complete";

           
            this.UIBuilder = new UIBuilder(this.renderer, state)
            this.UIBuilder.alpha = 0
            this.stage.addChild(this.UIBuilder) 

           

            ease.add(this.loadingText, {alpha: 0, y: loadingTextyPos + 5}, { duration: 250, ease: 'easeOutExpo', wait: 250})
            ease.add(this.loadingBar, {alpha: 0, y: loadingBaryPos - 5}, { duration: 250, ease: 'easeOutExpo', wait: 250})

            ease.add(this.UIBuilder, {alpha: 1 }, { duration: 1000, ease: 'easeOutExpo', wait: 250})

            setTimeout(function(){
                Stage.removeChild(this.loadingText)
                Stage.removeChild(this.loadingBar)
            }, 500)



            let music = PIXI.Loader.shared.resources.lobbyMusic.sound
            music.volume = 0.01
            music.loop = true
            music.play()
            




            this.displacementSprite = PIXI.Sprite.from('images/displacement-1.png')
            this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
            this.displacementFilterText1 = new PIXI.filters.DisplacementFilter(this.displacementSprite)
            this.displacementFilterText1.padding = 200



            this.libbyTitle = new TaggedText("CLASSES", {
                "default": {
                    fontFamily: 'Tahoma',
                    fill: 0x00ff02, 
                    fontWeight: 400,
                    fontSize: "54px",
                    lineHeight: 32,
                    leading: 1,
                    letterSpacing: 33,
                    wordWrap: true,
                    wordWrapWidth: 200
                }
            })

            this.libbyTitle.x = 1220,
            this.libbyTitle.y = 1092
            
            let glow = new GlowFilter({distance: 10, outerStrength: 2, color: 0x00ff02})
            this.libbyTitle.filters = [glow]

            this.foreforeground.addChild(this.libbyTitle)

            
            
            this.mushonTitle = new TaggedText("Normalizi.ng\n<title> HOW DO <bold>NORMAL</bold> PEOPLE LOOK LIKE?</title>", {
                "default": {
                    fontFamily: 'American Typewriter,monospace',
                    fill: 0x6b378f, 
                    fontWeight: 400,
                    fontSize: "32px",
                    lineHeight: 35,
                    leading: 1,
                    letterSpacing: 0.2,
                    wordWrap: true,
                    wordWrapWidth: 210
                },"title": {
                    fontFamily: "sans-serif",
                    fill: 0xffffff,
                    fontSize: "10px"
                }, "bold": {
                    fontWeight: 700
                }
            })

            this.mushonTitle.x = 3280,
            this.mushonTitle.y = 1150
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
            textVerticalNoRepeat.x = 3940 - 200
            textVerticalNoRepeat.y = 2940 - 300
            textVerticalNoRepeat.alpha = 0.7
            this.background.addChild(textVerticalNoRepeat)

        


            //Jo's Quote
            this.floorQuote1 = new TaggedText("We need to normalize the idea that technology itself is not neutral\n\n                   — Mutale Nkonde", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 700,
                    fontSize: "27px",
                    lineHeight: 32,
                    leading: 1,
                    align: "center",
                    wordWrap: true,
                    wordWrapWidth: 500
                }
            })
            this.floorQuote1.seen = false
            this.floorQuote1.x = 2559
            this.floorQuote1.y = 2199
            this.floorQuote1.alpha = 0
            this.backbackground.addChild(this.floorQuote1)
            this.floorQuote1.filters = [this.displacementFilterText1]



            // Libby Quote
            this.floorQuote2 = new TaggedText("Zeros and ones, if we are not careful, could deepen the divides between haves and have-nots, between the deserving and the undeserving – rusty value judgments embedded in shiny new systems \n\n                                      — Ruha Benjamin", {
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
            
            
            this.floorQuote2.x = 1020
            this.floorQuote2.y = 1600
            this.floorQuote2.alpha = 0
            this.background.addChild(this.floorQuote2)
            this.floorQuote2.filters = [this.displacementFilterText1]





            // Noah Quote
            this.floorQuote3 = new TaggedText("If Kindle is upgraded with face recognition and biometric sensors, it can know what made you laugh, what made you sad and what made you angry. Soon, books will read you while you are reading them \n\n                                       — Yuval Noah Harari", {
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


            this.floorQuote3.x = 1900
            this.floorQuote3.y = 2200
            this.floorQuote3.alpha = 0
            this.backbackground.addChild(this.floorQuote3)
            this.floorQuote3.filters = [this.displacementFilterText1]



            // Noah Quote
            this.floorQuote4 = new TaggedText("There is no such thing as an innocent reading, we must ask what reading we are guilty of \n\n                                       — Louis Althusser", {
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


            

            for(let x=0; x<40; x++) {

                let randomX = Math.floor(Math.random() * 16)
                let randomY = Math.floor(Math.random() * 14)

                let randomFace1 = Math.floor(Math.random() * 18) + 6
                let randomFace2 = Math.floor(Math.random() * 18) + 6

                let faceContainer = new PIXI.Container()
                faceContainer.buttonMode = true
                faceContainer.interactive = true
                faceContainer.x = 2904 + ( randomX * 58.99 )
                faceContainer.y = 294 + ( randomY * 58.99 )
    
                let sprite = new PIXI.Sprite.from("https://normalizing-us-files.fra1.cdn.digitaloceanspaces.com/feature-tiles/0/faces/8/"+randomFace1+"/"+randomFace2+"")
                sprite.width = 118.1
                sprite.height = 118.1
                sprite.x = -25
                sprite.y = -20
               
                faceContainer.addChild(sprite)
            
                let squareGraphic = new Graphics()
                let randomWidth = Math.floor(Math.random() * 10) + 5

                squareGraphic.lineStyle(randomWidth, 0xFFFFFF, 1, 0)
                squareGraphic.drawRect(0,0,60,60)
                squareGraphic.x = 4
                squareGraphic.y = 9
                faceContainer.addChild(squareGraphic)

                let glow = new GlowFilter({distance: 10, outerStrength: 3, color: 0x9c67c6})
                faceContainer.filters = [glow]

                this.faces.push(faceContainer)
                this.background.addChild(faceContainer)

            }

            this.faces.forEach(element => {
                element.on('pointerdown', function(){
                    ease.add(element, {alpha: 0}, { duration: 250, ease: 'easeOutExpo'})

                    console.log(element.children[0].texture.textureCacheIds)
                    client.addCommand(new FireCommand(element.x, element.y, ""+element.children[0].texture.textureCacheIds+""))

                    setTimeout(function(){
                        let randomX = Math.floor(Math.random() * 12) + 1
                        let randomY = Math.floor(Math.random() * 12) + 1
    
                        element.x = 2904 + ( randomX * 58.99 )
                        element.y = 294 + ( randomY * 58.99 )
                    }, 400)

                    ease.add(element, {alpha: 1}, { duration: 550, ease: 'easeOutExpo', wait: 1500})



                })
            });
            
        })

        

        let faces = this.faces 
        setInterval(function(){

            let randomFace1 = Math.floor(Math.random() * 15)
            let randomFace2 = Math.floor(Math.random() * 15)

            let randomX = Math.floor(Math.random() * 12) + 1
            let randomY = Math.floor(Math.random() * 12) + 1

            faces[randomFace1].x = 2904 + ( randomX * 58.99 )
            faces[randomFace1].y = 294 + ( randomY * 58.99 )
           
            faces[randomFace1].removeChildAt(0)
            let sprite = new PIXI.Sprite.from("https://normalizing-us-files.fra1.cdn.digitaloceanspaces.com/feature-tiles/0/faces/8/"+randomFace1+"/"+randomFace2+"")
            sprite.width = 118.1
            sprite.height = 118.1
            sprite.x = -25
            sprite.y = -20
               
            faces[randomFace1].addChildAt(sprite, 0)

            ease.add(faces[randomFace2].children[0], {alpha: 1}, { duration: 150, ease: 'easeOutExpo'})
            ease.add(faces[randomFace2].children[0], {alpha: 0}, { duration: 150, ease: 'easeOutExpo', wait: 150})
            ease.add(faces[randomFace2].children[0], {alpha: 1}, { duration: 150, ease: 'easeOutExpo', wait: 300})
            ease.add(faces[randomFace2].children[0], {alpha: 0}, { duration: 150, ease: 'easeOutExpo', wait: 450})
            ease.add(faces[randomFace2].children[0], {alpha: 1}, { duration: 150, ease: 'easeOutExpo', wait: 600})
            setTimeout(function(){
                faces[randomFace2].x = 2904 + ( randomX * 58.99 )
                faces[randomFace2].y = 294 + ( randomY * 58.99 )
            }, 600)


        }, 4000)

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
        

        //const fpsCounter = new PixiFps();
        //this.stage.addChild(fpsCounter)

        //this.particleContainer = new PIXI.ParticleContainer()
        //this.foreground.addChild(this.particleContainer)

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
        lobbyFloor.y = 1187
        this.backbackground.addChild(lobbyFloor)


        let baseball = new PIXI.Sprite.from('/images/baseball-pitch.svg')
        baseball.x = 0
        baseball.y = 0
        this.backbackground.addChild(baseball)



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
        
        videoSprite.x = 3769 - 200//&y=
        videoSprite.y = 2433 - 300
        videoSprite.blendMode = PIXI.BLEND_MODES.SCREEN
        this.foreground.addChild(videoSprite);

        let firstFloor = new PIXI.Sprite.from('/images/1st-floor.svg')
        firstFloor.x = 0
        firstFloor.y = 0
        this.foreforeground.addChild(firstFloor)


       
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

        if(this.floorQuote1) {
            if(this.floorQuote1.seen) {
                this.floorQuote1.filters = []
            }
        }

        if(this.floorQuote2) {
            if(this.floorQuote2.seen) {
                this.floorQuote2.filters = []
            }
        }

        if(this.floorQuote3) {
            if(this.floorQuote3.seen) {
                this.floorQuote3.filters = []
            }
        }

        if(this.floorQuote4) {
            if(this.floorQuote4.seen) {
                this.floorQuote4.filters = []
            }
        }



        if(this.count > 360) {
            //this.spriteShader.alpha = 0.1 + Math.sin((this.count/10)) * 0.1;
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
