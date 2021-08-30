import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import MultiStyleText from 'pixi-multistyle-text'
import TaggedText from 'pixi-tagged-text'
import { Ease, ease } from 'pixi-ease'
import { sound } from '@pixi/sound'
import { CRTFilter } from '@pixi/filter-crt'
import {GlowFilter} from '@pixi/filter-glow';

class UIBuilder extends PIXI.Container {
    constructor() {
        super()

        this.width  = window.innerWidth 
        this.height = window.innerHeight
        
        
        
        const colorBlack = PIXI.utils.string2hex("#292929"); //Black
        const colorGreen = PIXI.utils.string2hex("#4DFA66") //Green
        
        /* Intro Modal */
        
        
        const modalButtonColor = "#FF284D" //Red

        
        let modalFieldFontSize = 52
        let modalButtonFontSize = 64
        

        this.mobileBreakPoint = 500
        this.tabletBreakPoint = 960
        this.laptopBreakPoint = 1240

        this.modalTitleFontSize = 10

        

        let modalWidth = 0.9999
        let modalHeight = 0.9999;
        
        let modalRadius = 20
        



        const puxiCenter = PUXI.FastLayoutOptions.CENTER_ANCHOR;
        


        //Modal Stage
        this.joinModal = new PUXI.Stage(window.innerWidth, window.innerHeight)   
        
        //Modal Background
        const joinModalWrapper= new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.999999, 
                height: 0.99999,
            }),
        )
        .setBackground(colorGreen)
    
        
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

        const fadeInStyles = { y: 0, alpha: 1, }
        const fadeInSettings = { duration: 800, ease: 'easeOutExpo', wait: 500 }

        ease.add(this.joinModalWidgetGroup.contentContainer, fadeInStyles, fadeInSettings)
        
        //Whats your name
        const modalTitle = new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0,
                height: 0,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        ).setBackground(0xFFFFFF)

        this.textStyles = new PIXI.TextStyle({ 
            fontFamily: 'Trade Gothic Next',
            fill: colorBlack, 
            fontSize: 108,
            fontWeight: 900, 
        })

        this.nameFieldPlaceholder = new PUXI.TextWidget(
            'What’s your name?', 
            this.textStyles
        )
        this.nameFieldPlaceholder.contentContainer.children[0].anchor.set(0.5, 0.5);
        this.nameFieldPlaceholder.contentContainer.children[0].x = 0
        this.nameFieldPlaceholder.contentContainer.children[0].y = 0
        modalTitle.addChild(this.nameFieldPlaceholder)




        const fontLoader = new PIXI.Loader()
            fontLoader.add('HeadingFont', '/fonts/TradeGothicNextBold.fnt').load(() => {
            this.createText()
            this.resizeText()
                
        })




        
        //this.joinModalWidgetGroup.addChild(modalTitle)


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
            fontFamily: 'Trade Gothic',
            fill: "#000000", 
            fontSize: 18
        })
        //The Text Input
        this.nameFieldInput = new PUXI.TextInput({
            multiLine: false,
            value: "",
            padding: 10,
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
        
        inputBox.addChild(this.nameFieldInput)
        
        //Placeholder Text
        const nameFieldPlaceholder = new PUXI.TextWidget(
            'WHO ARE YOU?', 
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
            fontFamily: 'Trade Gothic',
            fill: "#FFFFFF", 
            fontSize: 16, 
            letterSpacing: 2
        })
        const joinText = new PUXI.TextWidget('JOIN', buttonStyles)
        joinText.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 35,
            height: 18,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        joinText.tint = 0x000000
        joinButtonWrapper.addChild(joinText)


        const buttonStylesTwo = new PIXI.TextStyle({ 
            fontFamily: 'Trade Gothic',
            fill: "#FFFFFF", 
            fontSize: 16, 
            letterSpacing: 2
        })
        const joinTextTwo = new PUXI.TextWidget('JOIN', buttonStylesTwo)
        joinTextTwo.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 55,
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
        
        joinButtonClick.onPress = function(){
            this.setBackground(0xff0000)
            joinText.alpha = 0
            joinTextTwo.alpha = 1
        }
        joinButtonClick.onClick = function(){
            this.setBackground(0xffffff)
            joinText.alpha = 1
            joinTextTwo.alpha = 0

            sound.add('login', 'audio/login.mp3');
            sound.play('login')
        }

        


        this.joinModal.addChild(joinModalWrapper)

        this.joinModalWidgetGroup.addChild(modalTitle)
        this.joinModalWidgetGroup.addChild(inputBox)
        this.joinModalWidgetGroup.addChild(joinButtonWrapper)
        
        this.joinModal.addChild(this.joinModalWidgetGroup)
        
        this.addChild(this.joinModal)







        








        // Chat Text Entry Element 
       /* this.textBox = new PUXI.Stage(window.innerWidth, 40)   
        
        this.textBox.alpha = 0
        this.textBox.y = window.innerHeight - 55

        this.textBoxWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 500,
                height: 40,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            }),
        )

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
            //style: textStyles,
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.999, 
                height: 40,
                x: 0,
                y: 0,
            }),
        )
        this.textBoxWrapper.addChild(this.mockInput);
        
        this.TextBoxPlaceholder = new PUXI.TextWidget(
            'TYPE TO SPEAK!', 
            //textStyles
        ).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                x: 10,
                y: 10,
            })
        )
        this.TextBoxPlaceholder.alpha = 0.4;
        this.textBoxWrapper.addChild(this.TextBoxPlaceholder);

        this.textBoxWrapper.widgetChildren[0].on('focus', () => { 
            this.TextBoxPlaceholder.alpha = 0;
        });
        this.textBoxWrapper.widgetChildren[0].on('blur', () => { 
            this.TextBoxPlaceholder.alpha = 0.4;
        });

        this.textBox.addChild(this.textBoxWrapper);
        this.addChild(this.textBox)
   

        */

       




        this.statusStage = new PUXI.Stage({
            width: 300,
            height: 100
        });

        this.statusWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 350,
                height: 200,
                x: 10,
                y: 0.995,
                anchor: new PIXI.Point(0, 1)
            }),
        ).setBackground(0xFFFFFF).setBackgroundAlpha(0.1)



        this.statusLayout = new PUXI.Widget({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                height: 0,
                width: 300,
                x: 0,
                y: 0.9,
                anchor: new PIXI.Point(0, 1)
            }),
        )
        this.statusWrapper.addChild(this.statusLayout)
        this.statusStage.addChild(this.statusWrapper)


        const mask = new PIXI.Graphics();
        mask.beginFill(0xFFFFFF)
        mask.drawRect(0, 0, 300, 200);
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

        this.emojiWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 260, 
                height: 50,
                x: 0.5,
                y: 0.965,
                anchor: new PIXI.Point(0.5, 0.5)
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
        const sadEmoji = new PIXI.Text("🙁", {fontSize: 28});
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
            height: 280,
            x: 0,
            y: 0
        })
        
        this.scoreWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 200, 
                height: 280,
                x: 0.99,
                y: 20,
                anchor: new PIXI.Point(1, 0)
            })
        )
        
        this.scoreWrapperBackground = new PIXI.Graphics()
        this.scoreWrapperBackground.beginFill(0xFFFFFF)
        this.scoreWrapperBackground.drawRoundedRect(0, 0, 200, 280, 25)
        this.scoreWrapperBackground.endFill()
        this.scoreWrapper.contentContainer.addChild(this.scoreWrapperBackground)
        
        this.johanScore = new PUXI.Widget({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 60,
                height: 50,
                x: 0,
                y: 0
            })
        ).setPadding(15, 10)
        this.johanScoreText = new PIXI.Text("0/10", {fontSize: 25});
        this.johanScore.contentContainer.addChild(this.johanScoreText)
        this.scoreWrapper.addChild(this.johanScore)
        this.johanScore.contentContainer.buttonMode = true
        this.johanScore.contentContainer.interactive = true
        
        
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



        const leaveTextTwo = new PUXI.TextWidget('LEAVE', buttonStylesTwo)
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

        
























        this.worldInfo = new PUXI.Stage({
            width: 200,
            height: 100,
            x: 0,
            y: 0
        })
        
        this.worldInfoWrapper = new PUXI.WidgetGroup({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 200, 
                height: 100,
                x: 0.985,
                y: 0.98,
                anchor: new PIXI.Point(1, 1)
            })
        ).setPadding(10)
        
        this.worldInfoBackground = new PIXI.Graphics()
        this.worldInfoBackground.beginFill(0xFFFFFF)
        this.worldInfoBackground.drawRoundedRect(0, 0, 200, 100, 15)
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
        this.numberOfPeople.y = 25
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




       







        window.addEventListener('resize', () => {
            this.resizeText()

            this.joinModal.resize(window.innerWidth, window.innerHeight)
            
            this.statusStage.resize(window.innerWidth, window.innerHeight)
            this.statusStage.stage.hitArea = new PIXI.Rectangle(0,0,0,0);

            this.emojiStage.resize(window.innerWidth, window.innerHeight)
            const bounds = this.emojiWrapperBackground.getBounds()
            this.emojiStage.stage.hitArea = new PIXI.Rectangle(
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height
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

            this.leaveGameStage.resize(window.innerWidth, window.innerHeight)
            const leaveGameBounds = this.leaveButtonWrapper.contentContainer.getBounds()
            this.leaveGameStage.stage.hitArea = new PIXI.Rectangle(
                leaveGameBounds.x,
                leaveGameBounds.y,
                leaveGameBounds.width,
                leaveGameBounds.height
            );


        })


        this.count = 0
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

    getMessageText() {
        if(this.joinModal.visible == true) {
            this.joinSession()
            return this.nameFieldInput.value;
            
        } else {
            return this.mockInput.value;
        }
    }

    clearMessageText() {
        if(!this.joinModal.visible == true) {
            if(this.mockInput.value != "<3") {
                this.mockInput.value = ""
                this.mockInput.blur()
            }
        }
    }

    updateWorldTime(time) {
        var currentWorldTime = new Date(time * 1000).toISOString().substr(14, 5)
        this.currentTime.text = currentWorldTime
    }

    updateTotalUsers(number) {
        this.totalNumberOfPeopleCounter.text = number
    }


    updateActiveUsers(number) {
        this.numberOfPeopleCounter.text = number
    }


    personLeft(name) {
        var joinText = "<reddot>●</reddot> <hi>"+ name +"</hi> Left"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        console.log(textBox.y)
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }
    }

    increaseScore() {
        var currentScore = Number(this.johanScoreText.text.slice(0,1))
        currentScore = currentScore + 1
        var newScore = currentScore + "/10";
        console.log(newScore)
        this.johanScoreText.text = newScore
    }

    personJoined(name) {
        var joinText = "<whitedot>●</whitedot> <hi>"+ name +"</hi> Joined the Gallery ❤️"
        var textBox = this.statusLayout.contentContainer.children[1];
        var currentText = textBox.text
        textBox.text = joinText + "\n" + currentText
        console.log(textBox.y)
        if(textBox.y > -180) {
            textBox.y = textBox.y - 18
        }
    }

    joinInstance(name, id) {
        var joinText = "<greendot>●</greendot> <b>Connected to Nengi Instance</b> <p>(ID: "+ id +")</p> as: <hi>"+ name +"</hi>"
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
        console.log(width)

        if(width <= 500) {
            this.nameFieldPlaceholder.contentContainer.children[0].style.fontSize = 30
        } else if (width <= 960) {
            this.nameFieldPlaceholder.contentContainer.children[0].style.fontSize = 50
        } else if (width <= 1240) {
            this.nameFieldPlaceholder.contentContainer.children[0].style.fontSize = 80
        } else {
            this.nameFieldPlaceholder.contentContainer.children[0].style.fontSize = 108
        }
    }

    createText() {
       /* this.text = new PIXI.BitmapText('Hello Bitmap Font', {
            font: '72px TradeGothicNextBold',
            align: 'center',
        })
        this.joinModalWidgetGroup.contentContainer.addChild(this.text)
        this.text.text = "yes"*/
    }
    
 
    update(){
        this.count++
        
        //console.log(this.statusStage.stage.hitArea)
        
    


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

        
