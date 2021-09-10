import * as PIXI from 'pixi.js'
import * as PUXI from '../../node_modules/puxi/lib/puxi.mjs'
import MultiStyleText from 'pixi-multistyle-text'
import TaggedText from 'pixi-tagged-text'
import { Ease, ease } from 'pixi-ease'
import { sound } from '@pixi/sound'
import { CRTFilter } from '@pixi/filter-crt'
import { GlowFilter } from '@pixi/filter-glow';
import {DropShadowFilter} from '@pixi/filter-drop-shadow';

//var PUXI = require('puxi');

class UIBuilder extends PIXI.Container {
    constructor(renderer) {
        super()

        this.width  = window.innerWidth 
        this.height = window.innerHeight
        this.nameGiven = false
        
        
        const colorBlack = PIXI.utils.string2hex("#292929"); //Black
        const colorGreen = PIXI.utils.string2hex("#4DFA66") //Green

  
        this.fadeInStyles = { y: 0, alpha: 1 }
        this.fadeOutStyles = { y: 20, alpha: 0 }

        this.fadeInSettings = { duration: 250, ease: 'easeOutExpo'}
        this.fadeOutSettings = { duration: 250, ease: 'easeOutExpo'}

        this.fadeInSettingsDelay = { duration: 250, ease: 'easeOutExpo', wait: 1200 }








       



        let modalWidth = 0.9999
        let modalHeight = 0.9999;



        const puxiCenter = PUXI.FastLayoutOptions.CENTER_ANCHOR;

        






        




       




        


        this.statusStage = new PUXI.Stage({
            width: 250,
            height: 100
        });
        //this.statusStage.visible = false

        this.statusWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 250,
                height: 100,
                x: 10,
                y: 0.985,
                anchor: new PIXI.Point(0, 1)
            }),
        ).setBackground(0x000000).setBackgroundAlpha(0.3)


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


        const mask = new PIXI.Graphics();
        mask.beginFill(0xFFFFFF)
        mask.drawRect(0, 0, 250, 100);
        mask.y = -185
        mask.alpha = 0
        this.statusLayout.contentContainer.addChild(mask)
        this.statusLayout.mask = mask

       
        this.addChild(this.statusStage)

        this.statusStage.resize(window.innerWidth, window.innerHeight)
        this.statusStage.stage.hitArea = new PIXI.Rectangle(0, 0, 0, 0);





        


        this.emojiStage = new PUXI.Stage({
            width: 260,
            height: 50,
            x: 0,
            y: 0
        })
        this.emojiStage.visible = false

        this.emojiWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 260, 
                height: 50,
                x: 0.65,
                y: 0.98,
                anchor: new PIXI.Point(0.5, 1)
            })
        )

        this.emojiWrapperBackground = new PIXI.Graphics()
        this.emojiWrapperBackground.lineStyle(1.5, 0x000000, 1, 1, false)
        this.emojiWrapperBackground.beginFill(0xFFFFFF)
        this.emojiWrapperBackground.drawRoundedRect(0, 0, 260, 50, 25)
        this.emojiWrapperBackground.endFill()
        this.emojiWrapperBackground.moveTo(260, 23)
        this.emojiWrapperBackground.lineTo(260, 30)
        this.emojiWrapper.contentContainer.addChild(this.emojiWrapperBackground)

        this.coolEmoji = new PUXI.Widget({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 60,
                height: 50,
                x: 0,
                y: 0
            })
        ).setPadding(15, 10)
        const coolEmoji = new PIXI.Text("😎", {fontSize: 28});
        this.coolEmoji.contentContainer.addChild(coolEmoji)
        this.emojiWrapper.addChild(this.coolEmoji)
        this.coolEmoji.contentContainer.buttonMode = true
        this.coolEmoji.contentContainer.interactive = true

        this.heartEmoji = new PUXI.Widget({}).setLayoutOptions(
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




        this.scoreStage = new PUXI.Stage({
            width: 200,
            height: 250,
            x: 0,
            y: 0
        })
        this.scoreStage.visible = false
        
        this.scoreWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 200, 
                height: 250,
                x: 0.99,
                y: 20,
                anchor: new PIXI.Point(1, 0)
            })
        )
        
        this.scoreWrapperBackground = new PIXI.Graphics()
        this.scoreWrapperBackground.beginFill(0x000000)
        this.scoreWrapperBackground.drawRoundedRect(0, 0, 200, 250, 34)
        this.scoreWrapperBackground.endFill()
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
        
        this.talkingScoreText = new PIXI.Text("0/10", {fill: 0x000000, fontSize: 25, align: "right", wordWrap: true});
        this.talkingScoreText.x = 22
        this.talkingScoreText.y = 7
        this.talkingScoreTextBackground = new PIXI.Graphics()
        this.talkingScoreTextBackground.beginFill(0xFFFFFF)
        this.talkingScoreTextBackground.drawRoundedRect(0, 0, 100, 43, 21)
        this.talkingScoreTextBackground.endFill()
        this.talkingScore.contentContainer.addChild(this.talkingScoreTextBackground)
        this.talkingScore.contentContainer.addChild(this.talkingScoreText)
        this.scoreWrapper.addChild(this.talkingScore)



        this.robotScore = new PUXI.Widget({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 64,
                height: 25,
                x: 85,
                y: 72
            })
        )
        this.robotScore.isComplete = false

        const robotIcon = new PIXI.Sprite.from('images/robot-icon-ui.svg');
        robotIcon.x = -67
        robotIcon.y = 0
        this.robotScore.contentContainer.addChild(robotIcon)

        this.robotScoreText = new PIXI.Text("0/10", {fill: 0x000000, fontSize: 25, align: "right", wordWrap: true});
        this.robotScoreText.x = 22
        this.robotScoreText.y = 7
        this.robotScoreTextBackground = new PIXI.Graphics()
        this.robotScoreTextBackground.beginFill(0xFFFFFF)
        this.robotScoreTextBackground.drawRoundedRect(0, 0, 100, 43, 21)
        this.robotScoreTextBackground.endFill()
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

        this.dialScoreText = new PIXI.Text("0/10", {fill: 0x000000, fontSize: 25, align: "right", wordWrap: true});
        this.dialScoreText.x = 22
        this.dialScoreText.y = 7
        this.dialScoreTextBackground = new PIXI.Graphics()
        this.dialScoreTextBackground.beginFill(0xFFFFFF)
        this.dialScoreTextBackground.drawRoundedRect(0, 0, 100, 43, 21)
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


        this.faceScoreText = new PIXI.Text("0/10", {fill: 0x000000, fontSize: 25, align: "right", wordWrap: true});
        this.faceScoreText.x = 22
        this.faceScoreText.y = 7
        this.faceScoreTextBackground = new PIXI.Graphics()
        this.faceScoreTextBackground.beginFill(0xFFFFFF)
        this.faceScoreTextBackground.drawRoundedRect(0, 0, 100, 43, 21)
        this.faceScoreTextBackground.endFill()
        this.faceScore.contentContainer.addChild(this.faceScoreTextBackground)
        this.faceScore.contentContainer.addChild(this.faceScoreText)
        this.scoreWrapper.addChild(this.faceScore)


        
        
        this.scoreStage.addChild(this.scoreWrapper);
        this.addChild(this.scoreStage);
        
        this.scoreStage.resize(window.innerWidth, window.innerHeight)
        const scoreBounds = this.scoreWrapperBackground.getBounds()
        this.scoreStage.stage.hitArea = new PIXI.Rectangle(
            scoreBounds.x,
            scoreBounds.y,
            scoreBounds.width,
            scoreBounds.height
        );
        







