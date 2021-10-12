import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import * as PUXI from '../../node_modules/puxi/lib/puxi.mjs'
import TaggedText from 'pixi-tagged-text'
import { ease } from 'pixi-ease'
import { Sound, filters, sound } from '@pixi/sound'
import { CRTFilter } from '@pixi/filter-crt'
import { GlitchFilter } from '@pixi/filter-glitch'
import { join } from 'path';

class UIBuilder extends PIXI.Container {
    constructor(renderer, client) {
        super()

        this.width  = window.innerWidth 
        this.height = window.innerHeight

        this.client = client
        this.artNumber = null

        const resources = PIXI.Loader.shared.resources


        this.black = PIXI.utils.string2hex("#1f1f1f")
        const black = this.black

        this.white = PIXI.utils.string2hex("#FFFFFF")
        const white = this.white

        this.green = PIXI.utils.string2hex("#4DFA66")
        const green = this.green

        this.darkGreen = PIXI.utils.string2hex("#031e04")
        const darkGreen = this.darkGreen

        this.blue = PIXI.utils.string2hex("#1DCFFF") 
        const blue = this.blue

        this.pink = PIXI.utils.string2hex("#F638D7")
        const pink = this.pink 

        this.yellow = PIXI.utils.string2hex("#FFE401") 
        const yellow = this.yellow

        this.red = PIXI.utils.string2hex("#FF284D")
        const red = this.red



        this.audio = Sound

        this.nameGiven = false

        this.showingArt = false
        this.showingQuote = false
        this.count = 0


  
        this.fadeInStyles = { y: 0, alpha: 1 }
        this.fadeOutStyles = { y: 20, alpha: 0 }
        this.fadeOut = { alpha: 0 }
        this.fadeIn = { alpha: 1 }

        this.fadeInSettings = { duration: 250, ease: 'easeOutExpo'}
        this.fadeOutSettings = { duration: 250, ease: 'easeOutExpo'}

        this.fadeInSettingsDelay = { duration: 250, ease: 'easeOutExpo', wait: 1200 }
        this.fadeInSettingsDelayTwo = { duration: 250, ease: 'easeOutExpo', wait: 250 }


    
        

       
      
//console.log(resources)

        


        const userInterface = this
        const loader = new PIXI.Loader();
        PIXI.utils.clearTextureCache();

        this.loaded = false
        let loaded = this.loaded

        let keys1 
        let keys2

        let menuHover
        let menuOpen
        let menuClose
        let menuHoverMain

        let avatars = [] 
        let avatarBackgrounds, avatarMiddlegrounds, avatarForegrounds   

        loader.add('keys1', 'audio/keys1.mp3');
        loader.add('keys2', 'audio/keys2.mp3');

        loader.add('menuHover', 'audio/menu-hover.mp3');
        loader.add('menuOpen', 'audio/menu-open.mp3');
        loader.add('menuClose', 'audio/menu-close.mp3');
        loader.add('menuHoverMain', 'audio/menu-hover.mp3');


       

       
        
        loader.load(function(loader, resources) {

            keys1 = resources.keys1.sound
            keys1.volume = 0.005
            keys2 = resources.keys2.sound
            keys2.volume = 0.005

            menuHover = resources.menuHover.sound
            menuHover.volume = 0.001

            menuOpen = resources.menuOpen.sound
            menuOpen.volume = 0.01

            menuClose = resources.menuClose.sound
            menuClose.volume = 0.01

            menuHoverMain = resources.menuHoverMain.sound
            menuHoverMain.speed = 2
            menuHoverMain.volume = 0.01

            const telephone = new filters.TelephoneFilter(1)
            const distorsion = new filters.DistortionFilter(0.1)
           
            menuHoverMain.filters = [telephone, distorsion]

            avatarBackgrounds = [
                resources.avatarBackground1, 
                resources.avatarBackground2, 
                resources.avatarBackground3, 
                resources.avatarBackground4, 
                resources.avatarBackground5, 
                resources.avatarBackground6, 
            ]
            avatarMiddlegrounds = [
                resources.avatarMiddleground1, 
                resources.avatarMiddleground2, 
                resources.avatarMiddleground3, 
                resources.avatarMiddleground4, 
                resources.avatarMiddleground5, 
                resources.avatarMiddleground6, 
            ]
            avatarForegrounds = [
                resources.avatarForeground1, 
                resources.avatarForeground2, 
                resources.avatarForeground3, 
                resources.avatarForeground4, 
                resources.avatarForeground5, 
                resources.avatarForeground6, 
            ]
            avatars.push(avatarBackgrounds, avatarMiddlegrounds, avatarForegrounds)

            loaded = true
            
        });
    
       
        
        this.mainMenuOn = true
        
        this.shareMenuOn = false
        this.muteButtonOn = false



        this.quoteStageOn = true
        this.viewArtButtonOn = true
        this.joinModalOn = true
        this.transitionScreenOn = true
        this.miniMapOn = true

        this.statusStageOn = true
        this.scoreStageOn = false
        this.chatStageOn = false
        this.emojiStageOn = false

        //this.worldStageOn = true
       
        this.worldInfoOn = true

        
        this.introScreenOn = false

        

        

        
        this.notificationStageOn = false




       
        this.mainMenuStage = new PIXI.Container()
        this.addChild(this.mainMenuStage)


        if(this.mainMenuOn == true) {

            //New UI Framework
            const menuIconGraphic = PIXI.Sprite.from('images/menu-icon.svg')
            const menuIconCloseGraphic = PIXI.Sprite.from('images/menu-icon-close.svg')

            this.menuIcon = new PIXI.Sprite.from('images/menu-icon.svg')
            const menuIcon = this.menuIcon
            menuIcon.name = 'menu-icon'
            menuIcon.width = 24
            menuIcon.height = 24
            menuIcon.x = 14
            menuIcon.y = 15
            menuIcon.interactive = true
            menuIcon.buttonMode = true


            menuIcon.on("pointerover", function () {
                //menuHoverMain.play()
            })

            menuIcon.on("pointermove", function () {
                
            })

           

            menuIcon.on("pointerdown", function () {
                if(menuIcon.name == 'menu-icon') {
                    menuIcon.texture = menuIconCloseGraphic.texture
                    menuIcon.name = 'menu-icon-close'
                    aboutLink.visible = true
                    creditsLink.visible = true
                    privacyLink.visible = true
                    artistsLink.visible = true
                    workLink.visible = true
                    resetLink.visible = true
                    helpLink.visible = true
                    feedbackLink.visible = true
                    //menuOpen.play()
                } else if(menuIcon.name == 'menu-icon-close') {
                    menuIcon.texture = menuIconGraphic.texture
                    menuIcon.name = 'menu-icon'
                    aboutLink.visible = false
                    creditsLink.visible = false
                    privacyLink.visible = false
                    artistsLink.visible = false
                    workLink.visible = false
                    resetLink.visible = false
                    helpLink.visible = false
                    feedbackLink.visible = false
                    //menuClose.play()
                }
            });

            this.mainMenuStage.addChild(menuIcon)

        


            const navLinkTextStyles = {
                default: {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "13px",
                    fill: white,
                },
                underline: {   
                    fontFamily: "Trade Gothic Next",
                    fontSize: "13px",
                    fill: white,
                    textDecoration: "underline", 
                    fill: white
                },
            };


            

            const aboutLinkText = 'About';
            const aboutLinkUnderlineText = '<underline>About</underline>';

            const aboutLink = new TaggedText(aboutLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            aboutLink.visible = false
            aboutLink.x = 55
            aboutLink.y = 18
            aboutLink.interactive = true
            aboutLink.buttonMode = true

            aboutLink.on("pointerover", function () {
                aboutLink.setText(aboutLinkUnderlineText)
                //menuHover.play()
            })
            
            aboutLink.on("pointerdown", function () {
                userInterface.showQuote("2")
            })
            aboutLink.on("pointerout", function () {
                aboutLink.setText(aboutLinkText)
            })

            this.mainMenuStage.addChild(aboutLink)


            const artistsLinkText = 'Artists';
            const artistsLinkUnderlineText = '<underline>Artists</underline>';
            
            const artistsLink = new TaggedText(artistsLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            artistsLink.visible = false
            artistsLink.x = 55
            artistsLink.y = 38
            artistsLink.interactive = true
            artistsLink.buttonMode = true
            
            artistsLink.on("pointerover", function () {
                artistsLink.setText(artistsLinkUnderlineText)
                //menuHover.play()
            })
            artistsLink.on("pointerdown", function () {
                userInterface.showQuote("3")
            })
            artistsLink.on("pointerout", function () {
                artistsLink.setText(artistsLinkText)
            })
            
            this.mainMenuStage.addChild(artistsLink)



            const workLinkText = 'Work';
            const workLinkUnderlineText = '<underline>Work</underline>';
            
            const workLink = new TaggedText(workLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            workLink.visible = false
            workLink.x = 55
            workLink.y = 58
            workLink.interactive = true
            workLink.buttonMode = true
            
            workLink.on("pointerover", function () {
                workLink.setText(workLinkUnderlineText)
                //menuHover.play()
            })
            workLink.on("pointerdown", function () {
                userInterface.showQuote("4")
            })
            workLink.on("pointerout", function () {
                workLink.setText(workLinkText)
            })
            
            this.mainMenuStage.addChild(workLink)
            




            const creditsLinkText = 'Credits';
            const creditsLinkUnderlineText = '<underline>Credits</underline>';

            const creditsLink = new TaggedText(creditsLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            creditsLink.visible = false
            creditsLink.x = 55
            creditsLink.y = 78
            creditsLink.interactive = true
            creditsLink.buttonMode = true

            creditsLink.on("pointerover", function () {
                creditsLink.setText(creditsLinkUnderlineText)
                //menuHover.play()
            })
            creditsLink.on("pointerdown", function () {
                userInterface.showQuote("5")
            })
            creditsLink.on("pointerout", function () {
                creditsLink.setText(creditsLinkText)
            })

            this.mainMenuStage.addChild(creditsLink)
            


            const privacyLinkText = 'Legal';
            const privacyLinkUnderlineText = '<underline>Legal</underline>';

            const privacyLink = new TaggedText(privacyLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            privacyLink.visible = false
            privacyLink.x = 55
            privacyLink.y = 98
            privacyLink.interactive = true
            privacyLink.buttonMode = true

            privacyLink.on("pointerover", function () {
                privacyLink.setText(privacyLinkUnderlineText)
                //menuHover.play()
            })
            privacyLink.on("pointerdown", function () {
                userInterface.showQuote("6")
            })
            privacyLink.on("pointerout", function () {
                privacyLink.setText(privacyLinkText)
            })

            this.mainMenuStage.addChild(privacyLink)



            const resetLinkText = 'Reset';
            const resetLinkUnderlineText = '<underline>Reset</underline>';
            
            const resetLink = new TaggedText(resetLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            resetLink.visible = false
            resetLink.x = 55
            resetLink.y = 118
            resetLink.interactive = true
            resetLink.buttonMode = true
            
            resetLink.on("pointerover", function () {
                resetLink.setText(resetLinkUnderlineText)
                //menuHover.play()
            })
            resetLink.on("pointerdown", function () {
                window.localStorage.removeItem('name');
                window.localStorage.removeItem('avatar');
                window.localStorage.removeItem('color');
                window.localStorage.removeItem('x');
                window.localStorage.removeItem('y');
                window.localStorage.removeItem('over18');
                setTimeout(function(){
                    window.location.reload()
                }, 500)
            })
            resetLink.on("pointerout", function () {
                resetLink.setText(resetLinkText)
            })
            
            this.mainMenuStage.addChild(resetLink)



            const helpLinkText = 'Help';
            const helpLinkUnderlineText = '<underline>Help</underline>';
            
            const helpLink = new TaggedText(helpLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            helpLink.visible = false
            helpLink.x = 55
            helpLink.y = 138
            helpLink.interactive = true
            helpLink.buttonMode = true
            
            helpLink.on("pointerover", function () {
                helpLink.setText(helpLinkUnderlineText)
                //menuHover.play()
            })
            helpLink.on("pointerdown", function () {
                userInterface.showQuote("7")
            })
            helpLink.on("pointerout", function () {
                helpLink.setText(helpLinkText)
            })
            
            this.mainMenuStage.addChild(helpLink)



            const feedbackLinkText = 'Feedback';
            const feedbackLinkUnderlineText = '<underline>Feedback</underline>';
            
            const feedbackLink = new TaggedText(feedbackLinkText, navLinkTextStyles, {
                drawWhitespace: true,
            });
            feedbackLink.visible = false
            feedbackLink.x = 55
            feedbackLink.y = 158
            feedbackLink.interactive = true
            feedbackLink.buttonMode = true
            
            feedbackLink.on("pointerover", function () {
                feedbackLink.setText(feedbackLinkUnderlineText)
                //menuHover.play()
            })
            feedbackLink.on("pointerdown", function () {
                userInterface.showQuote("8")
            })
            feedbackLink.on("pointerout", function () {
                feedbackLink.setText(feedbackLinkText)
            })
            
            this.mainMenuStage.addChild(feedbackLink)

            

            if(this.muteButtonOn) {
        
                const soundOnGraphic = PIXI.Sprite.from('images/sound-on-icon.svg')
                const soundOffGraphic = PIXI.Sprite.from('images/sound-off-icon.svg')

                this.soundIcon = new PIXI.Sprite.from('images/sound-on-icon.svg')
                const soundIcon = this.soundIcon
                soundIcon.name = 'sound-icon-on'
                soundIcon.width = 20
                soundIcon.height = 17
                soundIcon.x = 15
                soundIcon.y = 90
                soundIcon.interactive = true
                soundIcon.buttonMode = true

                soundIcon.on("pointerdown", function () {
                    if(soundIcon.name == 'sound-icon-on') {
                        soundIcon.texture = soundOffGraphic.texture
                        soundIcon.name = 'sound-icon-off'
                        sound.toggleMuteAll()

                    } else if(soundIcon.name == 'sound-icon-off') {
                        soundIcon.texture = soundOnGraphic.texture
                        soundIcon.name = 'sound-icon-on'
                        sound.toggleMuteAll()

                    }
                });

                this.mainMenuStage.addChild(soundIcon)
            }

            if(this.shareMenuOn == true) {

                //Share Icon 
                this.shareIcon = new PIXI.Sprite.from('images/share-icon.svg')
                const shareIcon = this.shareIcon
                shareIcon.state = 'closed'
                shareIcon.width = 17
                shareIcon.height = 20
                shareIcon.x = 16
                shareIcon.y = 53
                shareIcon.interactive = true
                shareIcon.buttonMode = true

                shareIcon.on("pointerdown", function () {
                    if(twitter.visible == true) {
                        twitter.visible = false
                        facebook.visible = false
                        soundIcon.visible = true
                    } else {
                        twitter.visible = true
                        facebook.visible = true
                        soundIcon.visible = false
                    }
                });
                this.mainMenuStage.addChild(shareIcon)



                //Twitter Share Icon  
                this.twitterShare = PIXI.Sprite.from('images/twitter-icon.svg');
                const twitter = this.twitterShare
                twitter.width = 20
                twitter.height = 16
                twitter.x = 15
                twitter.y = 90
                twitter.visible = false
                twitter.interactive = true
                twitter.buttonMode = true

                twitter.on("pointerdown", function () {
                    window.open("https://twitter.com/intent/tweet?url=https%3A%2F%2Fbiasonline.ie%2F&via=SciGalleryDub&text=I%27m%20exploring%20BIAS%20ONLINE%20an%20exhibition%20about%20data%20equity%2C%20privacy%2C%20surveillance%20culture%2C%20facial%20recognition%2C%20class%20and%20artificial%20intelligence.%20Join%20me%20in%20real-time%21", "_blank", "width=650,height=300");
                });
                this.mainMenuStage.addChild(twitter)



                //facebook Share Icon  
                this.facebookShare = PIXI.Sprite.from('images/facebook-icon.svg');
                const facebook = this.facebookShare
                facebook.width = 9
                facebook.height = 18
                facebook.x = 20
                facebook.y = 120
                facebook.visible = false
                facebook.interactive = true
                facebook.buttonMode = true

                facebook.on("pointerdown", function () {
                    window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbiasonline.ie', '_blank', 'width=626,height=436');
                });
                this.mainMenuStage.addChild(facebook)

            }
        }




        

            
            /*this.landingScreen = new PUXI.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                x: 0,
                y: 0
            })  
            
            this.landingScreenWrapper = new PUXI.Widget({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999999, 
                    height: 0.999999,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            ).setBackground(0x000000)

            this.landingScreen.addChild(this.landingScreenWrapper)

            this.landingScreenTextWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            )
            this.landingScreen.addChild(this.landingScreenTextWrapper)
            
            this.landingText = new PUXI.TextWidget('')
            this.landingText.setLayoutOptions(new PUXI.FastLayoutOptions({
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            })).setBackground(0xFFFFFF).setPadding(15, 10, 15, 3)

        
            this.landingTextTagged = new TaggedText("BIAS ONLINE", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: black, 
                    fontWeight: 900,
                    fontSize: "18px",
                    lineHeight: 22,
                    leading: 1
                }
            })
            this.landingText.contentContainer.addChild(this.landingTextTagged)
            this.landingScreenTextWrapper.addChild(this.landingText)
        
            
            
            this.addChild(this.landingScreen)
            this.landingScreen.resize(window.innerWidth, window.innerHeight)
            */



        
        




        if(this.statusStageOn == true) {

            this.statusStage = new PUXI.Stage({
                width: 250,
                height: 100
            });
            

            this.statusWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 250,
                    height: 100,
                    x: 10,
                    y: 0.985,
                    anchor: new PIXI.Point(0, 1)
                }),
            )


            this.statusLayout = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    height: 0,
                    width: 250,
                    x: 5,
                    y: 0.8,
                    anchor: new PIXI.Point(0, 1)
                }),
            )
            this.statusWrapper.addChild(this.statusLayout)
            this.statusStage.addChild(this.statusWrapper)

            const scienceGalleryLogo = PIXI.Sprite.from('images/sg-logo-raster.png');
            scienceGalleryLogo.width = 68
            scienceGalleryLogo.height = 35 
            scienceGalleryLogo.x = 10
            scienceGalleryLogo.y = window.innerHeight - 48
            scienceGalleryLogo.interactive = true
            scienceGalleryLogo.buttonMode = true
            scienceGalleryLogo.on("pointerdown", function () {
               window.open('https://dublin.sciencegallery.com/')
            })
            //this.statusWrapper.contentContainer.addChild(scienceGalleryLogo)
        
            this.addChild(this.statusStage)

            this.statusStage.resize(window.innerWidth, window.innerHeight)
            this.statusStage.stage.hitArea = new PIXI.Rectangle(0, 0, 0, 0);

        }



        if(this.scoreStageOn == true) {

            let scoreStageWidth = 120
            let scoreStageHeight = 250

            this.scoreStage = new PUXI.Stage({
                width: scoreStageWidth,
                height: scoreStageHeight,
                x: 0,
                y: 0
            })
            

            this.scoreWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: scoreStageWidth, 
                    height: scoreStageHeight,
                    x: 0.99,
                    y: 15,
                    anchor: new PIXI.Point(1, 0)
                })
            )
            this.scoreWrapper.contentContainer.scale.set(0.6, 0.6);
            
