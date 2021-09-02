import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import MultiStyleText from 'pixi-multistyle-text'
import TaggedText from 'pixi-tagged-text'
import { Ease, ease } from 'pixi-ease'
import { sound } from '@pixi/sound'
import { CRTFilter } from '@pixi/filter-crt'

import { GlowFilter } from '@pixi/filter-glow';

import {DropShadowFilter} from '@pixi/filter-drop-shadow';


class UIBuilder extends PIXI.Container {
    constructor(renderer) {
        super()

        this.width  = window.innerWidth 
        this.height = window.innerHeight
        this.nameGiven = false
        
        
        const colorBlack = PIXI.utils.string2hex("#292929"); //Black
        const colorGreen = PIXI.utils.string2hex("#4DFA66") //Green

        const fadeInStyles = { y: 0, alpha: 1, }
        const fadeInSettings = { duration: 800, ease: 'easeOutExpo', wait: 500 }
        
        /* Intro Modal */
        
        
        const modalButtonColor = "#FF284D" //Red

        
        let modalFieldFontSize = 52
        let modalButtonFontSize = 64
        

        this.mobileBreakPoint = 500
        this.tabletBreakPoint = 960
        this.laptopBreakPoint = 1240



        

        let modalWidth = 0.9999
        let modalHeight = 0.9999;
        
        let modalRadius = 20
        



        const puxiCenter = PUXI.FastLayoutOptions.CENTER_ANCHOR;

        






        




       




        


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
        ).setBackground(0x000000).setBackgroundAlpha(0.3)


        this.statusLayout = new PUXI.Widget({}).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                height: 0,
                width: 300,
                x: 5,
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
        





        // Chat Text Entry Element 
        this.textBox = new PUXI.Stage({
            width: 350,
            height: 50,
            x: 0,
            y: 0
        })
        
        this.textBox.alpha = 1