/*
        this.leaveGameStage = new PUXI.Stage({
            width: 100,
            height: 50,
            x: 0,
            y: 0
        })


        //Leave Button 
        this.leaveButtonWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 100,
                height: 40,
                x: 0.985,
                y: 0.5,
                anchor: new PIXI.Point(1,0)
            }),
        ).setBackground(0x000000).setBackgroundAlpha(1);

        this.leaveButton = new PUXI.Button({
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
        this.leaveButtonWrapper.addChild(this.leaveButton)
        this.leaveButton.on("hover", function (over) {
            if(over == true) {
                this.setBackground("#FFFF00")
            } else {
                this.setBackground("#FFFFFF")
            }
        });

        

        const leaveText = new PUXI.TextWidget('LEAVE', buttonStyles)
        leaveText.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 50,
            height: 18,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        leaveText.tint = 0x000000
        this.leaveButtonWrapper.addChild(leaveText)



        const leaveTextTwo = new PUXI.TextWidget('LEAVE', buttonStyles)
        leaveTextTwo.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 50,
            height: 18,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        leaveTextTwo.tint = 0xFFFFFF
        leaveTextTwo.alpha = 0;
        this.leaveButtonWrapper.addChild(leaveTextTwo)
        this.leaveButtonWrapper.contentContainer.interactive = true;
        this.leaveButtonWrapper.contentContainer.buttonMode = true;
        this.leaveButtonWrapper.contentContainer.cursor = "pointer";

        const leaveButtonClick = new PUXI.ClickManager(this.leaveButton, true, false, false)
        
        leaveButtonClick.onPress = function(){
            this.setBackground(0xff0000)
            joinText.alpha = 0
            joinTextTwo.alpha = 1
        }
        leaveButtonClick.onClick = function(){
            this.setBackground(0xffffff)
            joinText.alpha = 1
            joinTextTwo.alpha = 0

            sound.add('login', 'audio/login.mp3');
            sound.play('login')
        }

        this.leaveGameStage.addChild(this.leaveButtonWrapper)
        this.addChild(this.leaveGameStage)
        this.leaveButtonWrapper.contentContainer.alpha = 0
        this.leaveGameStage.resize(window.innerWidth, window.innerHeight)
        const leaveGameBounds = this.leaveButtonWrapper.contentContainer.getBounds()
        this.leaveGameStage.stage.hitArea = new PIXI.Rectangle(
            leaveGameBounds.x,
            leaveGameBounds.y,
            leaveGameBounds.width,
            leaveGameBounds.height
        );
        ease.add(this.leaveButtonWrapper.contentContainer, fadeInStyles, fadeInSettings)
*/
        
            console.log(window.innerWidth)

        let textBoxWidth = 100
        if(window.innerWidth < 321) {
            textBoxWidth = 290
        } else if (window.innerWidth < 376) {
            textBoxWidth = 320
        } else if (window.innerWidth < 415) {
            textBoxWidth = 390
        } else {
            textBoxWidth = 450
        }
        console.log(textBoxWidth)
        //const textBoxWidth = 450
        const textBoxHeight = 50
        // Chat Text Entry Element 
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
                y: 0.97,
                anchor: new PIXI.Point(0.5, 1)
            }),
        )

        this.textBoxWrapperBackground = new PIXI.Graphics()
        this.textBoxWrapperBackground.lineStyle(1.5, 0x000000, 1, 1, false)
        this.textBoxWrapperBackground.beginFill(0xFFFFFF)
        this.textBoxWrapperBackground.drawRoundedRect(0, 0, textBoxWidth, textBoxHeight, 25)
        this.textBoxWrapperBackground.endFill()
        this.textBoxWrapperBackground.moveTo(textBoxWidth, 23)
        this.textBoxWrapperBackground.lineTo(textBoxWidth, 30)
        this.textBoxWrapper.contentContainer.addChild(this.textBoxWrapperBackground)

        const textInputStyles = new PIXI.TextStyle({ 
            fontFamily: 'Trade Gothic Next',
            fill: "#000000", 
            fontSize: 26
        })
        
        //The Text Input
        this.mockInput = new PUXI.TextInput({
            multiLine: false,
            value: "",
            padding: 10,
            maxLength: 30,
            selectedColor: "#000000",
            selectedBackgroundColor: "#FFFF00",
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
                x: 15,
                y: 10,
            })
        )
        this.TextBoxPlaceholder.alpha = 0;
        ease.add(this.TextBoxPlaceholder, this.fadeInStyles, this.fadeInSettingsDelay)
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
        sendIcon.alpha = 0.7
        sendIcon.anchor.set(0.5)

        sendIcon.x = textBoxBounds.width - 30
        sendIcon.y = textBoxBounds.height/2

        sendIcon.interactive = true;
        sendIcon.buttonMode = true;

        this.textBoxWrapper.contentContainer.addChild(sendIcon)
        
        
        //sendIcon



















        this.worldInfo = new PUXI.Stage({
            width: 200,
            height: 63,
            x: 0,
            y: 0
        })
        this.worldInfo.visible = false
        
        this.worldInfoWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 200, 
                height: 63,
                x: 0.985,
                y: 0.975,
                anchor: new PIXI.Point(1, 1)
            })
        ).setPadding(10)
        
        this.worldInfoBackground = new PIXI.Graphics()
        this.worldInfoBackground.beginFill(0xFFFFFF)
        this.worldInfoBackground.drawRoundedRect(0, 0, 200, 63, 15)
        this.worldInfoBackground.endFill()
        this.worldInfoWrapper.contentContainer.addChild(this.worldInfoBackground)

        this.worldInfo.addChild(this.worldInfoWrapper);
        this.addChild(this.worldInfo)


        this.currentTimeHeader = new PIXI.Text("World Running For:", {fill: 0x000000, fontSize: 10, fontFamily: 'Iosveka'});
        this.currentTimeHeader.x = 10
        this.currentTimeHeader.y = 10
        this.worldInfoWrapper.contentContainer.addChild(this.currentTimeHeader);
        
        this.currentTime = new PIXI.Text("00:00", {fill: 0x000000, fontSize: 10, fontFamily: 'Iosveka'});
        this.currentTime.x = 130
        this.currentTime.y = 11
        this.worldInfoWrapper.contentContainer.addChild(this.currentTime);



        this.numberOfPeople = new PIXI.Text("Active Users:", {fill: 0x000000, fontSize: 10, fontFamily: 'Iosveka'});
        this.numberOfPeople.x = 10
        this.numberOfPeople.y = 26
        this.worldInfoWrapper.contentContainer.addChild(this.numberOfPeople);
        
        this.numberOfPeopleCounter = new PIXI.Text("0", {fill: 0x000000, fontSize: 10, fontFamily: 'Iosveka'});
        this.numberOfPeopleCounter.x = 130
        this.numberOfPeopleCounter.y = 26
        this.worldInfoWrapper.contentContainer.addChild(this.numberOfPeopleCounter);



        this.totalNumberOfPeople = new PIXI.Text("Total Users:", {fill: 0x000000, fontSize: 10, fontFamily: 'Iosveka'});
        this.totalNumberOfPeople.x = 10
        this.totalNumberOfPeople.y = 42
        this.worldInfoWrapper.contentContainer.addChild(this.totalNumberOfPeople);
        
        this.totalNumberOfPeopleCounter = new PIXI.Text("0", {fill: 0x000000, fontSize: 10, fontFamily: 'Iosveka'});
        this.totalNumberOfPeopleCounter.x = 130
        this.totalNumberOfPeopleCounter.y = 43
        this.worldInfoWrapper.contentContainer.addChild(this.totalNumberOfPeopleCounter);



        this.worldInfo.resize(window.innerWidth, window.innerHeight)
        const worldBounds = this.worldInfoBackground.getBounds()
        this.worldInfo.stage.hitArea = new PIXI.Rectangle(
            worldBounds.x,
            worldBounds.y,
            worldBounds.width,
            worldBounds.height
        );
















        let quoteWidth = 0.5

        this.quoteStage = new PUXI.Stage(window.innerWidth, window.innerHeight);
        this.quoteWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: quoteWidth,
                height: 0.8,
                x: 0.3,
                y: 0.5,
                anchor: new PIXI.Point(0.5, 0.5)
            }),
        )
        this.quoteWrapperBackground = new PIXI.Graphics()
        this.quoteWrapperBackground.beginFill(0xFFFFFF)
        this.quoteWrapperBackground.lineStyle(1, 0x000000)
        if(window.innerWidth <=500) {
            this.quoteWrapperBackground.drawRoundedRect(0, 0, (window.innerWidth/100)*90, (window.innerHeight/100)*85, 50)
        } else {
            this.quoteWrapperBackground.drawRoundedRect(0, 0, (window.innerWidth/100)*quoteWidth, (window.innerHeight/100)*80, 50)
        }
        this.quoteWrapper.contentContainer.addChild(this.quoteWrapperBackground)




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
            dragScrolling: true,
            softness: 1,
            expandMask: 0,
            overflowY: -1000,
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.9999,
                height: 0.999,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            })
        ).setPadding(0, 50, 0, 100)
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
            wordWrapWidth: 700,
            leading: 1,
            textBaseline: "middle"
        });

        const styleHeading = new PIXI.TextStyle({
            fontFamily: "Trade Gothic Next",
            fontSize: 32,
            breakWords: true,
            fontWeight: 700,
            lineHeight: 40,
            whiteSpace: "pre",
            letterSpacing: 1,
            wordWrap: true,
            wordWrapWidth: 600,
            leading: 1
        });



        this.quotesToShow = [
            //About
            {
                title: "What is BIAS ONLINE",
                subtitle: "",
                credit: "",
                paragraph:"Welcome to a virtual exhibition space by Science Gallery at Trinity College Dublin showcasing digital artworks exploring data equity, privacy, surveillance culture, facial recognition, class and artificial intelligence.\n\nOur virtual gallery is very similar to the real world; you move your character through the 2D space to explore the exhibition. Kiosks like this one reveal further information and portals take you to other areas in the gallery.\n\nAnd just like the real world, you're here live with other people. You can chat using the text box below or if you're feeling shy, why not send an emoji blast to show your feelings?\n\nOK, go explore!",
               // paragraph: "BIAS ONLINE: a virtual exhibition space by Science Gallery at Trinity College Dublin showcasing digital artworks exploring data equity, privacy, surveillance culture, facial recognition, class and artificial intelligence.",
                style: "",
                type: ""
            },
            {
                title: "Artists of BIAS",
                subtitle: "",
                credit: "",
                paragraph:"Intro PARA\n\nARTIST 1 BIO\n\netc",
               // paragraph: "BIAS ONLINE: a virtual exhibition space by Science Gallery at Trinity College Dublin showcasing digital artworks exploring data equity, privacy, surveillance culture, facial recognition, class and artificial intelligence.",
                style: "",
                type: ""
            },
            {
                title: "Interogations of BIAS",
                subtitle: "",
                credit: "",
                paragraph:"ARTIST 1-2-3-4 WORK IMG, LINK DIRECT FROM IMAGE, EXHIB TEXT\n\nx4",
               // paragraph: "BIAS ONLINE: a virtual exhibition space by Science Gallery at Trinity College Dublin showcasing digital artworks exploring data equity, privacy, surveillance culture, facial recognition, class and artificial intelligence.",
                style: "",
                type: ""
            },
            //Credits
            {
                title:"Credits",
                subtitle:"",
                credit:"——",
                paragraph: "Project Team:\n\nAisling Murray, Mitzi D'Alton, \nRory McCorrmick, Niamh O' Doherty, \nJames Delaney \n\nArtists:\n\nJohann Diedrick\nLibby Heaney\nMushon Zer-Aviv\nNoah Levenson\n\nBackgrounds aduios loops by Eric Matyas|\nSound effect by Tom Winters\n\nScience Gallery Dublin is part of the Global Science Gallery Network pioneered by Trinity College Dublin.\n\nBIAS ONLINE was developed with the support of the European ARTificial Intelligence Lab, co-funded by the Creative Europe Programme of the European Union. (plus logos)\n\nBIAS ONLINE was created with the support of The Department of Tourism, Culture, Arts, Gaeltacht, Sport and Media.\n",
                style:"",
                type: ""
            },
            //Privacy
            {
                title:"Privacy",
                subtitle:"",
                credit:"",
                paragraph: "Your private information: You should not share or provide your own private information in the chat functionality.  If you do, others may keep or store such information.  Science Gallery Dublin accepts no liability for such. For information on our Privacy Policy and Data Retention Policy please visit sciencegallery.org/privacy.\n\nOther information: You may not publish or post other people's private information (such as names, home phone number and address) without their express permission. We also prohibit threatening to expose private information or incentivizing others to do so.",
                style:"",
                type: "face"
            },{
                title:"WELCOME TO BIAS ONLINE",
                subtitle:"Specially for the Ars festival",
                credit:"——",
                paragraph: "We’re launching our very first online-only exhibition: BIAS ONLINE bring online visitors on a journey of compelling exploration through datasets, emotion and facial recognition and artificial intelligence with new artworks from Libby Heaney, Johann Diedrick, Mushon Zer-Aviv, and Noah Levenson. BIAS ONLINE was developed and supported by Science Gallery at Trinity College Dublin as part of the European ARTificial Intelligence Lab project. Co-funded by Creative Europe.",
                style:"",
                type: "face"
            },{
                title:"STEALING UR FEELINGS",
                subtitle:"Can the internet read you?",
                credit:"Noah Levenson | USA | 2019",
                paragraph: "Meet the new A.I. that knows you better than you know yourself. STEALING UR FEELINGS is an interactive film that learns your deepest, darkest secrets - <i>just by looking at your face</i>. That's the good news. The bad news? Your favourite apps are doing exactly the same thing.\n\n<small><bold>BIO</bold>\nNoah Levenson leads research engineering as 'Hacker in Residence' at Consumer Reports Digital Lab. He is a 2019 Rockefeller Foundation Bellagio fellow. His computer science work has been profiled by Scientific American, MIT, Engadget, CBC News, and Fast Company, among others. He lives in New York City, where he was born.\n\n<noahlink>noahlevenson.com</noahlink> // @noahlevenson</small>",
                style:"",
                type: "face"
            },{
                title:"DARK MATTERS",
                subtitle:"What does bias sound like?",
                credit: "Johann Diedrick | USA | 2021",
                paragraph: "Dark Matters exposes the absence of Black speech in the datasets used to train voice interface systems in consumer AI products like Alexa and Siri. Using 3D modeling, sound and storytelling, the project challenges us to grapple with racism and inequity through speech and the spoken word, and how AI systems underserve Black communities.\n\nBIO\nJohann Diedrick is an artist, engineer, and musician that makes installations, performances, and sculptures for encountering the world through our ears. He surfaces vibratory histories of past interactions inscribed in material and embedded in space, peeling back sonic layers to reveal hidden memories and untold stories. He shares his tools and techniques through listening tours, workshops, and open-source hardware/software. He is the founder of A Quiet Life, a sonic engineering and research studio that designs and builds audio-related software and hardware products for revealing possibilities off the grid through sonic encounter. He is a 2021 Mozilla Creative Media Award recipient, a member of NEW INC, and an adjunct professor at NYU's ITP program. His work has been featured in Wire Magazine, Musicworks Magazine, and presented internationally at MoMA PS1, Ars Electronica, and the Somerset House, among others. This project is supported by the Mozilla Foundation.<small></small>",
                style:"",
                type: "talking"
            }
        ]
        
       

        

        this.title = "WELCOME TO BIAS ONLINE";
        this.title = new TaggedText(this.title, {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "32px",
                wordWrap: true,
                lineHeight: 45,
                padding: 10,
                wordWrapWidth: 300,
                leading: 1,
                textBaseline: "middle"
            },
            "bold": {
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: 45,
            }
        });
        this.title.alpha = 0
        this.title.x = 50
        this.title.y = 45


        this.textContent = new PUXI.TextWidget("", style)
       
        this.connectedText = new TaggedText("", {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "32px",
                wordWrap: true,
                lineHeight: 45,
                padding: 10,
                wordWrapWidth: 700,
                leading: 1,
                textBaseline: "middle"
            },
            "subtitle": {
                lineHeight: 55,
            },
            "bold": {
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: 24
            },
            "small": {
                fontSize: "20px",
                lineHeight: 26,
            },
            "i": {
                fontStyle: "italic"
            },
            "noahlink": {
                fill: "blue"
            }
        });

        this.textContent.contentContainer.addChild(this.connectedText)
        this.connectedText.interactive = true;
        this.connectedText.visible = false
        this.connectedText.visible = true
        this.textContent.contentContainer.children[0].alpha = 0
        
       

        this.leaveButtonWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 40,
                height: 40,
                x: 0.9725,
                y: 60,
                anchor: new PIXI.Point(1,0.5)
            }),
        )

        this.leaveButton = new PUXI.Button({
            text: '×'
        }).setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 0.9999,
            height: 0.9999,
            x: 0,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        .setBackground(0xFFFFFFF)
        .setBackgroundAlpha(1)
        this.leaveButtonWrapper.addChild(this.leaveButton)

        const leaveButtonClick = new PUXI.ClickManager(this.leaveButton, true, false, false)
        
        leaveButtonClick.onClick = function(){
            theUI.closeModal()
        }
        
        ease.add(this.leaveButtonWrapper.contentContainer, this.fadeInStyles, this.fadeInSettingsDelay)










        let textContainer = this.textContent
        let textTitle = this.title

        setTimeout(function(){
            textContainer.alpha = 1
            textTitle.alpha = 1
        }, 1000)


        this.scrollContent.addChild(this.textContent)
        this.quoteWrapper.contentContainer.addChild(this.title)
        this.quoteWrapper.addChild(this.leaveButtonWrapper)
        this.quoteStage.addChild(this.quoteWrapper)
        this.quoteWrapper.contentContainer.alpha = 0


        //this.addChild(this.quoteStage)

        //this.quoteStage.resize(window.innerWidth, window.innerHeight)





















        //Modal Stage
        this.joinModal = new PUXI.Stage(window.innerWidth, window.innerHeight)   
        
        //Modal Background
        this.joinModalWrapper = new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.999999, 
                height: 0.99999,
            }),
        )
        .setBackground(colorGreen)
        
        this.drawGridBackground(window.innerWidth, window.innerHeight)


        
       
        


        


        //Modal Centre Box Wrapper 
        this.joinModalWidgetGroup = new PUXI.WidgetGroup().setLayoutOptions(
            new PUXI.FastLayoutOptions({
                x: 0.5, y: 0.5,
                anchor: puxiCenter,
                width: modalWidth,
                height: modalHeight
            }),
        )

        
        this.joinModalWidgetGroup.contentContainer.alpha = 0
        this.joinModalWidgetGroup.contentContainer.y = 50



        ease.add(this.joinModalWidgetGroup.contentContainer, this.fadeInStyles, this.fadeInSettingsDelay)
        




        //Whats your name
        this.joinTitleWrapper = new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0,
                height: 0,
                x: 0.5,
                y: 0.3725,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        ).setBackground(0xFFFFFF)

        this.joinTitleStyles = new PIXI.TextStyle({ 
            fontFamily: 'Trade Gothic Next',
            fill: colorBlack, 
            fontSize: 108,
            fontWeight: 900, 
        })

        this.joinTitle = new PUXI.TextWidget(
            'What’s your name?', 
            this.joinTitleStyles
        )
        
        this.joinTitle.contentContainer.children[0].anchor.set(0.5, 0.5);
        this.joinTitle.contentContainer.children[0].x = 0
        this.joinTitle.contentContainer.children[0].y = 0
        this.joinTitleWrapper.addChild(this.joinTitle)
        





        


        //Name Input Field
        this.inputBox = new PUXI.WidgetGroup().setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 1100,
                height: 100,
                x: 0.5,
                y: 0.545,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        ).setBackground(0xFFFFFF).setBackgroundAlpha(1);
        
        //Text Styles for Input and Placeholder
        const textStyles = new PIXI.TextStyle({ 
            fontFamily: 'Trade Gothic Next',
            fill: "#000000", 
            fontSize: 52
        })
        //The Text Input
        this.nameFieldInput = new PUXI.TextInput({
            multiLine: false,
            value: "",
            padding: 20,
            maxLength: 25,
            align: "center",
            fontVariant: "small-caps",
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

        const inputBox = this.inputBox
        this.inputBox.contentContainer.on("mouseover", function() {
            inputBox.setBackground("#FFFF00")
        });
        this.inputBox.contentContainer.on("mouseout", function() {
            inputBox.setBackground("#FFFFFF")
        });









        //select avatar 
        //Logo Wrapper + Logo
        const avatarWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 100,
                height: 100,
                x: 0.5,
                y: 0.55,
                anchor: new PIXI.Point(0.5,0.5)
            }),
        )


        this.avatarBox = new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 100,
                height: 100,
                x: 0.5,
                y: 0.55,
                anchor: new PIXI.Point(0,0)
            }),
        )
        //this.avatarBox.contentContainer.children[0].anchor.set(0.5, 0.5)

        //this.avatar = null
        var avatarCounter = 1
        let avatarBox = this.avatarBox
        setInterval(function(){
            if(avatarBox.contentContainer.children == 0) {
                let avatarCurrent = PIXI.Sprite.from('images/avatar'+avatarCounter+'.svg');
                avatarCurrent.width = 100
                avatarCurrent.height = 100
                avatarCurrent.x = -50
                avatarCurrent.y = -50
                avatarBox.contentContainer.addChild(avatarCurrent)
            } else {
                avatarBox.contentContainer.removeChildAt(0)
                let avatarCurrent = PIXI.Sprite.from('images/avatar'+avatarCounter+'.svg');
                this.avatar = avatarCurrent
                avatarCurrent.width = 100
                avatarCurrent.height = 100
                avatarCurrent.x = -50
                avatarCurrent.y = -50
                avatarBox.contentContainer.addChild(avatarCurrent)

            }
            avatarCounter++
            if(avatarCounter >= 5) {
                avatarCounter = 1
            }
        }, 500)
        this.avatarBox.alpha = 0
        avatarWrapper.addChild(this.avatarBox)
        this.joinModalWidgetGroup.addChild(avatarWrapper)




       









        


        //Join Button 
        this.joinButtonWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 500,
                height: 100,
                x: 0.5,
                y: 0.727,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        ).setBackground(0x000000).setBackgroundAlpha(1);

        this.joinButton = new PUXI.Button({
            text: ''
        }).setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 0.9999,
            height: 0.9999,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        .setBackground(0xFF284D)
        .setBackgroundAlpha(1)
        this.joinButtonWrapper.addChild(this.joinButton)
        this.joinButton.on("hover", function (over) {
            if(over == true) {
                this.setBackground("#FFFF00")
            } else {
                this.setBackground("#FF284D")
            }
        });

        

       const buttonStyles = new PIXI.TextStyle({ 
            fontFamily: 'Trade Gothic Next',
            fill: "#FFFFFF", 
            fontWeight: 700,
            fontSize: 64, 
            letterSpacing: 2
        })
        this.joinText = new PUXI.TextWidget('CONTINUE', buttonStyles)
        this.joinText.setLayoutOptions(new PUXI.FastLayoutOptions({
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        this.joinText.tint = 0x000000
        this.joinButtonWrapper.addChild(this.joinText)

        this.joinButtonWrapper.contentContainer.interactive = true;
        this.joinButtonWrapper.contentContainer.buttonMode = true;
        this.joinButtonWrapper.contentContainer.cursor = "pointer";

        const joinButtonClick = new PUXI.ClickManager(this.joinButton, true, false, false)
        
        joinButtonClick.onPress = function(){
            this.setBackground(0xffff00)
            
        }

        const joinTitleWrapper = this.joinTitleWrapper
        const joinModalWidgetGroup = this.joinModalWidgetGroup
        
        joinButtonClick.onClick = function(){

            sound.add('login', 'audio/login.mp3');
            sound.play('login')
            
            joinTitleWrapper.contentContainer.children[0].children[0].children[0].text = 'Select your avatar'
            joinModalWidgetGroup.removeChild(inputBox)
            avatarBox.alpha = 1

            theUI.setName()
            
            
            const nameStyles = new PIXI.TextStyle({ 
                fontFamily: 'Trade Gothic Next',
                fill: colorBlack, 
                fontSize: 25,
                fontWeight: 900, 
                letterSpacing: 2
            })
            
            setTimeout(function(){
                let personName = theUI.getText()
                personName = personName.padStart(20, ' ')
                personName = personName.padEnd(20, ' ')
                const nameText = new PIXI.Text(""+personName.toUpperCase()+"", nameStyles);
                nameText.updateText();
                

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
                const rope = new PIXI.SimpleRope( nameText.texture, points );
                container.addChild( rope );
                const bounds = container.getLocalBounds();
                console.log(bounds)
                const matrix = new PIXI.Matrix();
                matrix.tx = -bounds.x;
                matrix.ty = -bounds.y;

                const renderTexture = PIXI.RenderTexture.create( bounds.width, bounds.height, PIXI.settings.SCALE_MODE.NEAREST, 2 );
                renderer.render(container, renderTexture, true, matrix, false);
                
                PIXI.BaseTexture.addToCache( renderTexture.baseTexture, 'curvedText' );
                PIXI.Texture.addToCache( renderTexture, 'curvedText' );
                
                const sprite = PIXI.Sprite.from('curvedText');
                //sprite.anchor.set();
                console.log(sprite.width)

                sprite.y = -28
                sprite.x = -33
                //sprite.x = -moveBack
                avatarWrapper.contentContainer.addChildAt(sprite)
                
                
            }, 200)

        
            
        }


        

        


        

        this.joinModalWidgetGroup.addChild(this.joinTitleWrapper)
        this.joinModalWidgetGroup.addChild(this.inputBox)
        this.joinModalWidgetGroup.addChild(this.joinButtonWrapper)
        
        this.joinModal.addChild(this.joinModalWidgetGroup)
        
        this.addChild(this.joinModal)











        //this.joinModal.resize(window.innerWidth, window.innerHeight)

        const theUI = this
        const joinModal = this.joinModal
        const quoteStage = this.quoteStage

        setTimeout(function(){

            theUI.resizeText()
            joinModal.resize(window.innerWidth, window.innerHeight)
            quoteStage.resize(window.innerWidth, window.innerHeight)

        }, 500)

        document.addEventListener("pointerdown", function(e) {
            if (e.target.nodeName === "DIV"){
                if(document.getElementById("iframe")) {
                    document.getElementById("iframe").remove()
                    e.target.remove()
                }
            }
        })

        window.addEventListener('resize', () => {
            
            this.resizeText()
            
            this.drawGridBackground(window.innerWidth, window.innerHeight)

            if(this.iframe) {
                this.iframe.width = window.innerWidth
                this.iframe.height = window.innerHeight
            }
            

            this.joinModal.resize(window.innerWidth, window.innerHeight)
            
            this.statusStage.resize(window.innerWidth, window.innerHeight)
            this.statusStage.stage.hitArea = new PIXI.Rectangle(0,0,0,0);

            
            this.quoteStage.resize(window.innerWidth, window.innerHeight)
            const quoteBounds = this.quoteWrapperBackground.getBounds()
            this.quoteStage.stage.hitArea = new PIXI.Rectangle(
                quoteBounds.x,
                quoteBounds.y,
                quoteBounds.width,
                quoteBounds.height
            );
           

            this.quoteWrapperBackground.clear()
            this.quoteWrapperBackground = new PIXI.Graphics()
            this.quoteWrapperBackground.lineStyle(1, 0x000000)
            this.quoteWrapperBackground.beginFill(0xFFFFFF)  

            if(window.innerWidth <=500) {
                this.quoteWrapperBackground.drawRoundedRect(0, 0, (window.innerWidth/100)*90, (window.innerHeight/100)*80, 50)
            } else {
                this.quoteWrapperBackground.drawRoundedRect(0, 0, (window.innerWidth/100)*80, (window.innerHeight/100)*80, 50)
            }
            this.quoteWrapper.contentContainer.addChildAt(this.quoteWrapperBackground,0)
            



            this.textBox.resize(window.innerWidth, window.innerHeight)
            const textBoxbounds = this.textBoxWrapperBackground.getBounds()
            this.textBox.stage.hitArea = new PIXI.Rectangle(
                textBoxbounds.x,
                textBoxbounds.y,
                textBoxbounds.width,
                textBoxbounds.height
            );

            this.emojiStage.resize(window.innerWidth, window.innerHeight)
            const emojiBounds = this.emojiWrapperBackground.getBounds()
            this.emojiStage.stage.hitArea = new PIXI.Rectangle(
                emojiBounds.x,
                emojiBounds.y,
                emojiBounds.width,
                emojiBounds.height
            );
            
            this.scoreStage.resize(window.innerWidth, window.innerHeight)
            const scoreBounds = this.scoreWrapperBackground.getBounds()
            this.scoreStage.stage.hitArea = new PIXI.Rectangle(
                scoreBounds.x,
                scoreBounds.y,
                scoreBounds.width,
                scoreBounds.height
            );

            this.worldInfo.resize(window.innerWidth, window.innerHeight)
            const worldBounds = this.worldInfoBackground.getBounds()
            this.worldInfo.stage.hitArea = new PIXI.Rectangle(
                worldBounds.x,
                worldBounds.y,
                worldBounds.width,
                worldBounds.height
            );

            /*this.leaveGameStage.resize(window.innerWidth, window.innerHeight)
            const leaveGameBounds = this.leaveButtonWrapper.contentContainer.getBounds()
            this.leaveGameStage.stage.hitArea = new PIXI.Rectangle(
                leaveGameBounds.x,
                leaveGameBounds.y,
                leaveGameBounds.width,
                leaveGameBounds.height
            );*/


        })
        //this.resetArt = true
        this.showingArt = false
        this.showingQuote = false
        this.count = 0

        


    }


    getAvatar() {
        return this.avatarBox.contentContainer.children[0]._texture.textureCacheIds
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
            line.lineStyle(this.gridLine, 0x000000, 0.5)
            line.moveTo(i * this.gridGap, 0)
            line.lineTo(i * this.gridGap, height)
            this.gridBackground.addChild(line)
        }

        this.numberOfLinesVertical = height / this.gridGap
            
        for (var i = 0; i < this.numberOfLinesVertical; i++) { 
            let line = new PIXI.Graphics()
            line.lineStyle(this.gridLine, 0x000000, 0.5)
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











        //New UI Framework
        const menuIconGraphic = PIXI.Sprite.from('images/menu-icon.svg')
        const menuIconCloseGraphic = PIXI.Sprite.from('images/menu-icon-close.svg')

        this.menuIcon = new PIXI.Sprite.from('images/menu-icon.svg')
        const menuIcon = this.menuIcon
        menuIcon.name = 'menu-icon'
        menuIcon.width = 24
        menuIcon.height = 24
        menuIcon.x = 15
        menuIcon.y = 15
        menuIcon.interactive = true
        menuIcon.buttonMode = true

        menuIcon.on("pointerdown", function () {
            if(menuIcon.name == 'menu-icon') {
                menuIcon.texture = menuIconCloseGraphic.texture
                menuIcon.name = 'menu-icon-close'
                aboutLink.alpha = 1
                creditsLink.alpha = 1
                privacyLink.alpha = 1
                artistsLink.alpha = 1
                workLink.alpha = 1
                logoStage.alpha = 1
            } else if(menuIcon.name == 'menu-icon-close') {
                menuIcon.texture = menuIconGraphic.texture
                menuIcon.name = 'menu-icon'
                aboutLink.alpha = 0
                creditsLink.alpha = 0
                privacyLink.alpha = 0
                artistsLink.alpha = 0
                workLink.alpha = 0
                logoStage.alpha = 0
            }
        });

        this.addChild(menuIcon)

      


        const navLinkTextStyles = {
            default: {
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                fill: "#ffffff",
            },
            underline: {   
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                fill: "#ffffff",
                textDecoration: "underline", 
                fill: "#ffffff"
            },
          };


        const userInterface = this


        const aboutLinkText = 'About';
        const aboutLinkUnderlineText = '<underline>About</underline>';

        const aboutLink = new TaggedText(aboutLinkText, navLinkTextStyles, {
            drawWhitespace: true,
        });
        aboutLink.alpha = 0
        aboutLink.x = 55
        aboutLink.y = 18
        aboutLink.interactive = true
        aboutLink.buttonMode = true

        aboutLink.on("pointerover", function () {
            aboutLink.setText(aboutLinkUnderlineText)
        })
        
        aboutLink.on("pointerdown", function () {
            userInterface.showQuote("0")
        })
        aboutLink.on("pointerout", function () {
            aboutLink.setText(aboutLinkText)
        })

        this.addChild(aboutLink)


        const artistsLinkText = 'Artists';
        const artistsLinkUnderlineText = '<underline>Artists</underline>';
        
        const artistsLink = new TaggedText(artistsLinkText, navLinkTextStyles, {
            drawWhitespace: true,
        });
        artistsLink.alpha = 0
        artistsLink.x = 55
        artistsLink.y = 38
        artistsLink.interactive = true
        artistsLink.buttonMode = true
        
        artistsLink.on("pointerover", function () {
            artistsLink.setText(artistsLinkUnderlineText)
        })
        artistsLink.on("pointerdown", function () {
            userInterface.showQuote("0")
        })
        artistsLink.on("pointerout", function () {
            artistsLink.setText(artistsLinkText)
        })
        
        this.addChild(artistsLink)



        const workLinkText = 'Work';
        const workLinkUnderlineText = '<underline>Work</underline>';
        
        const workLink = new TaggedText(workLinkText, navLinkTextStyles, {
            drawWhitespace: true,
        });
        workLink.alpha = 0
        workLink.x = 55
        workLink.y = 58
        workLink.interactive = true
        workLink.buttonMode = true
        
        workLink.on("pointerover", function () {
            workLink.setText(workLinkUnderlineText)
        })
        workLink.on("pointerdown", function () {
            userInterface.showQuote("0")
        })
        workLink.on("pointerout", function () {
            workLink.setText(workLinkText)
        })
        
        this.addChild(workLink)
        




        const creditsLinkText = 'Credits';
        const creditsLinkUnderlineText = '<underline>Credits</underline>';

        const creditsLink = new TaggedText(creditsLinkText, navLinkTextStyles, {
            drawWhitespace: true,
        });
        creditsLink.alpha = 0
        creditsLink.x = 55
        creditsLink.y = 78
        creditsLink.interactive = true
        creditsLink.buttonMode = true

        creditsLink.on("pointerover", function () {
            creditsLink.setText(creditsLinkUnderlineText)
        })
        creditsLink.on("pointerdown", function () {
            userInterface.showQuote("3")
        })
        creditsLink.on("pointerout", function () {
            creditsLink.setText(creditsLinkText)
        })

        this.addChild(creditsLink)
          


        const privacyLinkText = 'Privacy';
        const privacyLinkUnderlineText = '<underline>Privacy</underline>';

        const privacyLink = new TaggedText(privacyLinkText, navLinkTextStyles, {
            drawWhitespace: true,
        });
        privacyLink.alpha = 0
        privacyLink.x = 55
        privacyLink.y = 98
        privacyLink.interactive = true
        privacyLink.buttonMode = true

        privacyLink.on("pointerover", function () {
            privacyLink.setText(privacyLinkUnderlineText)
        })
        privacyLink.on("pointerdown", function () {
            userInterface.showQuote("2")
        })
        privacyLink.on("pointerout", function () {
            privacyLink.setText(privacyLinkText)
        })

        this.addChild(privacyLink)




        const scienceGalleryLogo = PIXI.Sprite.from('images/sg-white.svg');
        scienceGalleryLogo.width = 88
        scienceGalleryLogo.height = 42.5
        scienceGalleryLogo.x = window.innerWidth - 100
        scienceGalleryLogo.y = 12
        scienceGalleryLogo.interactive = true
        scienceGalleryLogo.buttonMode = true
        scienceGalleryLogo.on("pointerdown", function () {
           window.open('https://dublin.sciencegallery.com/')
        })
        this.addChild(scienceGalleryLogo)
        

            






























        


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
            if(twitter.alpha == 1) {
                twitter.alpha = 0
                facebook.alpha = 0
            } else {
                twitter.alpha = 1
                facebook.alpha = 1
            }
        });
        this.addChild(shareIcon)



        //Twitter Share Icon  
        this.twitterShare = PIXI.Sprite.from('images/twitter-icon.svg');
        const twitter = this.twitterShare
        twitter.width = 20
        twitter.height = 16
        twitter.x = 15
        twitter.y = 90
        twitter.alpha = 0
        twitter.interactive = true
        twitter.buttonMode = true

        twitter.on("pointerdown", function () {
            window.open("https://twitter.com/intent/tweet?url=https%3A%2F%2Fbiasonline.ie%2F&via=SciGalleryDub&text=I%27m%20exploring%20BIAS%20ONLINE%20an%20exhibition%20about%20data%20equity%2C%20privacy%2C%20surveillance%20culture%2C%20facial%20recognition%2C%20class%20and%20artificial%20intelligence.%20Join%20me%20in%20real-time%21", "_blank", "width=650,height=300");
        });
        this.addChild(twitter)



        //facebook Share Icon  
        this.facebookShare = PIXI.Sprite.from('images/facebook-icon.svg');
        const facebook = this.facebookShare
        facebook.width = 9
        facebook.height = 18
        facebook.x = 20
        facebook.y = 115
        facebook.alpha = 0
        facebook.interactive = true
        facebook.buttonMode = true

        facebook.on("pointerdown", function () {
            window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbiasonline.ie', '_blank', 'width=626,height=436');
        });
        this.addChild(facebook)




        

        
    }

    joinSession(){
        this.joinModalWidgetGroup.contentContainer.alpha = 0
        this.joinModal.alpha = 0
        this.removeChild(this.joinModal)
        
    }


    

    leaveSession(){
        this.joinModalWidgetGroup.contentContainer.alpha = 1
        this.joinModal.alpha = 1
        this.addChild(this.joinModal)
    }

    getText() {
        return this.nameFieldInput.value;
    }

    clearText() {
        this.nameFieldInput.value = ""
        this.nameFieldInput.blur()
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

    hideArt(art){
        //let hideTheArt = this.showingArt
        setTimeout(function(){
            this.showingArt = false
        }, 1000)
        
    }
    

    showArt(art) {
        const artNumber = art.slice(-1)
        let link
        if(artNumber == 1) {
            link = "https://stealingurfeelin.gs/"
        } else if (artNumber == 2) {
            link = "https://darkmatters.ml/"
        } else if (artNumber == 3) {
            link = "https://normalizi.ng/"
        } else if (artNumber == 4) {
            link = "https://www.youtube.com/embed/Kz97PpPFF78"
        }
        if(!document.getElementById("iframe")) {
            if(this.showingArt == false) {

                this.iframe = document.createElement('iframe');
                this.iframe.src = link
                this.iframe.style = "position:absolute;top:50%;left:50%;transform:translateX(-50%)translateY(-50%);border:0;z-index:3"
                if (artNumber == 3) {
                    this.iframe.style = "position:absolute;top:50%;left:50%;transform:translateX(-50%)translateY(-50%);border:0;width:414px;height:789px;z-index:3"
                }
                if (artNumber == 4) {
                    this.iframe.frameborder="0" 
                }
                this.iframe.allow = "camera"
                this.iframe.id = "iframe"
                this.iframe.allowfullscreen = "allowfullscreen"
                this.iframe.width = window.innerWidth
                this.iframe.height = window.innerHeight
                document.body.appendChild(this.iframe);
                this.showingArt = true;
                console.log(this.showingArt)
                var close = document.createElement('div');
                close.id = "back-to-bias"
                var backTo = document.createTextNode('← Back to ')
                var biasOnline = document.createTextNode('BIAS ONLINE')
                var bold = document.createElement('span');
                bold.appendChild(biasOnline)
                bold.style = "font-weight:900;cursor:pointer;";
                close.style = "position:absolute;top:0;width:100%;padding:10px 20px;background-color:#000000;font-size:18px;color:#4DFA66;width:100%;z-index:4"
                close.appendChild(backTo)
                close.appendChild(bold)
                document.body.appendChild(close);
            }
        }
        
    }

    showQuote(quote) {
    
        let quoteNumber = quote.slice(-1)
        console.log(quoteNumber)
        //console.log(quote)
        //let showingQuote = false//;
        //
        if(this.showingQuote == false) {
            if(this.quoteWrapper.contentContainer.alpha <= 0) {
                this.addChild(this.quoteStage)
                this.quoteStage.resize(window.innerWidth, window.innerHeight)
            
                //console.log(this.textContent.text)
                //console.log(this.connectedText.text)
                //console.log(this.quotesToShow[quoteNumber].paragraph)
                this.scrollContent.forcePctPosition('y', 0)

                //console.log(this.scrollContent)
                //this.scrollContent.hideScrollBars()

                //this.textContent.text = this.quotesToShow[quoteNumber].paragraph
                this.title.text = this.quotesToShow[quoteNumber].title
                let continutedText = '';
                if(this.quotesToShow[quoteNumber].subtitle.length) {
                    continutedText += "<subtitle>" + this.quotesToShow[quoteNumber].subtitle + "</subtitle>\n"
                }
                if(this.quotesToShow[quoteNumber].paragraph.length) {
                    continutedText +=  "" + this.quotesToShow[quoteNumber].paragraph + "\n"
                }
                if(this.quotesToShow[quoteNumber].credit.length) {
                    continutedText +=  "<small>" + this.quotesToShow[quoteNumber].credit + "</small>"
                }
                this.connectedText.text = continutedText

                const scrollContentScrollBars = this.scrollContent
                
                //this.connectedText.text = this.quotesToShow[quoteNumber].paragraph

                //this.textContent.contentContainer.children[1].updateText()
                let height = this.textContent.contentContainer.height
                let width = this.connectedText.getStyleForTag("default").wordWrap
                console.log(width)
                console.log(this.connectedText)
                console.log('Text height UI Builder:' + height)

                if(height <= 80) {
                    height = 0.3
                } else if (height <= 250) {
                    height = 0.4
                    //scrollContentScrollBars.showScrollBars()
                } else if (height <= 400) {
                    height = 0.5
                    //scrollContentScrollBars.showScrollBars()
                } else {
                    height = 0.85
                    //scrollContentScrollBars.showScrollBars()
                }

                
                this.quoteWrapper.setLayoutOptions(
                    new PUXI.FastLayoutOptions({
                        width: 0.9,
                        height: height,
                        x: 0.5,
                        y: 0.45,
                        anchor: new PIXI.Point(0.5, 0.5)          
                    })
                )
                this.quoteWrapperBackground.clear()
                this.quoteWrapperBackground = new PIXI.Graphics()
                this.quoteWrapperBackground.beginFill(0xFFFFFF)
                this.quoteWrapperBackground.lineStyle(1, 0x000000)
                this.quoteWrapperBackground.drawRoundedRect(0, 0, (window.innerWidth/100)*90, (window.innerHeight/100)*(height*100), 35)
                this.quoteWrapper.contentContainer.addChildAt(this.quoteWrapperBackground,0)

                this.quoteStage.resize(window.innerWidth, window.innerHeight)
                const quoteBounds = this.quoteWrapperBackground.getBounds()
                this.quoteStage.stage.hitArea = new PIXI.Rectangle(
                    quoteBounds.x,
                    quoteBounds.y,
                    quoteBounds.width,
                    quoteBounds.height
                );

                window.dispatchEvent(new Event('resize'));

                ease.add(this.quoteWrapper.contentContainer, this.fadeInStyles, this.fadeInSettings)
                this.showingQuote = true
                
            }
        }

    }


    closeModal() {
        ease.add(this.quoteWrapper.contentContainer, this.fadeOutStyles, this.fadeOutSettings)
        const quoteStage = this.quoteStage
        const theUI = this
        const showingQuote = this.showingQuote
        
        setTimeout(function(){
            theUI.removeChild(quoteStage)
            theUI.setShowingQuote()
        }, 500)
        
    }

    setShowingQuote(){
        this.showingQuote = false
    }


    personLeft(name) {
        var joinText = "<reddot>●</reddot> <hi>"+ name +"</hi> left"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        //console.log(textBox.y)
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }
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
                    this.talkingScoreTextBackground.tint = 0xFFFF00
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
                background.tint = 0xFFFF00
                setTimeout(function(){
                    background.tint = 0xFFFFFF
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.talkingScore.isComplete = true
                    setTimeout(function(){
                        background.tint = 0xFFFF00
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
                background.tint = 0xFFFF00
                setTimeout(function(){
                    background.tint = 0xFFFFFF
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.robotScore.isComplete = true
                    setTimeout(function(){
                        background.tint = 0xFFFF00
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
                background.tint = 0xFFFF00
                setTimeout(function(){
                    background.tint = 0xFFFFFF
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.dialScore.isComplete = true
                    setTimeout(function(){
                        background.tint = 0xFFFF00
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
                background.tint = 0xFFFF00
                setTimeout(function(){
                    background.tint = 0xFFFFFF
                }, 250)
                if(newScore == 10) {
                    score.x = 16
                    this.faceScore.isComplete = true
                    setTimeout(function(){
                        background.tint = 0xFFFF00
                    }, 250)
                   
                }
            }
            
        }
        
    }

    personJoined(name) {
        var joinText = "<whitedot>—</whitedot> <hi>"+ name +"</hi> joined ❤️"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        console.log(textBox.y)
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }
    }

    joinInstance(name, id) {
        var joinText = "<greendot>●</greendot> <b>Connected to Instance</b> <p>(ID: "+ id +")</p>"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        console.log(textBox.y)
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }
    }

    updateConnection(value, boolean){

        if(boolean == true) {
            var connectedText = new TaggedText("<bluedot>●</bluedot> <b>Connected to Server</b> <y>["+value.text+"]</y>", {
                "default": {
                    fontFamily: "Iosevka",
                    fontSize: "11px",
                    fill: "#efefef",
                    align: "left"
                },
                "bluedot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: "#0000ff"
                },
                "greendot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: "#00ff00"
                },
                "whitedot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: "#FFFFFF"
                },
                "reddot": {
                    fontFamily: "Monaco",
                    fontSize: "15px",
                    fill: "#FF00000"
                },
                "b": {
                    fontWeight: 700
                },
                "y": {
                    fill: "#FFFF00"
                },
                "p": {
                    fill: "#FF1493"
                },
                "hi": {
                    fill: "#ffffff",
                    fontWeight: 700,
                    textDecoration: "underline"
                }
            });
            this.statusLayout.contentContainer.addChild(connectedText);

        } else {
            this.statusLayout.contentContainer.removeChildAt(1);
            var connectedText = new TaggedText("<dot>●</dot> Disconnected from Server.", {
                "default": {
                    fontFamily: "Monaco",
                    fontSize: "10px",
                    fill: "#000000",
                    align: "left"
                },
                "dot": {
                    fontSize: "15px",
                    fill: "#ff0000"
                }
            });
            this.statusLayout.contentContainer.addChild(connectedText);

        }
        
    }
    

    resizeText() {
        
        const width = window.innerWidth

        
            

        if(width <= 414) {
            this.scoreStage.scale.set(0.6, 0.6);
            this.scoreStage.x = 150
            this.scoreStage.y = -5
            this.statusStage.visible = false
            this.worldInfo.visible = false
            this.scrollWrapper.setPadding(25)
        } else if (width <= 736) {
            this.statusStage.visible = false
            this.worldInfo.visible = false
            this.scoreStage.scale.set(0.75, 0.75);
            this.scoreStage.x = 130
            this.scrollWrapper.setPadding(30)
        } else {
            //this.statusStage.visible = true
            //this.worldInfo.visible = false
            //this.scoreStage.visible = true
            this.scoreStage.scale.set(1, 1)
            this.scoreStage.x = 0
            this.scrollWrapper.setPadding(50)
           
        }


        //this.scrollWrapper

        if(width <= 320) {
            this.quoteWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.9,
                    height: 0.8,
                    x: 0.5,
                    y: 0.45,
                    anchor: new PIXI.Point(0.5, 0.5)
                })
            )
            
            this.title.contentContainer.children[0].style.fontSize = 16
            this.title.contentContainer.children[0].x = 25
            this.title.contentContainer.children[0].y = 30


            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                wordWrap: true,
                lineHeight: 16,
                padding: 10,
                wordWrapWidth: 220,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("small", {
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                wordWrap: true,
                lineHeight: 16,
                padding: 10,
                wordWrapWidth: 220,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("bold", {
                fontFamily: "Trade Gothic Next",
                fontSize: "13px",
                fontWeight: 700,
                lineHeight: 16,
            })
            

            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.970,
                    y: 40,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )

        } else if (width <= 375) {

            this.quoteWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.9,
                    height: 0.8,
                    x: 0.5,
                    y: 0.45,
                    anchor: new PIXI.Point(0.5, 0.5)
                })
            )
            //this.title.contentContainer.children[0].style.fontSize = 20
            //this.title.contentContainer.children[0].x = 25
            //this.title.contentContainer.children[0].y = 30

            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "14px",
                wordWrap: true,
                lineHeight: 17,
                padding: 10,
                wordWrapWidth: 250,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("small", {
                fontFamily: "Trade Gothic Next",
                fontSize: "14px",
                wordWrap: true,
                lineHeight: 17,
                padding: 10,
                wordWrapWidth: 250,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("bold", {
                fontFamily: "Trade Gothic Next",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: 17,
            })

            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.970,
                    y: 40,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )

        } else if (width <= 414) {


            //this.title.contentContainer.children[0].style.fontSize = 20
            //this.title.contentContainer.children[0].x = 25
            //this.title.contentContainer.children[0].y = 30
            

            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "15px",
                wordWrap: true,
                lineHeight: 19,
                padding: 10,
                wordWrapWidth: 270,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("small", {
                fontFamily: "Trade Gothic Next",
                fontSize: "15px",
                wordWrap: true,
                lineHeight: 19,
                padding: 10,
                wordWrapWidth: 270,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("bold", {
                fontFamily: "Trade Gothic Next",
                fontSize: "15px",
                fontWeight: 700,
                lineHeight: 19,
            })


           

            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.970,
                    y: 40,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )
        }  else if (width <= 500) {


            //this.title.contentContainer.children[0].style.fontSize = 20
            //this.title.contentContainer.children[0].x = 25
            //this.title.contentContainer.children[0].y = 30
            
            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "16px",
                wordWrap: true,
                lineHeight: 20,
                padding: 10,
                wordWrapWidth: 320,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("small", {
                fontFamily: "Trade Gothic Next",
                fontSize: "16px",
                wordWrap: true,
                lineHeight: 20,
                padding: 10,
                wordWrapWidth: 320,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("bold", {
                fontFamily: "Trade Gothic Next",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: 20,
            })


            //this.textContent.contentContainer.children[1].updateText()
            this.quoteWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.9,
                    height: 0.8,
                    x: 0.5,
                    y: 0.45,
                    anchor: new PIXI.Point(0.5, 0.5)
                })
            )
            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.970,
                    y: 40,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )
        } else {

            this.connectedText.setStyleForTag("default", {
                fontFamily: "Trade Gothic Next",
                fontSize: "32px",
                wordWrap: true,
                lineHeight: 40,
                padding: 10,
                wordWrapWidth: 800,
                textBaseline: "middle"
            })
            this.connectedText.setStyleForTag("bold", {
                fontFamily: "Trade Gothic Next",
                fontSize: "32px",
                fontWeight: 700,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("subtitle", {
                fontFamily: "Trade Gothic Next",
                fontSize: "32px",
                wordWrap: true,
                lineHeight: 55,
                padding: 10,
                wordWrapWidth: 800,
                leading: 1,
                textBaseline: "middle"
            })

            this.connectedText.setStyleForTag("small", {
                fontFamily: "Trade Gothic Next",
                fontSize: "20px",
                wordWrap: true,
                lineHeight: 27,
                padding: 10,
                wordWrapWidth: 450,
                leading: 1,
                textBaseline: "middle"
            })

           

            this.quoteWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 0.8,
                    height: 0.8,
                    x: 0.5,
                    y: 0.5,
                    anchor: new PIXI.Point(0.5, 0.5)
                })
            )
            this.leaveButtonWrapper.setLayoutOptions(
                new PUXI.FastLayoutOptions({
                    width: 40,
                    height: 40,
                    x: 0.967,
                    y: 50,
                    anchor: new PIXI.Point(0.5,0.5)
                }),
            )
        } 





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
            this.nameFieldInput.caret.lineStyle(1, 0x000000);
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
            this.nameFieldInput.caret.lineStyle(1, 0x000000);
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
        }






    }


 
    update(delta){
        this.count++

        this.avatarBox.contentContainer.rotation += 1 * delta;
        
    }


}

export default UIBuilder