            this.scoreWrapperBackground = new PIXI.Graphics()
            this.scoreWrapperBackground.beginFill(black)
            this.scoreWrapperBackground.drawRoundedRect(0, 0, scoreStageWidth*3.5, scoreStageHeight*2, 65)
            this.scoreWrapperBackground.endFill()
            this.scoreWrapperBackground.cacheAsBitmap = true
            this.scoreWrapperBackground.roundPixels = true
            this.scoreWrapperBackground.scale.set(0.5)
            
           
            this.scoreWrapper.contentContainer.addChild(this.scoreWrapperBackground)
            
            this.talkingScore = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 64,
                    height: 25,
                    x: 85,
                    y: 15
                })
            )
            this.talkingScore.isComplete = false

            const talkingIcon = new PIXI.Sprite.from('images/talking-icon.svg');
            talkingIcon.x = -67
            this.talkingScore.contentContainer.addChild(talkingIcon)
            
            this.talkingScoreText = new PIXI.Text("0/10", {fill: black, fontSize: 26, align: "right", wordWrap: true, fontWeight: 900});
            this.talkingScoreText.x = 22
            this.talkingScoreText.y = 7
            this.talkingScoreTextBackground = new PIXI.Graphics()
            this.talkingScoreTextBackground.beginFill(white)
            this.talkingScoreTextBackground.drawRoundedRect(0, 0, 200, 86, 42)
            this.talkingScoreTextBackground.endFill()
            this.talkingScoreTextBackground.cacheAsBitmap = true
            this.talkingScoreTextBackground.roundPixels = true
            this.talkingScoreTextBackground.scale.set(0.5)
            this.talkingScore.contentContainer.addChild(this.talkingScoreTextBackground)
            this.talkingScore.contentContainer.addChild(this.talkingScoreText)
            this.scoreWrapper.addChild(this.talkingScore)



            this.robotScore = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 62,
                    height: 22,
                    x: 85,
                    y: 72
                })
            )
            this.robotScore.isComplete = false

            const robotIcon = new PIXI.Sprite.from('images/robot-icon-ui.svg');
            robotIcon.x = -67
            robotIcon.y = 0
            this.robotScore.contentContainer.addChild(robotIcon)

            this.robotScoreText = new PIXI.Text("0/10", {fill: black, fontSize: 26, align: "right", wordWrap: true, fontWeight: 900});
            this.robotScoreText.x = 22
            this.robotScoreText.y = 7
            this.robotScoreTextBackground = new PIXI.Graphics()
            this.robotScoreTextBackground.beginFill(white)
            this.robotScoreTextBackground.drawRoundedRect(0, 0, 200, 86, 42)
            this.robotScoreTextBackground.endFill()
            this.robotScoreTextBackground.cacheAsBitmap = true
            this.robotScoreTextBackground.roundPixels = true
            this.robotScoreTextBackground.scale.set(0.5)

            this.robotScore.contentContainer.addChild(this.robotScoreTextBackground)
            this.robotScore.contentContainer.addChild(this.robotScoreText)
            this.scoreWrapper.addChild(this.robotScore)




            
            this.dialScore = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 64,
                    height: 25,
                    x: 85,
                    y: 130
                })
            )
            this.dialScore.isComplete = false

            const dialIcon = new PIXI.Sprite.from('images/dial-icon.svg');
            dialIcon.x = -60
            dialIcon.y = 0
            this.dialScore.contentContainer.addChild(dialIcon)

            this.dialScoreText = new PIXI.Text("0/10", {fill: black, fontSize: 26, align: "right", wordWrap: true, fontWeight: 900});
            this.dialScoreText.x = 22
            this.dialScoreText.y = 7
            this.dialScoreTextBackground = new PIXI.Graphics()
            this.dialScoreTextBackground.beginFill(white)
            this.dialScoreTextBackground.drawRoundedRect(0, 0, 200, 86, 42)
            this.dialScoreTextBackground.cacheAsBitmap = true
            this.dialScoreTextBackground.roundPixels = true
            this.dialScoreTextBackground.scale.set(0.5)
            this.dialScoreTextBackground.endFill()
            this.dialScore.contentContainer.addChild(this.dialScoreTextBackground)
            this.dialScore.contentContainer.addChild(this.dialScoreText)
            this.scoreWrapper.addChild(this.dialScore)




            
            this.faceScore = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 64,
                    height: 25,
                    x: 85,
                    y: 190
                })
            )
            this.faceScore.isComplete = false

            const faceIcon = new PIXI.Sprite.from('images/face-icon.svg');
            faceIcon.x = -60
            faceIcon.y = 0
            this.faceScore.contentContainer.addChild(faceIcon)


            this.faceScoreText = new PIXI.Text("0/10", {fill: black, fontSize: 26, align: "right", wordWrap: true, fontWeight: 900});
            this.faceScoreText.x = 22
            this.faceScoreText.y = 7
            this.faceScoreTextBackground = new PIXI.Graphics()
            this.faceScoreTextBackground.beginFill(white)
            
            this.faceScoreTextBackground.drawRoundedRect(0, 0, 200, 86, 42)
            this.faceScoreTextBackground.cacheAsBitmap = true
            this.faceScoreTextBackground.roundPixels = true
            this.faceScoreTextBackground.scale.set(0.5)

            this.faceScoreTextBackground.endFill()
            this.faceScore.contentContainer.addChild(this.faceScoreTextBackground)
            this.faceScore.contentContainer.addChild(this.faceScoreText)
            this.scoreWrapper.addChild(this.faceScore)
            

            this.scoreStage.addChild(this.scoreWrapper);
            this.addChild(this.scoreStage);
            
            this.scoreStage.resize(window.innerWidth, window.innerHeight)
            this.scoreStage.stage.hitArea = new PIXI.Rectangle(0,0,0,0);

        }



        if(this.chatStageOn == true) {

            let textBoxWidth
            if(window.innerWidth <= 320) {
                textBoxWidth = 290
            } else {
                textBoxWidth = 420
            }

            const textBoxHeight = 50
            
            this.textBox = new PUXI.Stage({
                width: textBoxWidth,
                height: textBoxHeight,
                x: 0,
                y: 0
            })
            
            this.textBox.alpha = 1
    
            this.textBoxWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: textBoxWidth,
                    height: textBoxHeight,
                    x: 0.5,
                    y: 0.99,
                    anchor: new PIXI.Point(0.5, 1)
                }),
            )
    
            //this.textBoxWrapperBackground.clear()
            this.textBoxWrapperBackground = new Graphics()
            this.textBoxWrapperBackground.lineStyle(2, black, 1, 1, false)
            this.textBoxWrapperBackground.beginFill(white, 1.0, true)
            this.textBoxWrapperBackground.drawRoundedRect(0, 0, textBoxWidth*2, textBoxHeight*2, 25*2)
            this.textBoxWrapperBackground.endFill()
            this.textBoxWrapperBackground.scale.set(0.5)
            this.textBoxWrapperBackground.cacheAsBitmap = true
            this.textBoxWrapperBackground.roundPixels = true
            this.textBoxWrapperBackground.moveTo(textBoxWidth*2, 23*2)
            this.textBoxWrapperBackground.lineTo(textBoxWidth*2, 30*2)
            



            this.textBoxWrapper.contentContainer.addChild(this.textBoxWrapperBackground)
    
            const textInputStyles = new PIXI.TextStyle({ 
                fontFamily: 'Trade Gothic Next',
                fill: black, 
                fontSize: 24
            })
            
            //The Text Input
            this.mockInput = new PUXI.TextInput({
                multiLine: false,
                value: "",
                padding: 10,
                paddingLeft: 50,
                maxLength: 30,
                fontWeight: 300,
                selectedColor: black,
                selectedBackgroundColor: yellow,
                caretWidth: 2,
                style: textInputStyles,
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999, 
                    height: textBoxHeight,
                    x: 5,
                    y: 0,
                }),
            )
            this.textBoxWrapper.addChild(this.mockInput);
            this.textBoxWrapper.contentContainer.cursor = "text";
    
            this.TextBoxPlaceholder = new PUXI.TextWidget(
                'Type to speak!', 
                textInputStyles
            ).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 50,
                    y: 9,
                })
            )
            this.TextBoxPlaceholder.alpha = 0.4;
            this.textBoxWrapper.addChild(this.TextBoxPlaceholder);
    
            this.textBoxWrapper.widgetChildren[0].on('focus', () => { 
                this.TextBoxPlaceholder.alpha = 0;
            });
            this.textBoxWrapper.widgetChildren[0].on('blur', () => { 
                if(this.mockInput.value == "") {
                    this.TextBoxPlaceholder.alpha = 0.4;
                }
            });
    
            this.textBox.addChild(this.textBoxWrapper);
            this.addChild(this.textBox)
    
            this.textBox.resize(window.innerWidth, window.innerHeight)
            const textBoxBounds = this.textBoxWrapperBackground.getBounds()
            this.textBox.stage.hitArea = new PIXI.Rectangle(
                textBoxBounds.x,
                textBoxBounds.y,
                textBoxBounds.width,
                textBoxBounds.height
            );
    
    
            const sendIcon = PIXI.Sprite.from('images/send-icon.svg');
            sendIcon.width = 22.1
            sendIcon.height = 17.6
            sendIcon.anchor.set(0.5)
            sendIcon.scale.set(0.8)
            sendIcon.alpha = 0.4
    
            sendIcon.x = textBoxBounds.width - 30
            sendIcon.y = (textBoxBounds.height/2) - 1
    
            sendIcon.interactive = true;
            sendIcon.buttonMode = true;
    
            this.textBoxWrapper.contentContainer.addChild(sendIcon)
            
        }

        

        if(this.emojiStageOn == true) {

            let textBoxWidth
            if(window.innerWidth <= 320) {
                textBoxWidth = 290
            } else {
                textBoxWidth = 420
            }

            const textBoxHeight = 50

            this.emojiStage = new PUXI.Stage({
                width: textBoxWidth,
                height: 50,
                x: 0,
                y: 0
            })

            this.emojiWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: textBoxWidth, 
                    height: 50,
                    x: 0.5,
                    y: 0.99,
                    anchor: new PIXI.Point(0.5, 1)
                })
            )


            this.emojiWrapperBackground = new PIXI.Graphics()
            this.emojiWrapperBackground.beginFill(white)
            this.emojiWrapperBackground.drawRoundedRect(2, 2, 50, 46, 25)
            this.emojiWrapperBackground.endFill()
            this.emojiWrapper.contentContainer.addChild(this.emojiWrapperBackground)

            this.coolEmoji = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 60,
                    height: 45,
                    x: 0,
                    y: 0
                })
            ).setPadding(7, 0)


            const coolEmoji = new PIXI.Text("☺", {fontSize: 38});
            coolEmoji.alpha = 0.35

            this.coolEmoji.contentContainer.addChild(coolEmoji)
            this.emojiWrapper.addChild(this.coolEmoji)
            this.coolEmoji.contentContainer.buttonMode = true
            this.coolEmoji.contentContainer.interactive = true



            /*this.heartEmoji = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 60,
                    height: 50,
                    x: 50,
                    y: 0
                })
            ).setPadding(15, 10)
            const heartEmoji = new PIXI.Text("❤️", {fontSize: 28});
            this.heartEmoji.contentContainer.addChild(heartEmoji)
            this.emojiWrapper.addChild(this.heartEmoji)
            this.heartEmoji.contentContainer.buttonMode = true
            this.heartEmoji.contentContainer.interactive = true

            this.lighteningEmoji = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 60,
                    height: 50,
                    x: 100,
                    y: 0
                })
            ).setPadding(15, 10)
            this.lighteningEmoji.buttonMode = true
            const lighteningEmoji = new PIXI.Text("⚡", {fontSize: 28});
            this.lighteningEmoji.contentContainer.addChild(lighteningEmoji)
            this.emojiWrapper.addChild(this.lighteningEmoji)
            this.lighteningEmoji.contentContainer.buttonMode = true
            this.lighteningEmoji.contentContainer.interactive = true

            this.sadEmoji = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 60,
                    height: 50,
                    x: 150,
                    y: 0
                })
            ).setPadding(15, 10)
            const sadEmoji = new PIXI.Text("🎉", {fontSize: 28});
            this.sadEmoji.contentContainer.addChild(sadEmoji)
            this.emojiWrapper.addChild(this.sadEmoji)
            this.sadEmoji.contentContainer.buttonMode = true
            this.sadEmoji.contentContainer.interactive = true

            this.whateverEmoji = new PUXI.Widget({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 60,
                    height: 50,
                    x: 200,
                    y: 0
                })
            ).setPadding(15, 10)
            const whateverEmoji = new PIXI.Text("🙄", {fontSize: 28});
            this.whateverEmoji.contentContainer.addChild(whateverEmoji)
            this.whateverEmoji.contentContainer.buttonMode = true
            this.whateverEmoji.contentContainer.interactive = true
            this.emojiWrapper.addChild(this.whateverEmoji)
                */
            
            this.emojiStage.addChild(this.emojiWrapper);
            this.addChild(this.emojiStage);

            this.emojiStage.resize(window.innerWidth, window.innerHeight)
            const bounds = this.emojiWrapperBackground.getBounds()
            this.emojiStage.stage.hitArea = new PIXI.Rectangle(
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height
            );
        }



        if(this.worldInfoOn == true) {

            let width = 76
            let height = 21

            this.worldInfo = new PUXI.Stage({
                width: width,
                height: height
            })
            
            this.worldInfoWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: width, 
                    height: height,
                    x: 0.5,
                    y: 0.01,
                    anchor: new PIXI.Point(0.5, 0)
                })
            )
            
            this.worldInfoBackground = new Graphics()
            this.worldInfoBackground.lineStyle(0)
            this.worldInfoBackground.beginFill(white, 0.3, true)
            this.worldInfoBackground.drawRoundedRect(0, 0, width*2, height*2, 6)
            this.worldInfoBackground.endFill()
            this.worldInfoBackground.scale.set(0.5)
            this.worldInfoBackground.cacheAsBitmap = true
            this.worldInfoWrapper.contentContainer.addChild(this.worldInfoBackground)
    
            this.worldInfo.addChild(this.worldInfoWrapper);
            this.addChild(this.worldInfo)
    
            this.currentTime = new TaggedText("00:00:00", {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "18px",
                    wordWrap: true,
                    lineHeight: 35,
                    padding: 10,
                    fontWeight: 300,
                    wordWrapWidth: 550,
                    leading: 1,
                    fill: this.white,
                    textBaseline: "alphabetical"
                }
            })
            this.currentTime.x = 2
            this.worldInfoWrapper.contentContainer.addChild(this.currentTime);
    
    
    
            /*this.numberOfPeople = new PIXI.Text("Active Users:", {fill: black, fontSize: 10, fontFamily: 'Trade Gothic Next'});
            this.numberOfPeople.x = 10
            this.numberOfPeople.y = 26
            this.worldInfoWrapper.contentContainer.addChild(this.numberOfPeople);
            
            this.numberOfPeopleCounter = new PIXI.Text("0", {fill: black, fontSize: 10, fontFamily: 'Trade Gothic Next'});
            this.numberOfPeopleCounter.x = 130
            this.numberOfPeopleCounter.y = 26
            this.worldInfoWrapper.contentContainer.addChild(this.numberOfPeopleCounter);
    
    
    
            this.totalNumberOfPeople = new PIXI.Text("Total Users:", {fill: black, fontSize: 10, fontFamily: 'Trade Gothic Next'});
            this.totalNumberOfPeople.x = 10
            this.totalNumberOfPeople.y = 42
            this.worldInfoWrapper.contentContainer.addChild(this.totalNumberOfPeople);
            
            this.totalNumberOfPeopleCounter = new PIXI.Text("0", {fill: black, fontSize: 10, fontFamily: 'Trade Gothic Next'});
            this.totalNumberOfPeopleCounter.x = 130
            this.totalNumberOfPeopleCounter.y = 43
            this.worldInfoWrapper.contentContainer.addChild(this.totalNumberOfPeopleCounter);*/
    
    
    
            this.worldInfo.resize(window.innerWidth, window.innerHeight)
            const worldBounds = this.worldInfoBackground.getBounds()
            this.worldInfo.stage.hitArea = new PIXI.Rectangle(
                worldBounds.x,
                worldBounds.y,
                worldBounds.width,
                worldBounds.height
            );
    

        }

        

        if(this.quoteStageOn == true) {

            this.quoteStage = new PUXI.Stage(0, 0, window.innerWidth, window.innerHeight);

            this.quoteBackground = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    x: 0.5,
                    y: 0.5,
                    anchor: new PIXI.Point(0.5, 0.5)
                }),
            ).setBackground(0x000000).setBackgroundAlpha(0.5)

            this.quoteWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 650,
                    height: 600,
                    x: 0.5,
                    y: 0.5,
                    anchor: new PIXI.Point(0.5, 0.5)
                }),
            )

            this.quoteWrapperBackground = new Graphics()
            this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
            this.quoteWrapperBackground.lineStyle(1, this.black)
            this.quoteWrapperBackground.drawRoundedRect(0, 0, 300, 300, 10)




            this.scrollWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999,
                    height: 0.999,
                    x: 0.5,
                    y: 0.5,
                    anchor: new PIXI.Point(0.5, 0.5)
                }),
            )
            



            this.scrollContent = new PUXI.ScrollWidget({
                scrollY: true,
                scrollX: false,
                scrollBars: true,
                softness: 1,
                dragScrolling: true
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999,
                    height: 0.999,
                    x: 0.5,
                    y: 0,
                    anchor: new PIXI.Point(0.5, 0),
                })
            ).setPadding(25, 0, 25, 0)
           

            this.scrollWrapper.addChild(this.scrollContent);
            this.quoteWrapper.addChild(this.scrollWrapper);


            const style = new PIXI.TextStyle({
                fontFamily: "Trade Gothic Next",
                fontSize: 32,
                breakWords: true,
                fontWeight: 300,
                lineHeight: 40,
                whiteSpace: "pre",
                wordWrap: true,
                padding: 10,
                wordWrapWidth: 550,
                leading: 1,
                textBaseline: "middle"
            });



            this.quotesToShow = [
                {
                    title: "PRIVACY POLICY",
                    subtitle: "",
                    credit: "",
                    paragraph:"<privacy>\n<u><bold>Your private information</bold></u>: You should not share or provide your own private information in the chat functionality. If you do, others may keep or store such information. Science Gallery Dublin accepts no liability for such. For information on our Privacy Policy and Data Retention Policy please visit sciencegallery.org/privacy.\n\n<bold>Other information</bold>: You may not publish or post other people's private information (such as names, home phone number and address) without their express permission.\nWe also prohibit threatening to expose private information or incentivizing others to do so. \n\n<bold>Authenticity</bold>\nPlatform manipulation and spam: You may not use the comment section in a manner intended to artificially amplify or suppress information or engage in behaviour that manipulates or disrupts people’s experience. \n\n<u>Civic integrity</u>: You may not use the comment section for the purpose of manipulating or interfering in elections or other civic processes. This includes posting or sharing content that may suppress participation or mislead people about when, where, or how to participate in a civic process. \n\n<u>Impersonation</u>: You may not impersonate individuals, groups, or organizations in a manner that is intended to or does mislead, confuse, or deceive others. \n\n<u>Synthetic and manipulated media</u>: You may not deceptively share synthetic or manipulated media that are likely to cause harm. \n\n<u>Copyright and trademark</u>: You may not violate others’ intellectual property rights, including copyright and trademark. \n\n<u>Enforcement</u>\nIf you violate the rules your chat functionality will be disabled and you may be removed from the exhibition. \n\n<u>Complaints and Reporting</u> \nAny person using the chat functionality may report or make a complaint about content being posted by another user by emailing <link>info@dublin.sciencegallery.com</link>.\n\n<bold>SAFETY</bold>\n\n<u>Violence</u>: You may not threaten violence against an individual or a group of people. \n\n<u>Terrorism/violent extremism</u>: You may not threaten or promote terrorism or violent extremism. \n\n<u>Child sexual exploitation</u>: We have zero tolerance for child sexual exploitation. \n\n<u>Abuse/harassment</u>: You may not engage in the targeted harassment of someone, or incite other people to do so. This includes wishing or hoping that someone experiences physical harm. \n\n<u>Hateful conduct</u>: You may not promote violence against, threaten, or harass other people on the basis of race, ethnicity, national origin, caste, sexual orientation, gender, gender identity, religious affiliation, age, disability, or serious disease. \n\n<u>Suicide or self-harm</u>: You may not promote or encourage suicide or self-harm. \n\n<u>Linking content</u>: You may not link any content through the comments section.  You may not post pictures, videos or any other contents through the comments section. \n\n<u>Illegal or certain regulated goods or services</u>: You may not use the chat function for any unlawful purpose or in furtherance of illegal activities. This includes selling, buying, or facilitating transactions in illegal goods or services, as well as certain types of regulated goods or services.\n\n</privacy>",
                    style: "",
                    type: ""
                },
                {
                    title: "TERMS & CONDITIONS",
                    subtitle: "",
                    credit: "",
                    paragraph:"<privacy>\n<bold>The Mark Allen Group (MAG) includes the following companies: MA Music, Leisure and Travel Ltd (MAMLT), MA Business Ltd (MAB), Airport Publishing Network (APN), MA Healthcare Ltd (MAHC), George Warman Publications (GWP), MA Education Ltd (MAED) & MA Exhibitions (MAX). MAG is registered at St Jude’s Church, Dulwich Road, London, SE24 0PB. These Terms & Conditions may vary from time to time, so please check them regularly.</bold>\n\n<bold>1. Definition:</bold> In these rules and regulations the term ‘Exhibitor’ includes all employees or agents of such and the term ‘Exhibition’ will be deemed to mean the Exhibition element of this event, organised by MA Exhibitions Limited.\n\n<bold>2. Charges for Exhibition Space:</bold> Exhibition space charges are indicated on the contract to exhibit booking form.\n\n<bold>3. Payment of Space:</bold> Once Exhibitor’s contract to exhibit booking form has been accepted and the exhibitor space has been allocated, Exhibitor is contracted to the exhibitor space. The payment schedule is as set out in the contract to exhibit booking form. Exhibitor must have made payment in full before Exhibitor will be permitted to install its display. No firm or organisation not assigned exhibit space will be permitted to solicit business from an Exhibitor’s stand space.\n\n<bold>4. Cancellation of Space</bold>: In order to reserve stand space, MA Exhibitions Limited may ask for a non-refundable deposit as set out in the contract to exhibit booking form. In exceptional circumstances MA Exhibitions Limited will be prepared to consider cancellation of their contract with Exhibitor, if written cancellation is received 12 weeks prior to the event taking place, but only if the following conditions are complied with:- \n\n<i>(a) that the request for cancellation is submitted by registered post; \n(b) that the request is received at least 12 weeks prior to the opening of the Exhibition; \n(c) that MA Exhibitions Limited is able to re-let the cancelled space in its entirety; and \n(d) that the reason given for the request for cancellation is, in the opinion of MA Exhibitions Limited, well founded.</i> \n\nIn the event of cancellation, Exhibitor shall be liable for and MA Exhibitions Limited shall be entitled to collect and/or retain any sums relating to any of the exhibition fees which have already fallen due for payment as set out in the contract to exhibit booking form or 10% of the total amount of the exhibition fee (minus the non-refundable deposit payment), whichever is greater. In the event that an Exhibitor wishes to reduce the size of its stand space as set out in the contract to exhibit booking form, Exhibitor must send notification in writing to MA Exhibitions by recorded delivery. MA Exhibitions reserves the right to make cancellation charges pro rata to the stand space which has been cancelled and to apply those cancellation charges on the same liability scale as set out in this condition. Notwithstanding the above, Exhibitor will be entitled to cancel the reserved space without penalty within 28 days of the previous year’s Exhibition taking place.\n\n<bold>5. Stand Construction:</bold> Exhibitor will be solely responsible for the erection of their stand.\n\n<bold>6. Allotment of Space:</bold> Each Exhibitor is required to give a formal acceptance of the area allotted to them. Exhibitor should make any request for a specific space on the contract to exhibit booking form.\n</privacy>\n",
                    style: "",
                    type: ""
                },
                {
                    title:"<boldtitle>WELCOME TO BIAS ONLINE</boldtitle>",
                    subtitle:"",
                    credit:"——",
                    paragraph: "\n<p>We’re launching our very first online-only exhibition: BIAS ONLINE bring online visitors on a journey of compelling exploration through datasets, emotion and facial recognition and artificial intelligence with new artworks from Libby Heaney, Johann Diedrick, Mushon Zer-Aviv, and Noah Levenson. BIAS ONLINE was developed and supported by Science Gallery at Trinity College Dublin as part of the European ARTificial Intelligence Lab project. Co-funded by Creative Europe.\n\n</p>",
                    style:"",
                    type: "face"
                },
                {
                    title: "ARTISTS",
                    subtitle: "",
                    credit: "",
                    paragraph:"\n<img imgSrc='mushonThumb' imgDisplay='inline' />\n<p><bold>Mushon Zer-Aviv</bold> is a designer, researcher, educator and media activist based in Tel Aviv. His love/hate relationship with data informs his design work, art pieces, activism, research, teaching, workshops and city life. He is currently writing a non-fiction book about friction – a design theory of change. Among Mushon’s collaborations, he is the CO-founder of Shual.com – a foxy design studio – and multiple government transparency and civic participation initiatives with the Public Knowledge Workshop; Mushon also designed the maps for Waze.com and led the design of Localize.city. \n\nMushon is an alumni of Eyebeam art + technology center in New York. He is a senior faculty member at Shenkar College and has previously taught at NYU, Parsons, and Bezalel. Adam Kariv developed the code for the work. Additionally, Mushon Zer-Aviv would like to thank the Science Gallery at Trinity College Dublin for commissioning this work.\n\n<link>mushon.com</link> // <link>@mushon</link>\n\n\n\n\n<img imgSrc='johannThumb' imgDisplay='inline' />\n\n<bold>Johann Diedrick</bold> is an artist, engineer, and musician that makes installations, performances, and sculptures for encountering the world through our ears. He surfaces vibratory histories of past interactions inscribed in material and embedded in space, peeling back sonic layers to reveal hidden memories and untold stories. He shares his tools and techniques through listening tours, workshops, and open-source hardware/software.\n\nHe is the founder of A Quiet Life, a sonic engineering and research studio that designs and builds audio-related software and hardware products for revealing possibilities off the grid through sonic encounter. He is a 2021 Mozilla Creative Media Award recipient, a member of NEW INC, and an adjunct professor at NYU\'s ITP program. His work has been featured in Wire Magazine, Musicworks Magazine, and presented internationally at MoMA PS1, Ars Electronica, and the Somerset House, among others. This project is supported by the Mozilla Foundation.\n\n<link>darkmatters.ml</link> // <link>@johanndiedrick</link>\n\n\n\n\n<img imgSrc='libbyThumb' imgDisplay='inline' />\n\n<bold>Libby Heaney</bold>\'s post-disciplinary art practice includes moving image works, performances and participatory and interactive experiences that span quantum computing, virtual reality, AI and installation. Her practice uses affect, humour, surrealism and nonsense to subvert the capitalist appropriation of technology, the endless categorizations of humans and non-humans alike. She uses tools like machine learning and quantum computing against their \'proper\' use, to undo biases and to forge new expressions of collective identity and belonging with each other and the world. She has exhibited widely in the UK and internationally, including Tate Modern, the V&A, London and Mutek & Sonar Festivals. She is currently resident of the London institution Somerset House, where she is currently working on a major commission with quantum computing for Berlin\'s Light Art Space. Sound Design by Barney Kass and the artist would also like to thank Public Space Surveillance Manager at Hackney Council, Oliver Martin and acknowledge the Art Quest Adaptations Residency for acting as a catalyst for this work.\n\n<link>libbyheaney.co.uk</link> // <link>@libby_heaney_</link>\n\n\n\n\n<img imgSrc='noahThumb' imgDisplay='inline' />\n\n<bold>Noah Levenson</bold> leads research engineering as \"Hacker in Residence\" at Consumer Reports Digital Lab. He is a 2019 Rockefeller Foundation Bellagio fellow. His computer science work has been profiled by Scientific American, MIT, Engadget, CBC News, and Fast Company, among others. He lives in New York City, where he was born.\n\n<link>noahlevenson.com</link> // <link>@noahlevenson</link>\n\n\n\n</p>",
                    style: "",
                    type: ""
                },
                //
                //
                //
                
                //PROJECTS
                {
                    title: "ARTWORKS",
                    subtitle: "",
                    credit: "",
                    paragraph:'<gap>\n</gap><img imgSrc="dialIconThumb" /><gap>\n</gap><boldtitle>NORMALIZI.NG</boldtitle>\n<subtitle>What does normal look like?</subtitle>\n<gap>\n</gap><gap>\n</gap><p>NORMALIZI.NG by Mushon Zer-Aviv is a new digital commission further developing and adapting his existing work “The Normalizing Machine”. This experimental online research in machine-learning aims to analyze and understand how we decide who looks more “normal”. By contributing to the dataset and choosing between faces you deem more normal, the machine analyzes your decisions and will add you to its algorithmic map of normality.\n\nIn the late 1800s, the French forensics pioneer Alphonse Bertillon, the father of the mugshot, developed ‘Le Portrait Parle’ (the speaking portrait), a system for standardizing, indexing and classifying the human face. His statistical system was never meant to criminalize the face, but it was later widely adopted by both the eugenics movement and the Nazis to do exactly that.\n\nThe online work automates Alphonse’s speaking portraits and visualizes how today’s systematic discrimination is aggregated, amplified and conveniently hidden behind the seemingly objective black box of artificial intelligence.\n\n\n\n\n<img imgSrc="talkingIconThumb" imgDisplay="block" /><gap>\n</gap><boldtitle>DARK MATTERS</boldtitle>\n<subtitle>What does bias sound like?</subtitle>\n<gap>\n</gap><gap>\n</gap><p>Dark Matters exposes the absence of Black speech in the datasets used to train voice interface systems in consumer AI products like Alexa and Siri. Using 3D modeling, sound and storytelling, the project challenges us to grapple with racism and inequity through speech and the spoken word, and how AI systems underserve Black communities.</p>\n\n\n\n\n<img imgSrc="robotIconThumb" imgDisplay="block" /><gap>\n</gap><boldtitle>CLASSES</boldtitle>\n<subtitle>How are biases translated into code?</subtitle>\n<gap>\n</gap><gap>\n</gap><p>CLASSES is a video essay exploring the entanglements between machine learning classification and social class(ification). The artwork takes place in a simulated model of a London council estate, where the artist lives. Machine and human voices playfully narrate aspects of her in-depth research into accented speech recognition, natural language processing* and public space surveillance, to understand how historical and cultural biases around social class are being translated into code and how this affects people’s material conditions.\n\nTowards the end of the essay, the artist finds inspiration in her community gardening on the estate to propose a rewilded AI that removes rigid hierarchical categories to build stronger relations between people and the world.\n\n\n\n\n<img imgSrc="faceIconThumb" imgDisplay="block" /><gap>\n</gap><boldtitle>STEALING UR FEELINGS</boldtitle>\n<subtitle>Can the internet read you?</subtitle>\n<gap>\n</gap><gap>\n</gap><p>Meet the new A.I. that knows you better than you know yourself. STEALING UR FEELINGS is an interactive film that learns your deepest, darkest secrets - just by looking at your face.  That\'s the good news. The bad news? Your favourite apps are doing exactly the same thing.</p>',
                    style: "",
                    type: ""
                },
                //Credits
                {
                    title:"CREDITS",
                    subtitle:"",
                    credit:"",
                    paragraph: "<gap>\n</gap><p><bold>BIAS ONLINE</bold> was developed with the support of the European ARTificial Intelligence Lab, co-funded by the Creative Europe Programme of the European Union\n\n<bold>BIAS ONLINE</bold> was created with the support of The Department of Tourism, Culture, Arts, Gaeltacht, Sport and Media.\n\n<bold>Project Team</bold>: Aisling Murray, Mitzi D'Alton, Rory McCorrmick, Niamh O' Doherty, James Delaney \n<bold>Artists:</bold> Johann Diedrick, Libby Heaney, Mushon Zer-Aviv, Noah Levenson\n<bold>Music & Sound Design</bold> by Tom Winters\n\n</p>",
                    style:"",
                    type: ""
                },
                //Privacy
                {
                    title:"SAFETY AND PRIVACY INFO",
                    subtitle:"",
                    credit:"",
                    paragraph: "<privacy>\n<bold>SAFETY</bold>\n\n<u>Violence</u>: You may not threaten violence against an individual or a group of people. \n\n<u>Terrorism/violent extremism</u>: You may not threaten or promote terrorism or violent extremism. \n\n<u>Child sexual exploitation</u>: We have zero tolerance for child sexual exploitation. \n\n<u>Abuse/harassment</u>: You may not engage in the targeted harassment of someone, or incite other people to do so. This includes wishing or hoping that someone experiences physical harm. \n\n<u>Hateful conduct</u>: You may not promote violence against, threaten, or harass other people on the basis of race, ethnicity, national origin, caste, sexual orientation, gender, gender identity, religious affiliation, age, disability, or serious disease. \n\n<u>Suicide or self-harm</u>: You may not promote or encourage suicide or self-harm. \n\n<u>Linking content</u>: You may not link any content through the comments section.  You may not post pictures, videos or any other contents through the comments section. \n\n<u>Illegal or certain regulated goods or services</u>: You may not use the chat function for any unlawful purpose or in furtherance of illegal activities. This includes selling, buying, or facilitating transactions in illegal goods or services, as well as certain types of regulated goods or services.\n\n<bold>PRIVACY</bold>\n\n<u><bold>Your private information</bold></u>: You should not share or provide your own private information in the chat functionality. If you do, others may keep or store such information. Science Gallery Dublin accepts no liability for such. For information on our Privacy Policy and Data Retention Policy please visit sciencegallery.org/privacy.\n\n<bold>Other information</bold>: You may not publish or post other people's private information (such as names, home phone number and address) without their express permission.\nWe also prohibit threatening to expose private information or incentivizing others to do so. \n\n<bold>Authenticity</bold>\nPlatform manipulation and spam: You may not use the comment section in a manner intended to artificially amplify or suppress information or engage in behaviour that manipulates or disrupts people’s experience. \n\n<u>Civic integrity</u>: You may not use the comment section for the purpose of manipulating or interfering in elections or other civic processes. This includes posting or sharing content that may suppress participation or mislead people about when, where, or how to participate in a civic process. \n\n<u>Impersonation</u>: You may not impersonate individuals, groups, or organizations in a manner that is intended to or does mislead, confuse, or deceive others. \n\n<u>Synthetic and manipulated media</u>: You may not deceptively share synthetic or manipulated media that are likely to cause harm. \n\n<u>Copyright and trademark</u>: You may not violate others’ intellectual property rights, including copyright and trademark. \n\n<u>Enforcement</u>\nIf you violate the rules your chat functionality will be disabled and you may be removed from the exhibition. \n\n<u>Complaints and Reporting</u> \nAny person using the chat functionality may report or make a complaint about content being posted by another user by emailing <link>info@dublin.sciencegallery.com</link>.\n</privacy>",
                    style:"",
                    type: "face"
                },{
                    title:"HELP",
                    subtitle:"",
                    credit:"",
                    paragraph: "<gap>\n</gap><p><bold>Desktop</bold>: Use the WASD keys to move up, down, left and right. Your mouse cursor controls which way your character is looking.\n\n<bold>Mobile</bold>: Use the joystick in the bottom left corner of the screen to move your character.\n\n</p>",
                    style:"",
                    type: "face"
                },{
                    title:"FEEDBACK",
                    subtitle:"",
                    credit:"",
                    paragraph: "<gap>\n</gap><p>Please give us your <link>feedback</link>!\n\n</p>",
                    style:"",
                    type: "face"
                },
                {
                    title:"<gap>\n</gap><boldtitle>CLASSES</boldtitle>",
                    subtitle:"<gap>\n</gap>How are biases translated into machine codes and practises?",
                    credit: "Libby Heaney | UK | 2021 \n<link>libbyheaney.co.uk</link> // <link>@libby_heaney_</link>",
                    paragraph: '<p>CLASSES is a video essay exploring the entanglements between machine learning classification and social class(ification). The artwork takes place in a simulated model of a London council estate, where the artist lives. Machine and human voices playfully narrate aspects of her in-depth research into accented speech recognition, natural language processing* and public space surveillance, to understand how historical and cultural biases around social class are being translated into code and how this affects people’s material conditions.\n\n\n',
                    style: "",
                    type: "talking"  
                },
                {
                    title:"<gap>\n<img imgSrc='headerImage' imgDisplay='icon' />\n\n\n</gap><boldtitle>BIAS IN NEUROPLASTICITY</boldtitle>",
                    subtitle:"<gap>\n</gap><subtitle>“We see things not as they are, but as we are.”\n— Anais Nin</subtitle>",
                    credit: "Dealing With Bias in Artificial Intelligence. New York Times. <link>https://www.nytimes.com/</link> \n\n",
                    paragraph: "<p>Bias is an unavoidable feature of life, the result of the necessarily limited view of the world that any single person or group can achieve. But social bias can be reflected and amplified by artificial intelligence in dangerous ways, whether it be in deciding who gets a bank loan or who gets surveilled.\n\nThe New York Times spoke with three prominent women in A.I. to hear how they approach bias in this powerful technology. Daphne Koller is a co-founder of the online education company Coursera, and the founder and chief executive of Insitro, a company using machine learning to develop new drugs. Dr. Koller, an adjunct professor in the computer science department at Stanford University, spoke to bias through the lens of machine-learning models.\n\nOlga Russakovsky is an assistant professor in the Department of Computer Science at Princeton University who specializes in computer vision and a co-founder of the AI4ALL foundation that works to increase diversity and inclusion within A.I. Dr. Russakovsky is working to reduce bias in ImageNet, the data set that started the current machine-learning boom.\n</p><gap>\n<img imgSrc='headerImageTwo' imgDisplay='icon' />\n</gap><p>\n\nTimnit Gebru is a research scientist at Google on the ethical A.I. team and a co-founder of Black in AI, which promotes people of color in the field. Dr. Gebru has been instrumental in moving a major international A.I. conference, the International Conference on Learning Representations, to Ethiopia next year after more than half of the Black in AI speakers could not get visas to Canada for a conference in 2018. She talked about the foundational origins of bias and the larger challenge of changing the scientific culture. Their comments have been edited and condensed.\n</p>",
                    style: "",
                    type: "talking"  
                },
                {
                    title:"<boldtitle>Multiuse Stage!<gap></gap></boldtitle>",
                    subtitle:"\n<subtitle>You can see everyone's take</subtitle>",
                    credit: "Upsizing the People. \n<link>link.link</link>",
                    paragraph: '<p>Motor Engineers</p>\n',
                    style: "",
                    type: "talking"  
                }

                 

            ]

            const headerImage = new PIXI.Sprite.from('images/bias-header.png');
            const headerImageTwo = new PIXI.Sprite.from('images/bias-header-2.png');
            

           
            


            
            const johannThumb = new PIXI.Sprite.from('images/johann-thumb-large.png')
            const mushonThumb = new PIXI.Sprite.from('images/mushon-thumb-large.png')
            const libbyThumb = new PIXI.Sprite.from('images/libby-thumb-large.png')
            const noahThumb = new PIXI.Sprite.from('images/noah-thumb-large.png')
            
            const robotIconThumb = new PIXI.Sprite.from('images/classes-header.png');
            const dialIconThumb = new PIXI.Sprite.from('images/normalising-machine-header.png');
            const faceIconThumb = new PIXI.Sprite.from('images/stealing-header.png');
            const talkingIconThumb = new PIXI.Sprite.from('images/dark-matters-header.png');


            this.textContent = new PUXI.TextWidget('', style)
            this.textContent.contentContainer.interactive = true

            const loadingTextStyle = new PIXI.TextStyle({
                fontFamily: "Trade Gothic Next",
                fontSize: 18,
                fontWeight: 700,
                wordWrap: true,
                padding: 10,
            });

            this.loadingText = new PIXI.Text('\nLoading...', loadingTextStyle)
            this.textContent.contentContainer.addChild(this.loadingText)

            this.connectedText = new TaggedText("", {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "28px",
                    wordWrap: true,
                    lineHeight: 35,
                    padding: 10,
                    fontWeight: 300,
                    wordWrapWidth: 540,
                    leading: 1,
                    fill: this.black,
                    textBaseline: "alphabetical"
                },
                "intro": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "28px",
                    wordWrap: true,
                    lineHeight: 36,
                    padding: 10,
                    fontWeight: 300,
                    wordWrapWidth: 385,
                    leading: 1,
                    textBaseline: "middle",
                },
                "bold": {
                    fontWeight: 700,
                },
                "boldtitle": {
                    fontWeight: 900,
                    fontSize: "32px",
                    wordWrap: true,
                    lineHeight: 28,
                    wordWrapWidth: 385,
                    textDecoration:"underline",
                    underlineThickness: 2
                },
                "gap": {
                    fontSize: "9px",
                },
                "subtitle": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "26px",
                    lineHeight: 30,
                    padding: 10,
                    fontWeight: 300,
                    wordWrap: true,
                    wordWrapWidth: 385,
                    leading: 1,
                    textBaseline: "middle",
                },
                "i": {
                    fontStyle: "italic",
                },
                "p": {
                    fontSize: "18px",
                    lineHeight: 25,
                    fontWeight: 300,
                },
                "link": {
                    fill: this.blue,
                },
                "u": {
                    textDecoration: "underline",
                },
                "privacy": {
                    fontSize: "14px",
                    lineHeight: 20,
                    wordWrap: true,
                    padding: 15,
                    wordWrapWidth: 385,
                    textBaseline: "alphabetical",
                },
                "extrasmall": {
                    fontSize: "16px",
                    lineHeight: 24,
                    wordWrap: true,
                    wordWrapWidth: 385,
                    textBaseline: "alphabetical",
                },
                "img": {
                    fontSize: "100px",
                }
            }, { imgMap: { 
                johannThumb, 
                mushonThumb, 
                libbyThumb, 
                noahThumb, 
                robotIconThumb, 
                talkingIconThumb, 
                dialIconThumb, 
                faceIconThumb, 
                headerImage, 
                headerImageTwo
            },  drawWhitespace: true, skipUpdate: false, skipDraw: false, debug: false, debugConsole: false });
            
        
        
            this.textContent.contentContainer.addChild(this.connectedText)
            this.textContent.contentContainer.children[0].alpha = 0
    

            this.leaveButtonWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.9835,
                    y: 15,
                    anchor: new PIXI.Point(1,0)
                }),
            )
            this.leaveButtonWrapper.contentContainer.interactive = true
            this.leaveButtonWrapper.contentContainer.buttonMode = true

            const closeButtonStyles = new PIXI.TextStyle({ 
                fontFamily: 'Trade Gothic Next',
                fill: black, 
                fontSize: "26px",
                fontWeight: 300, 
            })

            this.leaveButton = new PUXI.Button({
                text: '',
            }).setLayoutOptions(new PUXI.FastLayoutOptions({
                width: 0.9999,
                height: 0.9999,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }))
            this.leaveButtonWrapper.addChild(this.leaveButton)

            const leaveButtonText = new PIXI.Text('×', closeButtonStyles)
            leaveButtonText.x = 12
            leaveButtonText.y = 5
            leaveButtonText.alpha = 0.8

            this.leaveButton.contentContainer.addChild(leaveButtonText)
            const leaveButtonClick = new PUXI.ClickManager(this.leaveButton, true, false, false)
            this.leaveButton.contentContainer.alpha = 0
            const leaveButton = this.leaveButton.contentContainer

            leaveButtonClick.onClick = function(){
                userInterface.closeModal()
            }
            leaveButtonClick.onHover = function(){
                leaveButtonText.alpha = 1
            }

            setTimeout(function(){
                leaveButton.alpha = 1
            }, 500)
            
            ease.add(this.leaveButtonWrapper.contentContainer, this.fadeInStyles, this.fadeInSettingsDelay)










            let textContainer = this.textContent
            

            setTimeout(function(){
                textContainer.alpha = 1
            }, 1000)


            this.scrollContent.addChild(this.textContent)
            this.quoteWrapper.contentContainer.alpha = 0
            this.quoteWrapper.addChild(this.leaveButtonWrapper)
            this.quoteBackground.addChild(this.quoteWrapper)
            this.quoteStage.addChild(this.quoteBackground)
            

            this.quoteStage.resize(window.innerWidth, window.innerHeight)


        }

        if(this.miniMapOn == true) {

            if(window.innerWidth <= 500) {
                this.miniMapWidth = 30
            } else {
                this.miniMapWidth = 20
            }
            
            this.miniMapHeight = 25
            let miniMapWidth = this.miniMapWidth
            let miniMapHeight = this.miniMapHeight
            
            this.miniMapStage = new PUXI.Stage({
                width: this.miniMapWidth,
                height: this.miniMapHeight
            })
            let miniMapStage = this.miniMapStage

            this.miniMapStage.visible = true

            this.miniMapWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: this.miniMapWidth,
                    height: this.miniMapHeight,
                    x: 0.987,
                    y: 0.985,
                    anchor: new PIXI.Point(1,1)
                })
            )
            let miniMapWrapper = this.miniMapWrapper
            
            this.miniMapStage.addChild(this.miniMapWrapper)


            this.miniMap = new PIXI.Container()
            this.miniMap.width = this.miniMapWidth
            this.miniMap.height = this.miniMapHeight
            this.miniMap.visible = false
            let miniMap = this.miniMap

            this.miniMapBackground = new Graphics()
            this.miniMapBackground.lineStyle(2, white, 0.3)
            this.miniMapBackground.beginFill(black, 1, true)
            this.miniMapBackground.drawRoundedRect(0, 0, this.miniMapWidth, this.miniMapHeight, 10)
            this.miniMapBackground.endFill()
            this.miniMapBackground.visible = false
            let miniMapBackground = this.miniMapBackground
            

            this.miniMapPlayerPosition = new Graphics()
            this.miniMapPlayerPosition.lineStyle(1, yellow, 0.5)
            this.miniMapPlayerPosition.beginFill(yellow, 0, true)
            this.miniMapPlayerPosition.drawRect(-(window.innerWidth/25)/2, -(window.innerHeight/25)/2, window.innerWidth/25, window.innerHeight/25)
            this.miniMapPlayerPosition.endFill()
            this.miniMapPlayerPosition.beginFill(yellow, 1, true)
            this.miniMapPlayerPosition.drawCircle(0, 0, 1)
            this.miniMapPlayerPosition.endFill()
            this.miniMapPlayerPosition.pivot.set(0.5, 0.5)
            this.miniMapPlayerPosition.visible = false
            this.miniMapPlayerPosition.alpha = 0
            let miniMapPlayerPosition = this.miniMapPlayerPosition

            this.miniMapWrapper.contentContainer.addChild(this.miniMapBackground)
            this.miniMapWrapper.contentContainer.addChild(this.miniMap)
            this.miniMapWrapper.contentContainer.addChild(this.miniMapPlayerPosition)



            this.mapIcon = PIXI.Sprite.from(resources['mapIcon'].texture);
            this.mapIcon.x = 5
            this.mapIcon.y = 5
            this.mapIcon.alpha = 1

            this.mapIcon.interactive = true
            this.mapIcon.buttonMode = true

            this.miniMapOpen = false
            let miniMapOpen = this.miniMapOpen
            let mapIcon = this.mapIcon 

            this.mapIcon.on('pointerdown', function(){
                if(miniMapOpen) {

                    miniMap.visible = false

                    if(window.innerWidth <= 500) {
                        mapIcon.x = 0
                    }

                    miniMapHeight = 25
                   
                    miniMapBackground.visible = false
                    miniMapPlayerPosition.visible = false
                    miniMapOpen = false

                    miniMapBackground.clear()
                    miniMapBackground.lineStyle(0)
                    miniMapBackground.beginFill(white, 0, true)
                    miniMapBackground.drawRoundedRect(0, 0, miniMapWidth, miniMapHeight, 10)
                    miniMapBackground.endFill()

                    miniMapStage.resize(window.innerWidth, window.innerHeight)
                    const miniMapBounds = miniMapBackground.getBounds()
                    miniMapStage.stage.hitArea = new PIXI.Rectangle(
                        miniMapBounds.x,
                        miniMapBounds.y,
                        miniMapBounds.width,
                        miniMapBounds.height
                    )

                } else {
                    console.log('open')
                    miniMapOpen = true
                    miniMap.visible = true
                    miniMapWidth = 210
                    miniMapHeight = 150
                    mapIcon.x = 5

                    miniMapBackground.clear()
                    miniMapBackground.lineStyle(1, white, 0.3)
                    miniMapBackground.beginFill(black, 1, true)
                    miniMapBackground.drawRoundedRect(0, 0, miniMapWidth, miniMapHeight, 10)
                    miniMapBackground.endFill()
    
                    miniMapPlayerPosition.visible = true
                    
                    miniMapBackground.visible = true

                    miniMapWrapper.setLayoutOptions(
                        new PUXI.FastLayoutOptions({
                            width: this.miniMapWidth,
                            height: this.miniMapHeight,
                            x: 0.987,
                            y: 0.985,
                            anchor: new PIXI.Point(1,1)
                        })
                    )
                    
    
                    miniMapStage.resize(window.innerWidth, window.innerHeight)
                    const miniMapBounds = miniMapBackground.getBounds()
                    miniMapStage.stage.hitArea = new PIXI.Rectangle(
                        miniMapBounds.x,
                        miniMapBounds.y,
                        miniMapBounds.width,
                        miniMapBounds.height
                    )

                }
               
            })

            this.miniMapWrapper.contentContainer.addChild(this.mapIcon)



            this.addChild(this.miniMapStage)
            this.miniMapStage.resize(window.innerWidth, window.innerHeight)
            const miniMapBounds = this.miniMapBackground.getBounds()
            this.miniMapStage.stage.hitArea = new PIXI.Rectangle(
                miniMapBounds.x,
                miniMapBounds.y,
                miniMapBounds.width,
                miniMapBounds.height
            )



        }



        if(this.joinModalOn == true) {

       
           
            this.joinModal = new PUXI.Stage(
                window.innerWidth,
                window.innerHeight
            )   
            this.joinModal.visible = false
            
            
            this.joinModalWrapper = new PUXI.Widget({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999999, 
                    height: 0.99999,
                }),
            )//.setBackground(green)
            
            
            //this.drawGridBackground(window.innerWidth, window.innerHeight)

            let modalWidth = 0.9999
            let modalHeight = 0.9999;

            //Modal Centre Box Wrapper 
            this.joinModalWidgetGroup = new PUXI.WidgetGroup().setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 0.5, y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                    width: 600,
                    height: 300
                }),
            )

            //Whats your name
            this.joinTitleWrapper = new PUXI.Widget({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.99999,
                    height: 50
                }),
            )

            const joinTitleTagged = new TaggedText("What’s your name?", {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fill: white, 
                    fontWeight: 900,
                    fontSize: "58px", 
                    wordWrap: true,
                    align: "center",
                    wordWrapWidth: 600 
            }})
            
            this.joinTitleWrapper.contentContainer.addChild(joinTitleTagged)


            //Name Input Field
            this.inputBox = new PUXI.WidgetGroup().setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 650,
                    height: 75,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            ).setBackground(white).setBackgroundAlpha(1);
            const inputBox = this.inputBox

            //Text Styles for Input and Placeholder
            const textStyles = new PIXI.TextStyle({ 
                fontFamily: 'Trade Gothic Next',
                fill: black, 
                fontSize: 32
            })
           
            //The Text Input
            this.nameFieldInput = new PUXI.TextInput({
                multiLine: false,
                value: "",
                padding: 20,
                maxLength: 25,
                align: "center",
                fontVariant: "small-caps",
                selectedColor: black,
                selectedBackgroundColor: white,
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
            
            this.inputBox.addChild(this.nameFieldInput)
            
            //Placeholder Text
            this.nameFieldPlaceholder = new PUXI.TextWidget(
                'Username', 
                textStyles
            ).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 20,
                    y: 21,
                })
            )
            this.nameFieldPlaceholder.alpha = 0.4;
            const nameFieldPlaceholder = this.nameFieldPlaceholder
            this.inputBox.widgetChildren[0].on('focus', () => { 
                nameFieldPlaceholder.alpha = 0;

                const errorToRemove = inputBox.contentContainer.children[0].getChildByName("inputError")
                //console.log(errorToRemove)
                inputBox.contentContainer.children[0].removeChild(errorToRemove)

            });
            this.inputBox.widgetChildren[0].on('blur', () => { 
                if(this.nameFieldInput.value != '') {
                    nameFieldPlaceholder.alpha = 0;
                } else {
                    nameFieldPlaceholder.alpha = 0.4;
                }
            });
            
            this.inputBox.addChild(this.nameFieldPlaceholder);
            this.inputBox.contentContainer.interactive = true;
            this.inputBox.contentContainer.buttonMode = true;
            this.inputBox.contentContainer.cursor = "text";

        
            this.inputBox.contentContainer.on("mouseover", function() {
                inputBox.setBackground(white)
            });
            this.inputBox.contentContainer.on("mouseout", function() {
                inputBox.setBackground(white)
            });









            //select avatar 
            //Logo Wrapper + Logo
            this.avatarWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 100,
                    height: 100,
                    x: 0.5,
                    y: 0.525,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )


            this.avatarBox = new PUXI.Widget({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 100,
                    height: 100,
                    x: 0.5,
                    y: 0.5,
                    anchor: new PIXI.Point(0,0)
                }),
            )

            var avatarCounter = 1
            let avatarBox = this.avatarBox


            let color
            this.color = color

            this.avatarImageWrapper = new PIXI.Container()
            const avatarImageWrapper = this.avatarImageWrapper

        
                setInterval(function(){
                    if(loaded == true) {

                        let avatarBackground = Math.floor(Math.random() * 5) + 1
                        let avatarMiddleground = Math.floor(Math.random() * 5) + 1
                        let avatarMiddleground2 = Math.floor(Math.random() * 5) + 1
                        let avatarForeground = Math.floor(Math.random() * 5) + 1

                        let angle1 = Math.floor(Math.random() * 358) + 1
                        let angle2 = Math.floor(Math.random() * 358) + 1
                        let angle3 = Math.floor(Math.random() * 358) + 1
                        let angle4 = Math.floor(Math.random() * 358) + 1

                        avatarBox.contentContainer.removeChildren()
            
                        /*if(avatarBox.contentContainer.children.length > 0) {
                            avatarImageWrapper.removeChildAt(0)
                            avatarImageWrapper.removeChildAt(0)
                            avatarImageWrapper.removeChildAt(0)
                            avatarImageWrapper.removeChildAt(0)
                            avatarBox.contentContainer.removeChildAt(0)
                            avatarBox.contentContainer.removeChildAt(0)
                            avatarBox.contentContainer.removeChildAt(0)
                        }
                        
            
                        avatarBackground = PIXI.Sprite.from(avatars[0][avatarBackground].url);
                        avatarMiddleground= PIXI.Sprite.from(avatars[1][avatarMiddleground].url);
                        avatarMiddleground2 = PIXI.Sprite.from(avatars[1][avatarMiddleground2].url);
                        avatarForeground = PIXI.Sprite.from(avatars[2][avatarForeground].url);
            
                        avatarBackground.roundPixels = true
                        avatarMiddleground.roundPixels = true
                        avatarMiddleground2.roundPixels = true
                        avatarForeground.roundPixels = true

                        
                        avatarBackground.width = 97
                        avatarBackground.height = 97
                        avatarBackground.anchor.set(0.5,0.5)
                        avatarBackground.rotation = angle1
                        //avatarMiddleground.alpha = 0

                        avatarMiddleground.width = 97
                        avatarMiddleground.height = 97
                        avatarMiddleground.anchor.set(0.5,0.5)
                        avatarMiddleground.rotation = angle2
                        //avatarMiddleground.alpha = 0

                        avatarMiddleground2.width = 97
                        avatarMiddleground2.height = 97
                        avatarMiddleground2.anchor.set(0.5,0.5)
                        avatarMiddleground2.rotation = angle3
                        //avatarMiddleground2.cacheAsBitmap = true
                        //avatarMiddleground2.alpha = 0

                        avatarForeground.width = 97
                        avatarForeground.height = 97
                        avatarForeground.anchor.set(0.5,0.5)
                        avatarForeground.rotation = angle4
                        //avatarForeground.alpha = 0
                        //avatarMiddleground2.cacheAsBitmap = true
                    
                        */

                        color = '#'+(Math.random() * white << 0).toString(16).padStart(6, '0');
                        let colorNow = PIXI.utils.string2hex(color);
                        userInterface.updateColor(color)
                       
                        //console.log(colorNow)
                        
                        let nose = new Graphics()
                        nose.lineStyle(0)
                        nose.moveTo(0, -48*3)
                        nose.beginFill(colorNow, 1.0, true)
                        nose.moveTo(0, -48*3)
                        nose.lineTo(85*3, 0)
                        nose.lineTo(0, 48*3)
                        nose.scale.set(0.333)
                        //nose.cacheAsBitmap = true
                        nose.angle = 0
                        nose.endFill()

                        let body = new Graphics()
                        body.lineStyle(0)
                        body.beginFill(colorNow, 1.0, true)
                        body.drawCircle(0, 0, 48*3)
                        body.scale.set(0.3333)
                        //body.cacheAsBitmap = true
                        body.endFill()

                    

                        /*
                        avatarImageWrapper.addChild(avatarBackground)
                        avatarImageWrapper.addChild(avatarMiddleground)
                        avatarImageWrapper.addChild(avatarMiddleground2)
                        avatarImageWrapper.addChild(avatarForeground)
                       */
                        
                        avatarBox.contentContainer.addChildAt(body, 0)
                        avatarBox.contentContainer.addChildAt(nose, 0)

                        avatarBox.contentContainer.addChild(avatarImageWrapper)
            
            
                        avatarCounter++
                        if(avatarCounter >= 6) {
                            avatarCounter = 1
                        }
                    }
                }, 2000)
            
        

            this.avatarBox.alpha = 0
            this.avatarWrapper.addChild(this.avatarBox)

        

            
            this.joinModalWidgetGroup.addChild(this.avatarWrapper)




        









            


            //Join Button 
            this.joinButtonWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 280,
                    height: 65,
                    x: 0.5,
                    y: 0.9,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            )

            this.joinButton = new PUXI.Button({
                text: ''
            }).setLayoutOptions(new PUXI.FastLayoutOptions({
                width: 0.9999,
                height: 0.9999
            }))
            .setBackground(white)
            .setBackgroundAlpha(1)

            this.joinButtonWrapper.addChild(this.joinButton)
            this.joinButton.on("hover", function (over) {
                if(over == true) {
                    this.setBackground(white)
                } else {
                    this.setBackground(white)
                }
            });

            



            this.joinText = new PUXI.TextWidget('')
            this.joinText.setLayoutOptions(new PUXI.FastLayoutOptions({
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }))
            this.joinButtonWrapper.addChild(this.joinText)
            this.joinButtonWrapper.contentContainer.interactive = true;
            this.joinButtonWrapper.contentContainer.buttonMode = true;
            this.joinButtonWrapper.contentContainer.cursor = "pointer";

            const joinTextTagged = new TaggedText("CONTINUE", {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fill: black, 
                    fontWeight: 900,
                    fontSize: "36px", 
                    letterSpacing: 1
            }})

            this.joinText.contentContainer.addChild(joinTextTagged)


            const joinButtonClick = new PUXI.ClickManager(this.joinButton, true, false, false)
            
            joinButtonClick.onPress = function(){
                //this.setBackground(yellow)
            }

            const joinTitleWrapper = this.joinTitleWrapper
            const joinModalWidgetGroup = this.joinModalWidgetGroup
            //const naveGiven = this.nameGiven
            const avatarWrapper = this.avatarWrapper

            joinButtonClick.onClick = function(){

                //console.log(nameGiven)
                

                if(userInterface.getText() != "") {

                    joinTitleTagged.text = 'Select your avatar'
                    joinModalWidgetGroup.removeChild(inputBox)
                    avatarBox.alpha = 1

                    
                    const nameStyles = new PIXI.TextStyle({ 
                        fontFamily: 'Trade Gothic Next',
                        fill: white, 
                        fontSize: 25,
                        fontWeight: 900, 
                        letterSpacing: 2
                    })
                    

                        let personName = userInterface.getText()
                        personName = personName.padStart(20, ' ')
                        personName = personName.padEnd(20, ' ')

                        const nameText = new PIXI.Text(""+personName.toUpperCase()+"", nameStyles);
                        nameText.updateText();
                        userInterface.setName()

                        const radius = 68;
                        const maxRopePoints = 100;
                        const step = Math.PI / maxRopePoints;
                        
                        let ropePoints = maxRopePoints - Math.round( (nameText.texture.width / (radius * Math.PI)) * maxRopePoints );
                        ropePoints /= 2;

                        const points = [];
                        for ( let i = maxRopePoints - ropePoints; i > ropePoints; i-- ) {
                            const x = radius * Math.cos( step * i );
                            const y = radius * Math.sin( step * i );
                            points.push( new PIXI.Point( x, -y ) );
                        }

                        const container = new PIXI.Container();
                        container.height = 50
                        container.width = 50
                        const rope = new PIXI.SimpleRope( nameText.texture, points );
                        container.addChild( rope );
                        

                        container.x = 50
                        container.y = 52
                        container.rotation = 0//1.571

                        avatarWrapper.contentContainer.addChild(container)

            
                   

                } else {

                    const inputError = new PIXI.Graphics()
                    inputError.name = "inputError"
                    inputError.lineStyle(5, red)
                    inputError.drawRect(-1, 0, inputBox.contentContainer.children[0].hitArea.width + 2, inputBox.contentContainer.children[0].hitArea.height)
                    inputBox.contentContainer.children[0].addChild(inputError)
                    

                }

                
            }

       

            this.joinModalWidgetGroup.addChild(this.joinTitleWrapper)
            this.joinModalWidgetGroup.addChild(this.inputBox)
            this.joinModalWidgetGroup.addChild(this.joinButtonWrapper)
            
            this.joinModal.addChild(this.joinModalWidgetGroup)
            
            this.addChild(this.joinModal)
        }



        if(this.introScreenOn == true) {

                this.joinModal.visible = false
                this.mainMenuStage.visible = false
                this.statusStage.visible = false

                //Intro Screen
                let joinModal = this.joinModal
                let mainMenu = this.mainMenuStage
                let statusStage = this.statusStage

                this.introScreen = new PUXI.Stage({
                    width:window.innerWidth,
                    height: window.innerHeight,
                    x: 0,
                    y: 0
                })  
                
                this.introScreenWrapper = new PUXI.Widget({
                }).setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: 0.999999, 
                        height: 0.999999,
                        x: 0.5,
                        y: 0.5,
                        anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                    }),
                ).setBackground(darkGreen)
                this.introScreen.addChild(this.introScreenWrapper)
                
                this.introScreenTextWrapper = new PUXI.WidgetGroup({
                }).setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        x: 0.5,
                        y: 0.5,
                        anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                    }),
                )
                this.introScreen.addChild(this.introScreenTextWrapper)

                this.introText = new PUXI.TextWidget('')
                this.introText.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }))

                const introText = this.introText
                const introScreenWrapper = this.introScreenWrapper
                const introScreen = this.introScreen

                const introTextTagged = new TaggedText("", {
                    "default": {
                        fontFamily: 'Trade Gothic Next',
                        fill: green, 
                        fontWeight: 900,
                        fontSize: "64px", 
                        letterSpacing: 2,
                    },
                    "online": {
                        fontFamily: 'Trade Gothic Next',
                        fontWeight: 900,
                        fontSize: "64px", 
                        letterSpacing: 2,
                        lineJoin: "round",
                        stroke: green, 
                        strokeThickness: 2,
                        fill: 'transparent'
                    }, 
                    "disclaimer": {
                        fontFamily: 'Trade Gothic Next',
                        fontWeight: 300,
                        fontSize: "16px", 
                        lineHeight: 24,
                        wordWrap: true,
                        wordWrapWidth: 700,
                        align: "center",
                        fill: white,
                        letterSpacing: 0
                    },
                    "bold": {
                        fontWeight: 700
                    }
                    
                })
                this.introText.contentContainer.addChild(introTextTagged)
                this.introScreenTextWrapper.addChild(this.introText)
            
                
                this.glitchOn = false

                this.introGlitch = new GlitchFilter({
                    slices: 0,
                    offset: 0,
                    direction: 0,
                    seed: 0.5,
                })

                this.introCRTFilter = new CRTFilter({
                    vignetting: 0.5,
                    vignettingAlpha: 0.5,
                    vignettingBlur: 0.5,
                    padding: 0,
                    animating: true,
                    verticalLine: true,
                    lineContrast: 0.05,
                    noise: 0.01,
                    noiseSize: 1.0,
                    padding: 4,
                })

                this.introScreen.resize(window.innerWidth, window.innerHeight)
                this.introScreen.filters = [this.introCRTFilter]
                
                

                const disclaimerText = '<disclaimer><bold>LIVE CHAT DISCLAIMER</bold>\n\nThis Live Chat service is operated between the hours of 9 a.m. and 5 p.m., and is intended for scheduling inquiries only. Psychological assessment, diagnosis, treatment and counselling services are not provided via this Live Chat service; please do not include any personal, sensitive, clinical or confidential information in the Live Chat. You expressly acknowledge that a patient-doctor relationship will not be established by use of this service. With any online service, there is some level of risk when communicating information over the Internet and we cannot assume any responsibility for any information that you may enter during your chat session. If you require emergency medical attention please call 911 or visit the Emergency department at your local hospital. CITC expressly disclaims any liability for any injury, loss or damage incurred by use of or reliance on the information provided via this Live Chat service. By using this Live Chat you accept these terms and conditions.</disclaimer>'

                this.addChild(this.introScreen)

                ease.add(this.introText, {alpha: 1}, { duration: 250, ease: 'easeOutExpo', wait: 1000})

                setTimeout(function(){
                    introTextTagged.text = "B"
                    introScreen.resize(window.innerWidth, window.innerHeight)
                    keys1.play()
                }, 2000)
                setTimeout(function(){
                    introTextTagged.text = "BI"
                    introScreen.resize(window.innerWidth, window.innerHeight)
                    keys2.play()
                }, 2200)
                setTimeout(function(){
                    introTextTagged.text = "BIA"
                    introScreen.resize(window.innerWidth, window.innerHeight)
                    keys1.play()
                }, 2600)
                setTimeout(function(){
                    introTextTagged.text = "BIAS"
                    introScreen.resize(window.innerWidth, window.innerHeight)
                    keys2.play()
                }, 2800)
                setTimeout(function(){
                    userInterface.toggleGlitch(true)
                }, 3500)

                setTimeout(function(){
                    userInterface.toggleGlitch(false)
                    introTextTagged.text = "BIAS <online>ONLINE</online>"
                    introScreen.resize(window.innerWidth, window.innerHeight)
                }, 5000)
                setTimeout(function(){
                    userInterface.toggleGlitch(true)
                }, 7000)
                setTimeout(function(){
                    userInterface.toggleGlitch(false)
                }, 8000)
                setTimeout(function(){
                    ease.add(introText, {alpha: 0 }, { duration: 500, ease: 'easeOutExpo'})
                }, 9000)
                setTimeout(function(){
                    introTextTagged.text = disclaimerText
                    introTextTagged.setStyleForTag("default", {
                        fontFamily: "Trade Gothic Next",
                        fontSize: "16px",
                        wordWrap: true,
                        lineHeight: 24,
                        align: "center",
                        wordWrapWidth: 700,
                    })
                    introTextTagged.update()
                }, 9500)
                setTimeout(function(){
                    introScreen.resize(window.innerWidth, window.innerHeight)
                }, 9750)
                setTimeout(function(){
                    ease.add(introText, {alpha: 1 }, { duration: 500, ease: 'easeOutExpo'})
                }, 10000)
                setTimeout(function(){
                    ease.add(introText, {alpha: 0 }, { duration: 500, ease: 'easeOutExpo'})
                }, 12000)
                setTimeout(function(){
                    ease.add(introScreenWrapper, {alpha: 0 }, { duration: 500, ease: 'easeOutExpo'})
                    introScreen.visible = false
                }, 13000)
                setTimeout(function(){
                    userInterface.removeChild(introScreen)
                }, 13500)
            
        }


        
        if(this.notificationStageOn == true) { 
        
            this.notificationStage = new PUXI.Stage(290, 70);
            this.notificationWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 290,
                    height: 70,
                    x: 0.995,
                    y: 0.99,
                    anchor: new PIXI.Point(1, 1)
                }),
            )
            this.notificationStage.addChild(this.notificationWrapper)
            this.notificationStage.alpha = 0 

            ease.add(this.notificationStage, {alpha: 1}, { duration: 250, ease: 'easeOutExpo', wait: 1000 })
            

            this.notificationWrapperBackground = new Graphics()
            this.notificationWrapperBackground.beginFill(white, 1.0, true)
            this.notificationWrapperBackground.lineStyle(1, black)
            this.notificationWrapperBackground.drawRoundedRect(0, 0, 290, 70, 15)
            this.notificationWrapper.contentContainer.addChild(this.notificationWrapperBackground)

            this.notificationContentWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999,
                    height: 0.999,
                    x: 0.5,
                    y: 0.5,
                    anchor: new PIXI.Point(0.5, 0.5)
                })
            ).setPadding(17, 10)
            
            this.notificationWrapper.addChild(this.notificationContentWrapper);

            //<img imgSrc="notificationIcon" imgDisplay="inline" />
            

            this.notifications = [
                {      
                    text: 'Welcome back to <extrabold>BIAS ONLINE</extrabold> \nNeed a refresher on how to play? Easy, just click here for quick tutorial'
                }
            ]

            const notificationIcon = new PIXI.Sprite.from('images/notification-icon.svg');
            
            this.notificationTextWidget = new PUXI.TextWidget("")

            this.notificationTaggedText = new TaggedText(this.notifications[0].text, {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: 16,
                    wordWrap: true,
                    wordWrapWidth: 240,
                    padding: 10,
                    leading: 1
                },
                "img": {},
                "bold": {
                    fontWeight: 700
                },
                "extrabold": {
                    fontWeight: 900
                }
                
            }, { imgMap: { notificationIcon },});

            this.notificationTaggedText.y = 1
            this.notificationTaggedText.visible = false

            this.notificationTextWidget.contentContainer.addChild(this.notificationTaggedText)

            this.notificationContentWrapper.addChild(this.notificationTextWidget)


            this.closeNotificationWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.99999,
                    y: 15,
                    anchor: new PIXI.Point(0.5,0)
                }),
            )
            this.closeNotificationWrapper.contentContainer.interactive = true
            this.closeNotificationWrapper.contentContainer.buttonMode = true


            this.closeNotificationButton = new PUXI.Button({
                text: '',
            }).setLayoutOptions(new PUXI.FastLayoutOptions({
                width: 16,
                height: 16,
                anchor: new PIXI.Point(0.5,0.5)
            }))

            this.closeNotificationButtonText = new TaggedText('×', {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "18px",
                    fontWeight: 300,
                    fill: black,
                    padding: 10,
                }
            });
            


            this.closeNotificationButtonText.visible = false

            this.closeNotificationButton.contentContainer.addChild(this.closeNotificationButtonText)

            this.closeNotificationWrapper.addChild(this.closeNotificationButton)

            const closeNotificationButtonClick = new PUXI.ClickManager(this.closeNotificationButton, true, false, false)
            const theNotification = this.notificationStage

            closeNotificationButtonClick.onClick = function(){
                ease.add(theNotification, {alpha: 0}, { duration: 250, ease: 'easeOutExpo'})
                setTimeout(function(){
                    theNotification.visible = false
                }, 250)
            }

            this.notificationWrapper.addChild(this.closeNotificationWrapper)

        
            const notificationText =  this.notificationTaggedText
            const notificationClose =  this.closeNotificationButtonText

            setTimeout(function(){
                notificationText.visible = true
                notificationClose.visible = true
            }, 500)
            this.addChild(this.notificationStage)

            this.notificationStage.resize(window.innerWidth, window.innerHeight)
            const notificationBounds = this.notificationWrapperBackground.getBounds()
            this.notificationStage.stage.hitArea = new PIXI.Rectangle(
                notificationBounds.x,
                notificationBounds.y,
                notificationBounds.width,
                notificationBounds.height
            )
        }

        //let artNumber = this.artNumber  

        //if(this.viewArtButtonOn == true) {
            this.viewArtButton = new PUXI.Stage(0, 0, 80, 30)
            this.viewArtButton.visible = false
            this.viewArtButtonWrapper = new PUXI.WidgetGroup().setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 80,
                    height: 30,
                    x: 0.99,
                    y: 0.99,
                    anchor: new PIXI.Point(1, 1)
                })
            )

            this.viewArtButtonWrapper.contentContainer.interactive = true
            this.viewArtButtonWrapper.contentContainer.buttonMode = true

            this.viewArtButtonWrapper.contentContainer.on('pointerdown', function(){
                let artnumber = userInterface.getArtnumber()
                userInterface.showArt(artnumber)
                //console.log(artnumber)
            })

            this.viewArtButtonWrapper.on('pointerdown', function(){
                this.setBackground(0xFFFFFF)
            })

            this.buttonOutline = new Graphics()
            this.buttonOutline.lineStyle(0)
            this.buttonOutline.beginFill(black, 1.0, true)
            this.buttonOutline.drawRoundedRect(0, 0, 160, 60, 0)
            this.buttonOutline.cacheAsBitmap = true
            this.buttonOutline.scale.set(0.5)

            const buttonText = new TaggedText("   VIEW ", {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "15px",
                    fill: white,
                    letterSpacing: 2
                }
            })
            buttonText.x = 8
            buttonText.y = 5
            
            this.viewArtButtonWrapper.contentContainer.addChild(this.buttonOutline)
            this.viewArtButtonWrapper.contentContainer.addChild(buttonText)
            this.viewArtButtonWrapper.contentContainer.interactive = true
            this.viewArtButtonWrapper.contentContainer.buttonMode = true



            this.viewArtButton.addChild(this.viewArtButtonWrapper)
            this.addChild(this.viewArtButton)



            this.viewArtButton.resize(window.innerWidth, window.innerHeight)
            const viewArtBounds = this.buttonOutline.getBounds()
            this.viewArtButton.stage.hitArea = new PIXI.Rectangle(
                viewArtBounds.x,
                viewArtBounds.y, 
                viewArtBounds.width,
                viewArtBounds.height
            )
        //}


        if(this.transitionScreenOn == true) {
            //transition Screen
            this.transitionScreen = new PUXI.Stage({
                width:window.innerWidth,
                height: window.innerHeight
            })  
            this.transitionScreen.visible = false
            
            this.transitionScreenWrapper = new PUXI.Widget({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999999, 
                    height: 0.999999,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            ).setBackground(0x000000)
            this.transitionScreen.addChild(this.transitionScreenWrapper)

            this.transitionScreenTextWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 500,
                    x: 0.5,
                    y: 0.45,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            )
            this.transitionScreen.addChild(this.transitionScreenTextWrapper)
            
            this.transitionText = new PUXI.TextWidget('').setLayoutOptions(new PUXI.FastLayoutOptions({
                x: 0.5,
                y: 0.5,
                width: 500, 
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }))

        
            this.transitionTextTagged = new TaggedText("", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: white, 
                    fontWeight: 300,
                    fontSize: "32px", 
                    align: "center",
                    lineHeight: 40,
                    wordWrap: true, 
                    wordWrapWidth: 500
                },
                "bold": {
                    fontWeight: 700,
                    letterSpacing: 2
                }
                
            })
            this.transitionText.contentContainer.addChild(this.transitionTextTagged)
            this.transitionScreenTextWrapper.addChild(this.transitionText)
            
            this.transitionScreen.resize(window.innerWidth, window.innerHeight)
            
            
            this.addChild(this.transitionScreen)
           
            this.transitionTextTagged.x = this.transitionTextTagged.width
        
        
        }


        let ageConfirmed = window.localStorage.getItem('over18')
        

        if(ageConfirmed) {
            this.confirmAge()
            this.ageGate = new PUXI.Stage({
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }).visible = 0
        } else {
        
            this.ageGate = new PUXI.Stage({
                width: window.innerWidth,
                height: window.innerHeight,
                x: 0,
                y: 0
            })  
            
            this.ageGateWrapper = new PUXI.Widget({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.999999, 
                    height: 0.999999,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            ).setBackground(0x000000)
            
            this.ageGate.addChild(this.ageGateWrapper)
            
            this.ageGateTextWrapper = new PUXI.WidgetGroup({
            }).setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }),
            )
            this.ageGate.addChild(this.ageGateTextWrapper)
            
            this.ageText = new PUXI.TextWidget('')
            this.ageText.setLayoutOptions(new PUXI.FastLayoutOptions({
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }))//.setBackground(0x1e1d1e).setPadding(25, 25, 25, 15)

            this.ageTextTaggedTitle = new TaggedText("<bold>WELCOME  TO  BIAS  ONLINE</bold>", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: white, 
                    fontWeight: 300,
                    fontSize: "26px",
                    lineHeight: 24,
                    leading: 1,
                    wordWrap: true,
                    letterSpacing: 1,
                    wordWrapWidth: 480,
                    align: "left",
                    textDecoration:"underline",
                    underlineThickness: 2
                },"bold": {
                    fontWeight: 700
                }
            }, {drawWhitespace: true})
            this.ageText.contentContainer.addChild(this.ageTextTaggedTitle)
            
            
            
            this.ageTextTagged = new TaggedText("<bold>BIAS ONLINE</bold> is a real-time online exhibition from <bold>Science Gallery Dublin</bold>. You must be 18 years or older to enter, please confirm your date of birth below", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: white, 
                    fontWeight: 300,
                    fontSize: "18px",
                    lineHeight: 24,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: 480,
                },"bold": {
                    fontWeight: 700
                },"heavy": {
                    fontWeight: 900
                },"link": {
                    textDecoration: "underline"
                },"small": {
                    fontSize: "14px"
                }
            })
            this.ageText.contentContainer.addChild(this.ageTextTagged)
            this.ageTextTagged.y = 50

            this.ageTextTaggedTerms = new TaggedText("By entering this site you are agreeing to the <link>Terms of Use</link> and <link>Privacy Policy</link>.", {
                "default": {
                    fontFamily: 'Trade Gothic Next',
                    fill: '#afafaf', 
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: 24,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: 500,
                },"link": {
                    fill: white,
                    textDecoration: "underline"
                }
            }, {drawWhitespace: true})
            this.ageText.contentContainer.addChild(this.ageTextTaggedTerms)
            this.ageTextTaggedTerms.y = 220

            this.ageGateTextWrapper.addChild(this.ageText)

            





            const confirmAgeButtonStyles = new PIXI.TextStyle({
                fontFamily: 'Trade Gothic Next',
                fill: 0xFFFFFF, 
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: 24,
            });
            this.denyAgeButton = new PUXI.Button({
                text: 'I am under 18', textStyle: confirmAgeButtonStyles
            }).setLayoutOptions(new PUXI.FastLayoutOptions({
                x: 220,
                y: 0.7,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            })).setBackground(new PIXI.Graphics().lineStyle(2, 0xFFFFFF).beginFill(0xFFFFFF, 0).drawRect(0,0,225,55)).setPadding(60,15,60,15)
            this.denyAgeButton.textWidget.tint = 0xFFFFFF

            this.ageGateTextWrapper.addChild(this.denyAgeButton)

            const denyAgeButton = this.denyAgeButton
            const denyAgeButtonClick = new PUXI.ClickManager(denyAgeButton, true, false, false)

            denyAgeButton.insetContainer.interactive = true
            denyAgeButton.insetContainer.buttonMode = true

            denyAgeButtonClick.onHover = function(hover){
                if(hover.target == null) {
                    denyAgeButton.setBackground(new PIXI.Graphics().lineStyle(2, 0xFFFFFF).beginFill(0xFFFFFF, 0).drawRect(0,0,225,55))
                    denyAgeButton.textWidget.tint = 0xFFFFFF
                } else {
                    denyAgeButton.setBackground(new PIXI.Graphics().lineStyle(2, 0xFFFFFF).beginFill(0xFFFFFF, 1).drawRect(0,0,225,55)).setPadding(60,15,60,15)
                    denyAgeButton.textWidget.tint = 0x000000
                }
                
            }
            denyAgeButtonClick.onPress = function(){
            //confirmAgeButton.setBackground(0x00FF00)
            }
            denyAgeButtonClick.onClick = function(){
                window.location.href = "https://dublin.sciencegallery.com"
            }

    

            this.confirmAgeButton = new PUXI.Button({
                text: '   I am 18+   ', textStyle: confirmAgeButtonStyles
            }).setLayoutOptions(new PUXI.FastLayoutOptions({
                x: 470,
                y: 0.7,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            })).setBackground(new PIXI.Graphics().lineStyle(2, 0xFFFFFF).beginFill(0xFFFFFF, 0).drawRect(0,0,225,55)).setPadding(60,15,60,15)
            this.confirmAgeButton.textWidget.tint = 0xFFFFFF

            this.ageGateTextWrapper.addChild(this.confirmAgeButton)

            const confirmAgeButton = this.confirmAgeButton
            const confirmAgeButtonClick = new PUXI.ClickManager(confirmAgeButton, true, false, false)

            this.confirmAgeButton.insetContainer.interactive = true
            this.confirmAgeButton.insetContainer.buttonMode = true

            confirmAgeButtonClick.onHover = function(hover){
                if(hover.target == null) {
                    confirmAgeButton.setBackground(new PIXI.Graphics().lineStyle(2, 0xFFFFFF).beginFill(0xFFFFFF, 0).drawRect(0,0,225,55))
                    confirmAgeButton.textWidget.tint = 0xFFFFFF
                } else {
                    confirmAgeButton.setBackground(new PIXI.Graphics().lineStyle(2, green).beginFill(green, 1).drawRect(0,0,225,55)).setPadding(60,15,60,15)
                    confirmAgeButton.textWidget.tint = 0x000000
                }
                
            }
            confirmAgeButtonClick.onPress = function(){
                userInterface.confirmAge()
            }

            this.loadingIcon = PIXI.Sprite.from(resources['loadingIcon'].texture);
            this.loadingIcon.x = 20 
            this.loadingIcon.y = 20
            this.loadingIcon.anchor.set(0.5,0.5)
            this.loadingIcon.scale.set(0.13)
            this.loadingIcon.alpha = 0

            const loadingIcon = this.loadingIcon
        
            this.ageTextTaggedTerms.textContainer.children.forEach(element => {
                if(element._text == "Terms" || element._text == "of" || element._text == "Use") {
                    element.interactive = true
                    element.buttonMode = true
                    element.on('pointerdown', function(){
                        loadingIcon.alpha = 1
                        userInterface.showQuote('quote1')
                    })
                }
                if(element._text == "Privacy" || element._text == "Policy") {
                    element.interactive = true
                    element.buttonMode = true
                    element.on('pointerdown', function(){
                        loadingIcon.alpha = 1
                        userInterface.showQuote('quote0')
                    })
                }
            })


            
            
            this.ageGate.resize(window.innerWidth, window.innerHeight)
            this.addChild(this.ageGate)
            this.addChild(this.loadingIcon)

        }
        

        
        
        
       

        window.addEventListener('pointermove', (event) => {

            
            const dx = event.clientX - window.innerWidth/2
            const dy = event.clientY - window.innerHeight/2
            const rotation = Math.atan2(dy, dx)

            if(this.joinModal.visible == true) {

                this.avatarBox.contentContainer.rotation = rotation + 0.18
                if(this.avatarWrapper.contentContainer.children > 1) {
                    this.avatarWrapper.contentContainer.children[1].rotation = rotation - 1.57 
                }

            }
                

        })
        
        this.resize()
        


    }

    resize(){
        //if(this.quoteStage.visible == true) {
            this.resizeText()
        //}
        

        if(this.ageGate.visible == true) {
            this.ageGate.resize(window.innerWidth, window.innerHeight)
        }

         if(this.introScreenOn) {
            this.introScreen.resize(window.innerWidth, window.innerHeight)
        }
        if(this.transitionScreenOn) {
            this.transitionScreen.resize(window.innerWidth, window.innerHeight)
        }
        

        //Non-Interactive Stages
        if(this.introScreenOn == true) {
            this.statusStage.resize(window.innerWidth, window.innerHeight)
            this.statusStage.stage.hitArea = new PIXI.Rectangle(0,0,0,0);
        }
        if(this.scoreStageOn == true) {
            this.scoreStage.resize(window.innerWidth, window.innerHeight)
            this.scoreStage.stage.hitArea = new PIXI.Rectangle(0,0,0,0);
        }
        if(this.miniMapOn == true) {
            this.miniMapStage.resize(window.innerWidth, window.innerHeight)
            const miniMapBounds = this.miniMapBackground.getBounds()
            this.miniMapStage.stage.hitArea = new PIXI.Rectangle(
                miniMapBounds.x,
                miniMapBounds.y,
                miniMapBounds.width,
                miniMapBounds.height
            )
        }

        if(this.statusStageOn == true) {
            this.statusStage.resize(window.innerWidth, window.innerHeight)
            this.statusStage.stage.hitArea = new PIXI.Rectangle(0, 0, 0, 0)
        }

       


       
        //Interactive Stages
        if(this.quoteStageOn == true) {
            this.quoteStage.resize(window.innerWidth, window.innerHeight)
            const quoteBounds = this.quoteWrapperBackground.getBounds()
            this.quoteStage.stage.hitArea = new PIXI.Rectangle(
                quoteBounds.x,
                quoteBounds.y,
                quoteBounds.width,
                quoteBounds.height
            )
        }

        if(this.notificationStageOn == true) {
            this.notificationStage.resize(window.innerWidth, window.innerHeight)
            const notificationBounds = this.notificationWrapperBackground.getBounds()
            this.notificationStage.stage.hitArea = new PIXI.Rectangle(
                notificationBounds.x,
                notificationBounds.y,
                notificationBounds.width,
                notificationBounds.height
            )
        }

        if(this.chatStageOn == true) {
            this.textBox.resize(window.innerWidth, window.innerHeight)
            const textBoxbounds = this.textBoxWrapperBackground.getBounds()
            this.textBox.stage.hitArea = new PIXI.Rectangle(
                textBoxbounds.x,
                textBoxbounds.y,
                textBoxbounds.width,
                textBoxbounds.height
            )
        }

        if(this.emojiStageOn == true) {
            this.emojiStage.resize(window.innerWidth, window.innerHeight)
            const emojiBounds = this.emojiWrapperBackground.getBounds()
            this.emojiStage.stage.hitArea = new PIXI.Rectangle(
                emojiBounds.x,
                emojiBounds.y,
                emojiBounds.width,
                emojiBounds.height
            )
        }
        


    }

    confirmAge(){
         window.localStorage.setItem('over18', true);
         this.removeChild(this.ageGate)
         this.joinModal.visible = true
         //window.localStorage.set("over18", true)
     }


    //MiniMap Functions
    setPlayerPositionMiniMap(id, x, y) {
        if(this.miniMapOn == true) {
            if(this.miniMap.getChildByName(""+id+"")) {
                const thePlayer = this.miniMap.getChildByName(""+id+"")
                //if(x > -400 && x < 5000 && y > -250 && y < 3500) {
                    thePlayer.x = (x / 25) + 10
                    thePlayer.y = (y / 25) + 10
                //}
            } else {
                const newPerson = new Graphics()
                newPerson.name = ""+id+""
                newPerson.lineStyle(0)
                newPerson.beginFill(0x00FFFF, 1, true)
                newPerson.drawCircle(0, 0, 1)
                newPerson.endFill()
                this.miniMap.addChild(newPerson)
            }
        }
    }

    setOwnPlayerPositionMiniMap(x, y) {
        if(this.miniMapOn == true) {
            this.miniMapPlayerPosition.alpha = 1
            if(x > 0 && x < 5000 && y > 0 && y < 3500) {
                this.miniMapPlayerPosition.x = (x / 25) + 10
                this.miniMapPlayerPosition.y = (y / 25) + 10
            }
            
        }
    }

    buildMiniMap(design){
        
        if(this.miniMapOn == true) {
       
            let worldDesign = JSON.parse(design)
            
            worldDesign.art.forEach(artwork => {
                let artShape = new Graphics()


                let artWidth = artwork.width / 25
                let artHeight = artwork.height / 25
                artShape.x = (artwork.x / 50) + 5
                artShape.y = (artwork.y / 50) + 5

                let color = PIXI.utils.string2hex("#FFFFFF")
                artShape.lineStyle(0)
                artShape.beginFill(color, 1.0, true)
                

                if(artwork.type == "circle") {
                    artShape.drawCircle(artShape.x + artWidth/2, artShape.y +artHeight/2, artWidth/2)
                } else if (artwork.type == "triangle") {

                    artShape.moveTo((400/50) -(artWidth/25) + 57.5, -(artHeight/25) + 30);
                    artShape.lineTo((200/50) -(artWidth/50) + 57.5, (400/50) - (artHeight/50) + 30); 
                    artShape.lineTo(0 -(artWidth/50) + 57.5, - (artHeight/50) + 30);
                    artShape.lineTo((200/50) -(artWidth/50) + 57.5,  - (artHeight/50) + 30);
                    
                } else {
                    artShape.drawRect(artShape.x, artShape.y, artWidth, artHeight)
                }
                
               
                
                artShape.endFill()
                this.miniMap.addChild(artShape)

            });

        }

    }


    getAvatar() {
        console.log(this.avatarImageWrapper.children[0])
        let avatar = [
            this.avatarImageWrapper.children[0]._texture.textureCacheIds[0],
            this.avatarImageWrapper.children[0]._texture.textureCacheIds[1],
            this.avatarImageWrapper.children[0].rotation,
            this.avatarImageWrapper.children[1]._texture.textureCacheIds[0],
            this.avatarImageWrapper.children[1]._texture.textureCacheIds[1],
            this.avatarImageWrapper.children[1].rotation,
            this.avatarImageWrapper.children[2]._texture.textureCacheIds[0],
            this.avatarImageWrapper.children[2]._texture.textureCacheIds[1],
            this.avatarImageWrapper.children[2].rotation,
            this.avatarImageWrapper.children[3]._texture.textureCacheIds[0],
            this.avatarImageWrapper.children[3]._texture.textureCacheIds[1],
            this.avatarImageWrapper.children[3].rotation,
        ]
        //console.log(avatar)
        return avatar
    }

    updateColor(color) {
        this.color = color
    }

    getArtnumber(){
        return this.artNumber
    }


    showStartArtButton(art, direction, directionHorizontal, directionVertical){
    
        var artNumber = 0
        if(art == "CLASSES\nLibby Heaney") {
            artNumber = 1
        } else if (art == "STEAL UR\nFEELINGS\nNoah Levenson"){
            artNumber = 2
        } else if (art == "Dark Matters\nJohann Diedrick") {
            artNumber = 3
        } else {
            artNumber = 4
        }

        this.artNumber = artNumber
        
        

        if(directionHorizontal == 1)  {
            this.viewArtButton.visible = true
            this.viewArtButtonWrapper.setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 80,
                height: 30,
                x: window.innerWidth/2 + 100,
                y: 0.5,
                anchor: new PIXI.Point(0.5, 0.5)
            }))
        }

        if(directionHorizontal == 2)  {
            this.viewArtButton.visible = true
            this.viewArtButtonWrapper.setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 80,
                height: 30,
                x: window.innerWidth/2 - 100,
                y: 0.5,
                anchor: new PIXI.Point(0.5, 0.5)
            }))
        }

        if(directionVertical == 2)  {
            this.viewArtButton.visible = true
            this.viewArtButtonWrapper.setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 80,
                height: 30,
                x: 0.5,
                y: window.innerHeight/2 - 70,
                anchor: new PIXI.Point(0.5, 0.5)
            }))
        }

        

        if(directionVertical == 1)  {
            this.viewArtButton.visible = true
            this.viewArtButtonWrapper.setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 80,
                height: 30,
                x: 0.5,
                y: window.innerHeight/2 + 70,
                anchor: new PIXI.Point(0.5, 0.5)
            }))
        }


        
       

       

    

        


        this.viewArtButton.resize(window.innerWidth, window.innerHeight)
        const viewArtBounds = this.buttonOutline.getBounds()
        this.viewArtButton.stage.hitArea = new PIXI.Rectangle(
            viewArtBounds.x,
            viewArtBounds.y, 
            viewArtBounds.width,
            viewArtBounds.height
        )
        
    }

    hideStartArtButton(){
        //console.log(this.artNumber)
        this.viewArtButton.visible = false
        //this.artNumber == null
    }

    getColor(){
        return this.color
    }

    toggleGlitch(boolean){
        this.glitchOn = boolean
    }


    drawGridBackground(width, height) {

        if(width <= 500) {
            this.gridGap = 25
            this.gridLine = 0.2
        } else if (width <= 960) {
            this.gridGap = 50
            this.gridLine = 0.5
        } else if (width <= 1240) {
            this.gridGap = 75
            this.gridLine = 1
        } else {
            this.gridGap = 100
            this.gridLine = 1
        }

        this.gridOffset = this.gridGap/2
        width = width + this.gridGap*2
        height = height + this.gridGap*2
        
        
        this.gridBackground = new PIXI.Container();
        this.gridNumberOfLinesHorizontal = width / this.gridGap
        this.gridBackground.x = -this.gridOffset
        this.gridBackground.y = -this.gridOffset

        for (var i = 0; i < this.gridNumberOfLinesHorizontal; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(this.gridLine, this.black, 0.5)
            line.moveTo(i * this.gridGap, 0)
            line.lineTo(i * this.gridGap, height)
            this.gridBackground.addChild(line)
        }

        this.numberOfLinesVertical = height / this.gridGap
            
        for (var i = 0; i < this.numberOfLinesVertical; i++) { 
            let line = new PIXI.Graphics()
            line.lineStyle(this.gridLine, this.black, 0.5)
            line.moveTo(0, i * this.gridGap)
            line.lineTo(width, i * this.gridGap)
            this.gridBackground.addChild(line)
        }
        if(this.joinModalWrapper.contentContainer.children == 0) {
            this.joinModalWrapper.contentContainer.addChildAt(this.gridBackground, 0)
            this.joinModal.addChild(this.joinModalWrapper)
        } else {
            this.joinModalWrapper.contentContainer.removeChildAt(0)
            this.joinModalWrapper.contentContainer.addChildAt(this.gridBackground, 0)
        }


        
    }

    /*teleporting(area) {
       
        if(this.transitionScreenOn == true) {

            this.transitionTextTagged.text = area
            this.transitionScreen.visible = true
            

            ease.add(this.transitionScreenTextWrapper, {alpha: 1}, { duration: 250, ease: 'easeOutExpo'})
            this.transitionScreen.resize(window.innerWidth, window.innerHeight)

            const transitionScreen = this.transitionScreen
            const transitionScreenTextWrapper = this.transitionScreenTextWrapper
            setTimeout(function(){
                ease.add(transitionScreenTextWrapper, {alpha: 0}, { duration: 650, ease: 'easeOutExpo'})
            }, 1700)
            setTimeout(function(){
                transitionScreen.visible = false
            }, 2200)
            
        }
       
    }*/

    joinSession(){
        //console.log('tester')
        this.removeChild(this.joinModal)
        //this.joinModal.visible = true
        //this.mainMenuStage.visible = true
        //this.statusStage.visible = true 
    }


    leaveSession(){
        this.addChild(this.joinModal)
    }

    getText() {
        return this.nameFieldInput.value;
    }

    clearText() {
        this.nameFieldInput.value = ""
        this.nameFieldInput.blur()
    }

    joinPeer() {
        /*const text = new MultiStyleText("<dot>●</dot> Device ID: "+peerID+"", {
            "default": {
                fontFamily: "Monaco",
                fontSize: "10px",
                fill: "#ececec",
                align: "left"
            },
            "dot": {
                fontSize: "15px",
                fill: "#0000ff"
            }
        });
        renderer.stage.addChild(text);
        text.x = 10;
        text.y = 10;*/

    }

    joinCall(){
        /*const text = new MultiStyleText("<dot>●</dot> Connected With: "+call.peer +" (ID:"+connectionId+")", {
            "default": {
                fontFamily: "Monaco",
                fontSize: "10px",
                fill: "#ececec",
                align: "left"
            },
            "dot": {
                fontSize: "15px",
                fill: "#00ff00"
            }
        });
        renderer.stage.addChild(text);
        text.x = 10;
        text.y = 30;*/
    }

    setName() {
        this.nameGiven = true
    }

    getMessageText() {
        return this.mockInput.value;
    }

    clearMessageText() {
        this.mockInput.value = ""
        this.mockInput.blur()
        this.mockInput.focus()
    }

    updateWorldTime(time) {
       var currentWorldTime = new Date(time * 1000).toISOString().substr(11, 8)
       this.currentTime.text = currentWorldTime
    }

    updateTotalUsers(number) {
       this.totalNumberOfPeopleCounter.text = number
    }


    updateActiveUsers(number) {
        this.numberOfPeopleCounter.text = number
    }

    hideArt(){

        //this.textBox.visible = true
       // this.statusStage.visible = true
        
       // this.emojiStage.visible = true
       this.transitionTextTagged.text = ""
        
        this.viewArtButton.visible = false

        if(this.scoreStageOn) {
            this.scoreStage.visible = true
        }
        if(this.miniMapOn) {
            this.miniMapStage.visible = true
        }
        if(this.mainMenuOn) {
            this.mainMenuStage.visible = true
        }

        let allKids = this.children.length - 1
       

        const transitionScreen = this.transitionScreen
        const overlay = document.getElementById('overlay');
        const transitionScreenWrapper = this.transitionScreenWrapper
        ease.add(transitionScreenWrapper, {alpha: 1}, { duration: 300, ease: 'easeOutExpo'})
        
        overlay.classList.remove('show')

        setTimeout(()=> {
            ease.add(transitionScreenWrapper, {alpha: 0}, { duration: 2000, ease: 'easeOutExpo'})
            document.body.removeChild(overlay)
        }, 700) 
        setTimeout(()=> {
            this.children[allKids].visible = true
            transitionScreen.visible = false
            this.viewArtButton.alpha = 1
            sound.toggleMuteAll()
        }, 1300)
    }
    

    showArt(art) {

        if(this.chatStageOn) {
            this.textBox.visible = false
        }
        if(this.statusStageOn) {
            this.statusStage.visible = false
        }
        if(this.emojiStageOn) {
            this.emojiStage.visible = false
        }

        if(this.scoreStageOn) {
            this.scoreStage.visible = false
        }

        this.viewArtButton.visible = false

        
        let allKids = this.children.length - 1
        this.children[allKids].visible = false
       

        if(this.miniMapOn) {
            this.miniMapStage.visible = false
        }
        if(this.mainMenuOn) {
            this.mainMenuStage.visible = false
        }
       
        

        sound.toggleMuteAll()
        if(art == 1) {
            this.transitionTextTagged.text = "<bold>CLASSES</bold>\nLibby Heaney"
        } else if (art == 2) {
            this.transitionTextTagged.text = "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson"
        } else if (art == 3) {
            this.transitionTextTagged.text = "<bold>DARK MATTERS</bold>\nJohann Diedrick"
        } else {
            this.transitionTextTagged.text = "<bold>NORMALIZI.NG</bold>\nMushon Zer-Aviv"
        }

        //this.transitionTextTagged.text = 

        this.transitionScreen.visible = true
        ease.add(this.transitionScreenWrapper, {alpha: 1}, { duration: 1000, ease: 'easeOutExpo'})
        this.transitionScreen.resize(window.innerWidth, window.innerHeight)

        let video
        const userInterface = this

        console.log(art)

        setTimeout(function(){

            if(art == 1) {
                var overlay = document.createElement('div');
                overlay.style = "position:fixed;height:100vh;width:100%;background-color:rgba(0,0,0,0.6);top:0;left:0;"
                overlay.id = "overlay"
                var close = document.createElement('div');
                close.id = "back-to-bias"
                var backTo = document.createTextNode('← return')
                close.style = "cursor:pointer;position:absolute;top:0;width:100%;letter-spacing:2px;left:1.5%;top:1.5%;font-size:14px;text-transform:uppercase;color:#4DFA66;width:100%;z-index:4"
                close.appendChild(backTo)
                document.body.appendChild(close);
                video = document.createElement('video');
                
                const videoWrapper = document.createElement('div')
                const videoWrapperWrapper = document.createElement('div')
                videoWrapperWrapper.style = "position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:100%;"
                videoWrapper.style = "position:relative;padding-bottom:56.25%;height:0;z-index:5;max-width:95%;margin:0 auto"
        
                video.src = "/video/CLASSES.mp4"
                video.width = window.innerWidth
                video.height = window.innerHeight
                video.controls = true
                video.style = "position:absolute;top:0%;left:0%;width:100%;height:100%;"
                videoWrapper.appendChild(video)
                videoWrapperWrapper.appendChild(videoWrapper)
        
                overlay.appendChild(close)
                overlay.appendChild(videoWrapperWrapper)

                close.addEventListener('pointerdown', (event) => {
                
                    overlay.classList.remove("show") 
                    userInterface.hideArt()
        
                })
        
                document.body.appendChild(overlay);

            } else {

                var overlay = document.createElement('div');
                overlay.style = "position:fixed;height:100vh;width:100%;background-color:rgba(0,0,0,0.6);top:0;left:0;"
                overlay.id = "overlay"
                var close = document.createElement('div');
                close.id = "back-to-bias"
                var backTo = document.createTextNode('← return')
                close.style = "cursor:pointer;position:absolute;top:0;width:100%;left:2.5%;top:1.5%;font-size:14px;text-transform:uppercase;color:#4DFA66;width:100%;letter-spacing:2px;z-index:4"
                close.appendChild(backTo)
                document.body.appendChild(close);
                var iframe = document.createElement('iframe');
                
                const videoWrapper = document.createElement('div')
                const videoWrapperWrapper = document.createElement('div')
                videoWrapperWrapper.style = "position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:100%;"
                videoWrapper.style = "position:relative;padding-bottom:56.25%;height:0;z-index:5;max-width:95%;margin:0 auto"

                var loading = document.createTextNode("Loading...")
                var loadingDiv = document.createElement('div')
                loadingDiv.style = "position:absolute;top:52.5%;left:50%;transform:translateX(-50%)translateY(-50%);color:white"
                loadingDiv.appendChild(loading)
                videoWrapper.appendChild(loadingDiv)

               


                iframe.width = window.innerWidth
                iframe.height = window.innerHeight
                iframe.allow = "camera"
                if(art == 2) {
                    iframe.src = "https://stealingurfeelin.gs/"
                } else if (art == 3) {
                    iframe.src = "https://darkmatters.ml/"
                } else if (art == 4) {
                    iframe.src = "https://normalizi.ng/"
                }
                
                iframe.style = "position:absolute;top:0%;left:0%;width:100%;height:100%;border:0"
                videoWrapper.appendChild(iframe)
                videoWrapperWrapper.appendChild(videoWrapper)
        
                overlay.appendChild(close)
                overlay.appendChild(videoWrapperWrapper)

                var openNewWindow = document.createTextNode("Open in new tab →")
                var openNewWindowDiv = document.createElement('div')
                openNewWindowDiv.style = "position:relative;width:100%;text-align:right;color:white;right:2.5%;top:10px;opacity:0.5;text-transform:uppercase;letter-spacing:0.05em;font-size:14px;cursor:pointer"
                openNewWindowDiv.appendChild(openNewWindow)
                videoWrapperWrapper.appendChild(openNewWindowDiv)

                openNewWindowDiv.addEventListener('pointerdown', (event) => {
                
                    window.open(iframe.src, '_blank').focus();
        
                })

                close.addEventListener('pointerdown', (event) => {
                
                    overlay.classList.remove("show") 
                    userInterface.hideArt()
        
                })
        
                document.body.appendChild(overlay);

            }
            
        }, 1000)
        setTimeout(function(){
            overlay.classList.add("show") 
        }, 1100)
        
        if(art == 1) {
            setTimeout(function(){
                video.play()
            }, 1500)
        }
       

    }

    showQuote(quote) {

        if(this.quoteStageOn == true) {
           
            
            let quoteNumber = quote.slice(-1)
            let theQuote = this.quotesToShow
            let taggedText = this.connectedText
            let userInterface = this
            let quoteWrapper = this.quoteWrapper
            let scrollContent = this.scrollContent
            let quoteBackground = this.quoteWrapperBackground
            let loadingIcon = this.loadingIcon
            let loadingText = this.loadingText
            let colorBlue = this.blue
            //this.connectedText.text = "Loading..."

            this.addChild(this.quoteStage)
            this.quoteWrapper.contentContainer.alpha = 1
            //ease.add(loadingIcon, { alpha: 1 }, { duration: 250 })

            if(this.showingQuote == false) {

                    setTimeout(function(){

                        let newTaggedText = '<gap>\n\n</gap><boldtitle>' + theQuote[quoteNumber].title +'</boldtitle>\n'
                        if(theQuote[quoteNumber].subtitle.length) {
                            newTaggedText += "<subtitle>" + theQuote[quoteNumber].subtitle + "</subtitle><gap>\n</gap><gap>\n</gap>"
                        }
                        if(theQuote[quoteNumber].paragraph.length) {
                            newTaggedText +=  "" + theQuote[quoteNumber].paragraph + "\n"
                        }
                        if(theQuote[quoteNumber].credit.length) {
                            newTaggedText +=  "<extrasmall>" + theQuote[quoteNumber].credit + "</extrasmall>"
                        }
                        taggedText.text = newTaggedText
                        taggedText.update()
                        taggedText.alpha = 1
                        loadingText.alpha = 0

                        //console.log(newTaggedText)
                        userInterface.resizeText()

                        quoteWrapper.contentContainer.addChildAt(quoteBackground,0)   
                        
                        //taggedText.alpha = 1
                        scrollContent.forcePctPosition('y', 0)
                        scrollContent.scrollBars[0].percentValue = 0

                        userInterface.showingQuote = true

                        taggedText.textContainer.children.forEach(element => {
                            //console.log(element)
                            if(element._style._fill == "#1dcfff") {
                                element.interactive = true
                                element.buttonMode = true
                                let underline = new PIXI.Graphics()
                                underline.beginFill(colorBlue)
                                underline.drawRect(0, element.height - 5, element.width, 1)
                                underline.endFill()
                                element.on('pointerover', function(){                                
                                    element.addChild(underline)
                                })
                                element.on('pointerout', function(){
                                    element.removeChild(underline)
                                })
                            }
                            if(element._text == "mushon.com") {
                            // console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('http://mushon.com', '_blank').focus();
                                })
                            }
                            if(element._text == "@mushon") {
                                //console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('https://instagram.com/mushon', '_blank').focus();
                                })
                            }
                            if(element._text == "darkmatters.ml") {
                            // console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('http://darkmatters.ml', '_blank').focus();
                                })
                            }
                            if(element._text == "@johanndiedrick") {
                                //console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('https://instagram.com/johanndiedrick', '_blank').focus();
                                })
                            }
                            if(element._text == "libbyheaney.co.uk") {
                            // console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('http://libbyheaney.co.uk', '_blank').focus();
                                })
                            }
                            if(element._text == "@libby_heaney_") {
                                //console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('https://instagram.com/libby_heaney_', '_blank').focus();
                                })
                            }
                            if(element._text == "noahlevenson.com") {
                            // console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('http://noahlevenson.com', '_blank').focus();
                                })
                            }
                            if(element._text == "@noahlevenson") {
                                //console.log('link!')
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('https://instagram.com/noahlevenson', '_blank').focus();
                                })
                            }
                            if(element._text == "feedback") {
                                // console.log('link!')
                                    element.interactive = true
                                    element.buttonMode = true
                                    element.on('pointerdown', function(){
                                        window.open('https://docs.google.com/spreadsheets/d/1dL6Ww7MfUqFtbeY8mQCkxf2ZoZ5QOWG6jDVeoiAZGKo/edit#gid=0', '_blank').focus();
                                    })
                                }



                            if(element._text == "info@dublin.sciencegallery.com") {
                                element.interactive = true
                                element.buttonMode = true
                                element.on('pointerdown', function(){
                                    window.open('mailto:info@dublin.sciencegallery.com', '_blank').focus();
                                })
                            }
                        });

                        userInterface.quoteStage.resize(window.innerWidth, window.innerHeight)
                        //ease.add(loadingIcon, { alpha: 0 }, { duration: 250, wait: 250 })
                        //

                    }, 50)
                        
                 
                    
                //}
            }

        }

    }


    closeModal() {

        this.quoteWrapper.contentContainer.alpha = 0
        this.connectedText.alpha = 0

        this.loadingText.alpha = 1

        const quoteStage = this.quoteStage
        const userInterface = this
        
        setTimeout(function(){
            userInterface.removeChild(quoteStage)
            userInterface.setShowingQuote()
        }, 0)

        
    }

    setShowingQuote(){
        this.showingQuote = false
    }


    personLeft(name) {
        /*var joinText = "<reddot>—</reddot> "+ name +" left"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        //console.log(textBox.y)
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }*/
    }

    increaseScore(token) {
        if(token == "quote") {
            const score = this.talkingScoreText
            var currentScore = Number(score.text.slice(0,1))
            var newScore = currentScore + 1     
            var newScoreText = newScore + "/10";
            if(this.talkingScore.isComplete == false) {
                score.text = newScoreText
                if(newScore == 10) {
                    score.x = 16
                    this.talkingScore.isComplete = true
                    this.talkingScoreTextBackground.tint = this.yellow
                }
            }
        }
        if(token == "talking") {
            const score = this.talkingScoreText
            var currentScore = Number(score.text.slice(0,1))
            var newScore = currentScore + 1     
            var newScoreText = newScore + "/10";
            if(this.talkingScore.isComplete == false) {
                score.text = newScoreText
                const background = this.talkingScoreTextBackground
                background.tint = this.yellow
                let white = this.white
                setTimeout(function(){
                    background.tint = white
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.talkingScore.isComplete = true
                    let yellow = this.yellow
                    setTimeout(function(){
                        background.tint = yellow
                    }, 250)
                   
                }
            }
        } else if (token == "robot") {
            const score = this.robotScoreText
            var currentScore = Number(score.text.slice(0,1))
            var newScore = currentScore + 1     
            var newScoreText = newScore + "/10";
            if(this.robotScore.isComplete == false) {
                score.text = newScoreText
                const background = this.robotScoreTextBackground
                background.tint = this.yellow
                let white = this.white
                setTimeout(function(){
                    background.tint = white
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.robotScore.isComplete = true
                    let yellow = this.yellow
                    setTimeout(function(){
                        background.tint = yellow
                    }, 250)
                   
                }
            }
           
        } else if (token == "dial") {
            const score = this.dialScoreText
            var currentScore = Number(score.text.slice(0,1))
            var newScore = currentScore + 1     
            var newScoreText = newScore + "/10";
            if(this.dialScore.isComplete == false) {
                score.text = newScoreText
                const background = this.dialScoreTextBackground
                background.tint = this.yellow
                let white = this.white
                setTimeout(function(){
                    background.tint = white
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.dialScore.isComplete = true
                    let yellow = this.yellow
                    setTimeout(function(){
                        background.tint = yellow
                    }, 250)
                }
            }
           
        } else if (token == "face") {
            const score = this.faceScoreText
            var currentScore = Number(score.text.slice(0,1))
            var newScore = currentScore + 1     
            var newScoreText = newScore + "/10";
            if(this.faceScore.isComplete == false) {
                score.text = newScoreText
                const background = this.faceScoreTextBackground
                background.tint = this.yellow
                let white = this.white
                setTimeout(function(){
                    background.tint = white
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.faceScore.isComplete = true
                    let yellow = this.yellow
                    setTimeout(function(){
                        background.tint = yellow
                    }, 250)
                   
                }
            }
            
        }

       
        
    }

    personJoined(name) {
        /*var joinText = "<greendot>+</greendot> "+ name +" joined"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }*/
    }

    joinInstance(name, id) {
        var joinText = "<greendot>●</greendot> Joined <p>(ID: "+ id +")</p>"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }
    }

    updateConnection(value, boolean){

        if(boolean == true) {
            var updateText = new TaggedText("<bluedot>●</bluedot> Connected <y>["+value.text+"]</y>", {
                "default": {
                    fontFamily: "Trade Gothic Next",
                    fontSize: "11px",
                    fill: this.white,
                    align: "left"
                },
                "bluedot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: this.blue
                },
                "greendot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: this.green
                },
                "whitedot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: this.white
                },
                "reddot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: this.red
                },
                "b": {
                    fontWeight: 700
                },
                "y": {
                    fill: this.yellow
                },
                "p": {
                    fill: this.pink
                },
                "hi": {
                    fill: this.white,
                    fontWeight: 700,
                    textDecoration: "underline"
                }
            });
            this.statusLayout.contentContainer.addChild(updateText);

        } else {

            let disconnectText = 'Unable to connect to bias online. The server may need a restart'
            sound.muteAll()

        
            if(this.statusLayout.contentContainer.children.length > 1) {
                this.statusLayout.contentContainer.removeChildAt(1);
            }
            
            var updateText = new TaggedText("<dot>●</dot> "+disconnectText+"", {
                "default": {
                    fontFamily: "Monaco",
                    fontSize: "10px",
                    fill: this.white,
                    align: "left"
                },
                "dot": {
                    fontSize: "15px",
                    fill: this.red
                }
            });

            if(this.statusStage.visible == true) {
                this.statusLayout.contentContainer.addChild(updateText);
            }

            if(this.chatStageOn) {
                this.textBox.visible = false
            }
            if(this.statusStageOn) {
                this.statusStage.visible = false
            }
            if(this.emojiStageOn) {
                this.emojiStage.visible = false
            }

          
            this.mainMenuStage.visible = false
            this.viewArtButton.visible = false
           

            if(this.scoreStageOn) {
                this.scoreStage.visible = false
            }

            if(this.introScreenOn) {
                this.introScreen.visible = false
            }
            
            if(this.miniMapOn) {
                this.miniMapStage.visible = false
            }
           
            if(this.notificationStageOn) {
                this.notificationStage.visible = false
            }
            
        
        }
        
    }
    

    resizeText() {
        
        const width = window.innerWidth
        let ageGate = this.ageGate
        //let userInterface = userInterface
        //respty

        if(width <= 375) {

            if(ageGate.visible == true) {

                this.denyAgeButton.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 90,
                    y: 0.68,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })).setPadding(18,12,18,12)

                this.confirmAgeButton.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 240,
                    y: 0.68,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })).setPadding(18,12,18,12)


                this.ageTextTaggedTitle.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 300,
                    fontSize: "20px",
                    lineHeight: 24,
                    leading: 1,
                    letterSpacing: 1,
                    align: "left",
                    textDecoration:"underline",
                    underlineThickness: 2,
                    wordWrap: true,
                    wordWrapWidth: window.innerWidth - 30,
                })
                this.ageTextTagged.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: 21,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: window.innerWidth - 30,
                })
                
                this.ageTextTagged.y = 35
                this.ageTextTaggedTerms.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: '#afafaf', 
                    fontWeight: 300,
                    fontSize: "12px",
                    lineHeight: 18,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: window.innerWidth - 30,
                })
                this.ageTextTaggedTerms.y = 195

                let userInterface = this
                this.ageTextTaggedTerms.textContainer.children.forEach(element => {
                    if(element._text == "Terms" || element._text == "of" || element._text == "Use") {
                        element.interactive = true
                        element.buttonMode = true
                        element.on('pointerdown', function(){
                            userInterface.showQuote('quote1')
                        })
                    }
                    if(element._text == "Privacy" || element._text == "Policy") {
                        element.interactive = true
                        element.buttonMode = true
                        element.on('pointerdown', function(){
                            userInterface.showQuote('quote0')
                        })
                    }
                })


                this.ageText.setLayoutOptions(new PUXI.FastLayoutOptions({
                    height: 400,
                    width: window.innerWidth - 20,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }))
            }


            this.statusStage.visible = false

            this.scrollWrapper.setPadding(15, 2, 15, 2)
            this.scrollContent.setPadding(3, 2, 3, 2)

            

            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                lineHeight: 17,
                wordWrap: true,
                padding: 10,
                wordWrapWidth: 240
            })

            this.connectedText.setStyleForTag("img", {
                fontSize: "285px",
            })

            this.connectedText.setStyleForTag("gap", {
                fontSize: "8px",
                lineHeight: 12,
            })

            this.connectedText.setStyleForTag("p", {
                fontSize: "13px",
                lineHeight: 17,
                fontWeight: 300,
                textBaseline: "middle",
            })
            this.connectedText.setStyleForTag("boldtitle", {
                fontWeight: 900,
                fontSize: "24px",
                lineHeight: 24,
            })

            this.connectedText.setStyleForTag("intro", {
                fontSize: "14px",
                lineHeight: 17,
                fontWeight: 300,
                textBaseline: "middle",
            })


            this.connectedText.setStyleForTag("small", {
                fontSize: "13px",
                lineHeight: 16,
            })
            this.connectedText.setStyleForTag("extrasmall", {
                fontSize: "12px",
                fontWeight: 300,
                lineHeight: 18,
            })


            this.connectedText.setStyleForTag("subtitle", {
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 16,
            })

            this.connectedText.setStyleForTag("privacy", {
                fontSize: "13px",
                lineHeight: 16
            })


            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.987,
                    y: 10,
                    anchor: new PIXI.Point(1,0)
                }),
            )

            if(this.connectedText.parent.height < window.innerHeight ) {
                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: window.innerWidth - 40,
                        height: this.connectedText.parent.height,
                        x: 0.5,
                        y: 0.5,
                        anchor: new PIXI.Point(0.5, 0.5)
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
                this.quoteWrapperBackground.lineStyle(1, this.black)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, window.innerWidth - 40, this.connectedText.parent.height, 10)

            } else {

                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: window.innerWidth - 40,
                        height: window.innerHeight - 25,
                        x: 0.5,
                        y: 0.5,
                        anchor: new PIXI.Point(0.5, 0.5)
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
                this.quoteWrapperBackground.lineStyle(1, this.black)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, window.innerWidth - 40, window.innerHeight - 25, 0)

            }
            

            /*this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.990,
                    y: 35,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )*/



        }  else if (width <= 720) {

            if(ageGate.visible == true) {

                this.denyAgeButton.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 115,
                    y: 0.68,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })).setPadding(35,12,35,12)

                this.confirmAgeButton.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 300,
                    y: 0.68,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })).setPadding(35,12,35,12)

            

                this.ageTextTaggedTitle.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 300,
                    fontSize: "26px",
                    lineHeight: 24,
                    leading: 1,
                    letterSpacing: 1,
                    align: "left",
                    textDecoration:"underline",
                    underlineThickness: 2,
                    wordWrap: true,
                    wordWrapWidth: window.innerWidth - 40,
                })
                this.ageTextTagged.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 300,
                    fontSize: "18px",
                    lineHeight: 24,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: window.innerWidth - 40,
                })
                this.ageTextTaggedTerms.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: '#afafaf', 
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: 24,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: window.innerWidth - 40,
                })
                
                
                let userInterface = this
                this.ageTextTaggedTerms.textContainer.children.forEach(element => {
                    if(element._text == "Terms" || element._text == "of" || element._text == "Use") {
                        element.interactive = true
                        element.buttonMode = true
                        element.on('pointerdown', function(){
                            userInterface.showQuote('quote1')
                        })
                    }
                    if(element._text == "Privacy" || element._text == "Policy") {
                        element.interactive = true
                        element.buttonMode = true
                        element.on('pointerdown', function(){
                            userInterface.showQuote('quote0')
                        })
                    }
                })

                this.ageText.setLayoutOptions(new PUXI.FastLayoutOptions({
                    height: 400,
                    width: window.innerWidth - 40,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }))

            }
            

            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                lineHeight: 17,
                wordWrap: true,
                padding: 10,
                wordWrapWidth: window.innerWidth - 140,
            })

            

            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.975,
                    y: 10,
                    anchor: new PIXI.Point(1,0)
                }),
            )


            if(this.connectedText.parent.height < window.innerHeight ) {
                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: window.innerWidth - 40,
                        height: this.connectedText.parent.height,
                        x: 0.5,
                        y: 0.5,
                        anchor: new PIXI.Point(0.5, 0.5)
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
                this.quoteWrapperBackground.lineStyle(1, this.black)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, window.innerWidth - 40, this.connectedText.parent.height, 10)

            } else {

                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: window.innerWidth - 40,
                        height: window.innerHeight - 100,
                        x: 0.5,
                        y: 0.5,
                        anchor: new PIXI.Point(0.5, 0.5)
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
                this.quoteWrapperBackground.lineStyle(1, this.black)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, window.innerWidth - 40, window.innerHeight - 100, 10)

            }

        
        } else {

            if(ageGate.visible == true) {

                this.ageText.setLayoutOptions(new PUXI.FastLayoutOptions({
                    height: 400,
                    width: 480,
                    x: 0.5,
                    y: 0.5,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                }))
                this.ageTextTagged.y = 50

                
                this.ageTextTaggedTitle.setStyleForTag("default", { 
                        fontFamily: 'Trade Gothic Next',
                        fill: 0xFFFFFF,
                        fontWeight: 300,
                        fontSize: "26px",
                        lineHeight: 24,
                        leading: 1,
                        wordWrap: true,
                        letterSpacing: 1,
                        wordWrapWidth: 480,
                        align: "left",
                        textDecoration:"underline",
                        underlineThickness: 2
                    }
                )

                this.ageTextTagged.setStyleForTag("default", {
                    fontFamily: 'Trade Gothic Next',
                    fill: 0xFFFFFF, 
                    fontWeight: 300,
                    fontSize: "18px",
                    lineHeight: 24,
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: 500,
                })

                this.denyAgeButton.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 220,
                    y: 0.7,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })).setPadding(60,15,60,15)

            
                this.confirmAgeButton.setLayoutOptions(new PUXI.FastLayoutOptions({
                    x: 470,
                    y: 0.7,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })).setPadding(60,15,60,15)


                let userInterface = this
                this.ageTextTaggedTerms.setStyleForTag("default", {
                        fontFamily: 'Trade Gothic Next',
                        fill: '#afafaf', 
                        fontWeight: 300,
                        fontSize: "14px",
                        lineHeight: 24,
                        leading: 1,
                        wordWrap: true,
                        wordWrapWidth: 500,
                    }
                )
                this.ageTextTaggedTerms.y = 220
                this.ageTextTaggedTerms.textContainer.children.forEach(element => {
                    if(element._text == "Terms" || element._text == "of" || element._text == "Use") {
                        element.interactive = true
                        element.buttonMode = true
                        element.on('pointerdown', function(){
                            userInterface.showQuote('quote1')
                        })
                    }
                    if(element._text == "Privacy" || element._text == "Policy") {
                        element.interactive = true
                        element.buttonMode = true
                        element.on('pointerdown', function(){
                            userInterface.showQuote('quote0')
                        })
                    }
                })
            }






            
            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "28px",
                wordWrap: true,
                lineHeight: 35,
                padding: 10,
                fontWeight: 300,
                wordWrapWidth: 540,
                leading: 1,
                fill: this.black,
                textBaseline: "alphabetical"
            })

            let connectedText = this.connectedText
            
            if(this.connectedText.parent.height < window.innerHeight ) {
                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: 650,
                        height: connectedText.parent.height,
                        x: 0.5,
                        y: 0.5,
                        anchor: new PIXI.Point(0.5, 0.5)
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
                this.quoteWrapperBackground.lineStyle(1, this.black)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, 650, connectedText.parent.height, 10)

            } else {

                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: 650,
                        height: window.innerHeight - 200,
                        x: 0.5,
                        y: 0.5,
                        anchor: new PIXI.Point(0.5, 0.5)
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground.beginFill(this.white, 1.0, true)
                this.quoteWrapperBackground.lineStyle(1, this.black)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, 650, window.innerHeight - 200, 10)

            }




        } 