        this.textBoxWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 350,
                height: 50,
                x: 0.40,
                y: 0.98,
                anchor: new PIXI.Point(0.5, 1)
            }),
        )

        this.textBoxWrapperBackground = new PIXI.Graphics()
        this.textBoxWrapperBackground.lineStyle(1.5, 0x000000, 1, 1, false)
        this.textBoxWrapperBackground.beginFill(0xFFFFFF)
        this.textBoxWrapperBackground.drawRoundedRect(0, 0, 350, 50, 25)
        this.textBoxWrapperBackground.endFill()
        this.textBoxWrapperBackground.moveTo(350, 23)
        this.textBoxWrapperBackground.lineTo(350, 30)
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
                height: 50,
                x: 5,
                y: 0,
            }),
        )
        this.textBoxWrapper.addChild(this.mockInput);
        
        this.TextBoxPlaceholder = new PUXI.TextWidget(
            'Type Here', 
            textInputStyles
        ).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                x: 15,
                y: 10,
            })
        )
        this.TextBoxPlaceholder.alpha = 0;
        ease.add(this.TextBoxPlaceholder, fadeInStyles, fadeInSettings)
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
   



















        this.worldInfo = new PUXI.Stage({
            width: 200,
            height: 63,
            x: 0,
            y: 0
        })
        
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
















        let quoteWidth = 0.8
        let quoteWidthBackground = (window.innerWidth/100)*80

        this.quoteStage = new PUXI.Stage(window.innerWidth, window.innerHeight);
        this.quoteWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: quoteWidth,
                height: 0.8,
                x: 0.5,
                y: 0.5,
                anchor: new PIXI.Point(0.5, 0.5)
            }),
        ).setBackground(0xFFFFFF).setBackgroundAlpha(0.1)
        this.quoteWrapperBackground = new PIXI.Graphics()
        this.quoteWrapperBackground.beginFill(0xFFFFFF)   
        this.quoteWrapperBackground.drawRoundedRect(
            0, 0, quoteWidthBackground, (window.innerHeight/100)*80, 40
        )
        this.quoteWrapper.contentContainer.addChild(this.quoteWrapperBackground)

        this.quoteWrapperClose = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: quoteWidth,
                height: 0.8,
                x: 0.5,
                y: 0.5,
                anchor: new PIXI.Point(0.5, 0.5)
            }),
        ).useLayout(new PUXI.AnchorLayout());

       


        this.scrollWrapper = new PUXI.WidgetGroup({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.999,
                height: 0.999,
                x: 0.5,
                y: 0.5,
                anchor: new PIXI.Point(0.5, 0.5)
            }),
        ).setPadding(50)



        this.scrollContent = new PUXI.ScrollWidget({
            scrollY: true,
            scrollX: false,
            scrollBars: true,
            dragScrolling: true,
            softness: 1,
            expandMask: 0,
            overflowY: 0,
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 0.9999,
                height: 0.999,
                x: 0.5,
                y: 0.5,
                anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
            })
        ).setPadding(0, 50, 0, 0)
        this.scrollWrapper.addChild(this.scrollContent);
        this.quoteWrapper.addChild(this.scrollWrapper);

        const style = new PIXI.TextStyle({
            fontFamily: "Trade Gothic Next",
            fontSize: 32,
            breakWords: true,
            fontWeight: 300,
            lineHeight: 45,
            whiteSpace: "pre",
            wordWrap: true,
            wordWrapWidth: 1000,
            leading: 1
        });

        const styleHeading = new PIXI.TextStyle({
            fontFamily: "Trade Gothic Next",
            fontSize: 32,
            breakWords: true,
            fontWeight: 700,
            lineHeight: 32,
            whiteSpace: "pre",
            letterSpacing: 1,
            wordWrap: true,
            wordWrapWidth: 600,
            leading: 1
        });

        
        const text = "Squeaky Wheel is excited to present a public beta of Johann Diedrick’s Dark Matters, an interactive web experience, exhibition in Squeaky Wheel’s window gallery, and series of events\n\nDark Matters exposes the absence of Black speech in the datasets used to train voice interface systems in consumer artificial intelligence products such as Alexa and Siri. Utilizing 3D modeling, sound, and storytelling, the project challenges our communities to grapple with racism and inequity through speech and the spoken word, and how AI systems underserve Black communities.\n\nA video installation version of Dark Matters will be on view 24/7 for free at Squeaky Wheel’s window gallery in downtown Buffalo. An iterative online version will be available on our website June 18–September 10, 2021, which the artist intends to present as a way to receive feedback from the public on the work’s development. An outdoor soft opening will take place at Squeaky Wheel’s storefront space on Friday, June 18, between 4–6 pm, with in-person remarks by Curator Ekrem Serdar at 5 pm, and a virtual artist talk and public Q&A with the artist at 7 pm ET.";

        this.textContent = new PUXI.TextWidget(text, style)
        this.textContent.alpha = 0

        

        const title = "SQUEEKY WHEEL";
        this.title = new PUXI.TextWidget(title, styleHeading)
        this.title.alpha = 0
        this.title.contentContainer.children[0].x = 50
        this.title.contentContainer.children[0].y = 45



        this.closeIcon = new PUXI.Button({
            text: '✕'
        }).setLayoutOptions(new PUXI.AnchorLayoutOptions({
            anchorLeft: 0.9999,
            anchorTop: 30,
            anchorRight: 115,
            anchorBottom: 0.9
          }))
        
        this.closeIcon.contentContainer.x = 15
        this.closeIcon.contentContainer.interactive = true;
        this.closeIcon.contentContainer.buttonMode = true;
        this.closeIcon.contentContainer.cursor = "pointer";

        this.closeModal = new PUXI.ClickManager(this.closeIcon, true, false, false)
        
        this.closeModal.onClick(function(){
            console.log('tester')
            this.parent.parent.visible = false
        })


        let textContainer = this.textContent
        let textTitle = this.title

        setTimeout(function(){
            textContainer.alpha = 1
            textTitle.alpha = 1
        }, 1000)


        this.scrollContent.addChild(this.textContent)
        this.quoteWrapperClose.addChild(this.closeIcon)

        this.quoteWrapper.addChild(this.title)
        
        this.quoteStage.addChild(this.quoteWrapper)
        this.quoteStage.addChild(this.quoteWrapperClose)

        this.addChild(this.quoteStage)
        this.quoteStage.visible = false

        this.quoteStage.resize(window.innerWidth, window.innerHeight)





















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


        
        //Logo Wrapper + Logo
        const logoBox = new PUXI.Widget({
        }).setLayoutOptions(
            new PUXI.FastLayoutOptions({
                width: 520,
                height: 86,
                x: 20,
                y: 10,
                anchor: new PIXI.Point(0,0)
            }),
        )
        const scienceGalleryLogo = PIXI.Sprite.from('images/sg.svg');
        scienceGalleryLogo.width = 88
        scienceGalleryLogo.height = 42.5
        logoBox.contentContainer.addChild(scienceGalleryLogo)
        const trinityLogo = PIXI.Sprite.from('images/trinity.svg');
        trinityLogo.width = 160
        trinityLogo.height = 42.5
        trinityLogo.x = 100
        trinityLogo.y = 3
        logoBox.contentContainer.addChild(trinityLogo)
        this.joinModal.addChild(logoBox)
        


        


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



        ease.add(this.joinModalWidgetGroup.contentContainer, fadeInStyles, fadeInSettings)
        




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
                const personName = theUI.getText()
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
                const matrix = new PIXI.Matrix();
                matrix.tx = -bounds.x;
                matrix.ty = -bounds.y;

                const renderTexture = PIXI.RenderTexture.create( bounds.width, bounds.height, PIXI.settings.SCALE_MODE.NEAREST, 2 );
                renderer.render(container, renderTexture, true, matrix, false);
                
                PIXI.BaseTexture.addToCache( renderTexture.baseTexture, 'curvedText' );
                PIXI.Texture.addToCache( renderTexture, 'curvedText' );
                
                const sprite = PIXI.Sprite.from('curvedText');

                var moveBack = sprite.width / 5
                sprite.y = -26
                sprite.x = -moveBack
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

        setTimeout(function(){

            theUI.resizeText()
            joinModal.resize(window.innerWidth, window.innerHeight)

        }, 500)

        window.addEventListener('resize', () => {
            
            this.resizeText()
            
            this.drawGridBackground(window.innerWidth, window.innerHeight)

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
            let quoteWidthBackground = (window.innerWidth/100)*80

            this.quoteWrapperBackground.clear()
            this.quoteWrapperBackground = new PIXI.Graphics()
            this.quoteWrapperBackground.beginFill(0xFFFFFF)        
            this.quoteWrapperBackground.drawRoundedRect(0, 0, quoteWidthBackground, (window.innerHeight/100)*80, 50)
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
        this.quoteStage.visible = false
        return this.mockInput.value;
    }

    clearMessageText() {
        this.mockInput.value = ""
        this.mockInput.blur()
        this.mockInput.focus()
    }

    updateWorldTime(time) {
       var currentWorldTime = new Date(time * 1000).toISOString().substr(11, 8)
       //console.log(currentWorldTime)
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
        if(currentScore == 9) {
            this.quoteStage.visible = true
        }
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

        if(width <= 680) {
            this.statusStage.visible = false
            this.worldInfo.visible = false
            this.scoreStage.visible = false
        } else {
            this.statusStage.visible = true
            this.worldInfo.visible = true
            this.scoreStage.visible = true
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

        //console.log(this.avatarBox.contentContainer)
        this.avatarBox.contentContainer.rotation += 1 * delta;
        //console.log(this.avatarBox)
        
        if(this.filters) {
            //this.filters[0].seed = Math.random()
        }
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

        
