
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
        ).setBackground(black).setBackgroundAlpha(1);

        this.leaveButton = new PUXI.Button({
            text: ''
        }).setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 0.97,
            height: 0.95,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        .setBackground(whiteF)
        .setBackgroundAlpha(1)
        this.leaveButtonWrapper.addChild(this.leaveButton)
        this.leaveButton.on("hover", function (over) {
            if(over == true) {
                this.setBackground("#FFFF00")
            } else {
                this.setBackground(white)
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
        leaveText.tint = black
        this.leaveButtonWrapper.addChild(leaveText)



        const leaveTextTwo = new PUXI.TextWidget('LEAVE', buttonStyles)
        leaveTextTwo.setLayoutOptions(new PUXI.FastLayoutOptions({
            width: 50,
            height: 18,
            x: 0.5,
            y: 0.5,
            anchor: PUXI.FastLayoutOptions.CENTER_ANCHOR,
        }))
        leaveTextTwo.tint = white
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
*//*const fontStyle = {
            fontFamily: 'Trade Gothic Next',
            fill: 0x000000, 
            fontSize: 139,
            fontWeight: 900
        }

        if(state.floorColor  == '#FFE401') {

            const firstName = "NOAH"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 298
            firstNameText.y = 63
            this.addChild(firstNameText)

            const lastName = "LEVENSON"
            const lastNameText = new PIXI.Text(lastName, fontStyle);
            lastNameText.x = 125
            lastNameText.y = 763
            this.addChild(lastNameText)

        } else if (state.floorColor == "#471A8E") {

            const firstName = "JOHANN DIEDRICK"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 298
            firstNameText.y = 63
            this.addChild(firstNameText)

        } else if (state.floorColor == "#505050") {

            const firstName = "MUSHON"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 98
            firstNameText.y = 563
            this.addChild(firstNameText)

            const lastName = "ZER-AVIV"
            const lastNameText = new PIXI.Text(lastName, fontStyle);
            lastNameText.x = 95
            lastNameText.y = 763
            this.addChild(lastNameText)

        } else if (state.floorColor == "#80EDFF") {


            const firstName = "LIBBY HEANEY"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 98
            firstNameText.y = 563
            this.addChild(firstNameText)


        }*/