/*

        

        // Join Modal Title
        if(width <= 500) {
            this.joinTitle.contentContainer.children[0].style.fontSize = 40
        } else if (width <= 960) {
            this.joinTitle.contentContainer.children[0].style.fontSize = 50
        } else if (width <= 1240) {
            this.joinTitle.contentContainer.children[0].style.fontSize = 80
        } else {
            this.joinTitle.contentContainer.children[0].style.fontSize = 108
        }

        //join Modal input box
        if(width <= 500) {
            //wrapper
            this.inputBox.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 300,
                    height: 50,
                    x: 0.5,
                    y: 0.545,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })
            )
            //The Input
            this.nameFieldInput.textContainer.setPadding(10)
            this.nameFieldInput.caret = new PIXI.Graphics();
            this.nameFieldInput.caret.visible = false;
            this.nameFieldInput.caret._index = 0;
            this.nameFieldInput.caret.lineStyle(1, black);
            this.nameFieldInput.caret.moveTo(0, 0);
            this.nameFieldInput.caret.lineTo(0, 25);
            this.nameFieldInput.lineHeight = 20
            this.nameFieldInput.textHeight = 20
            //The Placeholder
            this.nameFieldPlaceholder.contentContainer.children[0].style.fontSize = 20
            this.nameFieldPlaceholder.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 10,
                    y: 12,
                })
            )

            this.joinButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 200,
                    height: 50,
                    x: 0.5,
                    y: 0.727,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })
            )
            this.joinText.contentContainer.children[0].style.fontSize = 20

        } else if (width <= 960) {
            this.inputBox.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 600,
                    height: 80,
                    x: 0.5,
                    y: 0.545,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })
            )
        } else if (width <= 1240) {
            this.inputBox.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 820,
                    height: 80,
                    x: 0.5,
                    y: 0.545,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })
            )
        } else {
            this.inputBox.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 1100,
                    height: 100,
                    x: 0.5,
                    y: 0.545,
                    anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
                })
            )
            //The Input
            this.nameFieldInput.textContainer.setPadding(20)
            this.nameFieldInput.caret = new PIXI.Graphics();
            this.nameFieldInput.caret.visible = false;
            this.nameFieldInput.caret._index = 0;
            this.nameFieldInput.caret.lineStyle(1, black);
            this.nameFieldInput.caret.moveTo(0, 0);
            this.nameFieldInput.caret.lineTo(0, 60);
            this.nameFieldInput.lineHeight = 60
            this.nameFieldInput.textHeight = 60
            //The Placeholder
            this.nameFieldPlaceholder.contentContainer.children[0].style.fontSize = 52
            this.nameFieldPlaceholder.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    x: 20,
                    y: 21,
                })
            )
        }*/






    }


 
    update(delta){

        this.count++

        if(this.ageGate.visible == true) {
            let loadingCurrent = this.loadingIcon.rotation
            this.loadingIcon.rotation = loadingCurrent + 0.08 + Math.sin(delta)
        }
       
        //this.loadingIcon
        

        if(this.introScreenOn == true) {

            this.introGlitch.seed = Math.random();
            const introGlitch = this.introGlitch

            if(this.glitchOn == true) {
                var rand = Math.floor(Math.random() * 50) + 1
                introGlitch.slices = rand
                introGlitch.offset = rand
            } else {
                introGlitch.slices = 0
                introGlitch.offset = 0
            }

            this.introCRTFilter.seed = Math.random()
            this.introCRTFilter.time += 0.5

            
            if(this.introScreen.visible) {
                this.introScreen.filters = [this.introCRTFilter, this.introGlitch]
            } else {
                this.filters = []
            }

        } else {
            //this.introScreen.visible = false
        }
    
    }

}

export default UIBuilder


