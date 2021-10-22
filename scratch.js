
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
        /*if(state.name == "easternEyeBuilding") {
                const texture = PIXI.Texture.from('images/clouds-pattern.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                this.body.addChild(tilingSprite)

            } else if (state.name == "northernFlowerBuildingTwo") {
                const texture = PIXI.Texture.from('images/memphis-2.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                //tilingSprite.tileScale = new PIXI.Point(0.5, 0.5)
                this.body.addChild(tilingSprite)

            } else if (state.name == "northernFlowerBuilding") {
                const texture = PIXI.Texture.from('images/flower-pattern.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                tilingSprite.tilePosition = new PIXI.Point(-50, -55)
                this.body.addChild(tilingSprite)

            } else if (state.name == "easternEyeBuildingTwo") {
                const texture = PIXI.Texture.from('images/pink-sprinkles.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                tilingSprite.tilePosition = new PIXI.Point(-50, -55)
                this.body.addChild(tilingSprite)

            }*/

            /*if(state.name == "circleBuilding") {

            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.drawCircle(0, 0, state.width)
            this.body.endFill()


        } else if (state.name == "crystal") {
            
            this.body = new PIXI.Graphics()

            this.body.beginFill(0xf1c40f); 
            this.body.lineStyle(1, 0x000000)
            this.body.drawPolygon([ 0, 0, 
                                    -100, -100, 
                                    -100, -400,
                                    0, -500,
                                    100, -400,
                                    100, -100,
                                    ]);

            this.body.endFill();

            this.body.pivot.x = 0;
            this.body.pivot.y = 0;  

          if(state.name == "circleBuilding") {

            this.collider = CollisionSystem.createCircleCollider(state.x, state.y, state.width/2)

        } else if (state.name == "crystal") {
           
            const vectors = []
            const points = [[0,0],[-100,-100],[-100,-400],[0,-500],[100,-400],[100,-100]]

            points.forEach(point => {
                vectors.push(new SAT.Vector( point[0], point[1] ))
            })
            
            this.collider = CollisionSystem.createPolygonCollider(state.x, state.y, vectors)
            
            const pi = Math.PI
            let degrees = this.angle * (pi/180)
            this.collider.polygon.rotate(degrees)

        } else {
            this.collider = CollisionSystem.createRectangleCollider(state.x, state.y, state.width, state.height)
        }

        */


        /*
        

 
      

        const easternEyeBuildingTwo = new Obstacle({ 
            name: "easternEyeBuildingTwo",
            x: 1430, 
            y: 775, 
            width: 570, 
            height: 450, 
            border: "",
            color: "#FF33FF"
        })
        this.instance.addEntity(easternEyeBuildingTwo)
        obstacles.set(easternEyeBuildingTwo.nid, easternEyeBuildingTwo)










         //LONG TRIANGLE PATTERNSED OBSTACLE SOUTH OF RECEPTION
         const northernFlowerBuilding = new Obstacle({ 
            name: "northernFlowerBuilding",
            x: 775, 
            y: 0, 
            width: 450, 
            height: 675, 
            border: "",
            color: "#1DCFFF"
        })
        this.instance.addEntity(northernFlowerBuilding)
        obstacles.set(northernFlowerBuilding.nid, northernFlowerBuilding)



        const northernFlowerBuildingTwo = new Obstacle({ 
            name: "northernFlowerBuildingTwo",
            x: 775, 
            y: 1320, 
            width: 450, 
            height: 600, 
            border: "",
            color: "#FF0000"
        })
        this.instance.addEntity(northernFlowerBuildingTwo)
        obstacles.set(northernFlowerBuildingTwo.nid, northernFlowerBuildingTwo)

*/



       /* const crystal = new Obstacle({ 
            name: "crystal",
            x: 300, 
            y: 500, 
            width: 200, 
            height: 500, 
            color: "#FF0000",
            rotation: 0,
            angle: 0
            //shape: 
        })
        this.instance.addEntity(crystal)
        obstacles.set(crystal.nid, crystal)

        const crystalTwo = new Obstacle({ 
            name: "crystal",
            x: 50, 
            y: 250, 
            width: 200, 
            height: 500, 
            color: "#FF0000",
            rotation: 0,
            angle: 90
            //shape: 
        })
        this.instance.addEntity(crystalTwo)
        obstacles.set(crystalTwo.nid, crystalTwo)*/
/*
*/
        
        /*this.room2 = {
            x: 2100,
            y: 0,
            name: "Noah",
            width: 1000,
            height: 1000,
            backgroundColor: "#ffff00",
            color: "#FFE401",
            borderColor: "#FFFFFF",
            floorColor: "#FFE401",
            wallColor: "#ffff00",
            gridColor: "#454545",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 200,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote5",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 800,
                y: 500,
                width: 100, 
                height: 100, 
                color: "art1",
                mass: 0
            },{
                name: "token",
                type: "video",
                x: 500,
                y: 500,
                width: 177, 
                height: 315, 
                color: "#0000ff",
                mass: 2
            }],
            portals: [{
                name: "Main Lobby",
                x: 475,
                y: 50,
                width: 100,
                height: 10,
                exit: [1000, 1000]
            }]
        }
        this.floors2 = setupFloors(this.instance, this.room2)


        this.room3 = {
            x: 0,
            y: 2100,
            name: "Johann",
            width: 2000,
            height: 800,
            floorColor: "#471A8E",
            wallColor: "#9C52FF",
            gridColor: "#454545",
            backgroundColor: "#9C52FF",
            color: "#471A8E",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 700,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote6",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 1650,
                y: 500,
                width: 150, 
                height: 150, 
                color: "art2",
                mass: 0
            },{
                name: "token",
                type: "video",
                x: 1100,
                y: 600,
                width: 354, 
                height: 630, 
                color: "#00ffff",
                mass: 0
            }],
            portals: [{
                name: "Main Lobby",
                x: 0,
                y: 600,
                width: 10,
                height: 100,
                exit: [1000, 1000]
            }]
        }
        this.floors3 = setupFloors(this.instance, this.room3)



        this.room4 = {
            x: 2100,
            y: 1100,
            name: "Mushon",
            width: 800,
            height: 1500,
            floorColor: "#505050",
            wallColor: "#292929",
            gridColor: "#454545",
            backgroundColor: "#292929",
            color: "#505050",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 700,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote5",
                mass: 0
            },{
                name: "token",
                type: "quote",
                x: 650,
                y: 1300,
                width: 40, 
                height: 40, 
                color: "quote6",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 400,
                y: 300,
                width: 200, 
                height: 200, 
                color: "art3",
                mass: 0
            },{
                name: "token",
                type: "video",
                x: 250,
                y: 1350,
                width: 354, 
                height: 630, 
                color: "#505050",
                mass: 0
            }],
            portals: [{
                name: "Main Lobby",
                x: 0,
                y: 600,
                width: 10,
                height: 100,
                exit: [1000, 1000]
            }]
        }
        this.floors4 = setupFloors(this.instance, this.room4)

 if(door == "bottom") {

        const bottomWallLeft = new Obstacle({ 
            x: roomX - borderWidth, 
            y: roomHeight + roomY, 
            width: (roomWidth/2) - 95, 
            height: borderWidth, 
            border: borderWidth,
            color: backgroundColor
        })
        instance.addEntity(bottomWallLeft)
        obstacles.set(bottomWallLeft.nid, bottomWallLeft)


        const bottomWallRight = new Obstacle({ 
            x: roomX + (roomWidth/2) + 100, 
            y: roomHeight + roomY, 
            width: (roomWidth/2) - 95, 
            height: borderWidth, 
            border: borderWidth,
            color: backgroundColor
        })
        instance.addEntity(bottomWallRight)
        obstacles.set(bottomWallRight.nid, bottomWallRight)

    } else {
        if(type != "corridor") {
            
          
        }

    }
   
    onPointerDown(){
        if(this.videoTexture.baseTexture.resource.source.muted) {
            this.videoTexture.baseTexture.resource.source.muted = false
        } else if (this.videoTexture.baseTexture.resource.source.paused && !this.videoTexture.baseTexture.resource.source.muted) {
            this.videoTexture.baseTexture.resource.source.play()
        } else {
            this.videoTexture.baseTexture.resource.source.muted = true
            this.videoTexture.baseTexture.resource.source.pause()
        }

        async function startCall(target) {
    if (!peer) return;
    const call = peer.call(target, await getAudioStream());
    receiveCall(call);
}

// play the stream from the call in a video element
function receiveCall(call) {
    call.on('stream', stream => {
    // stream.noiseSuppression = true;
    const player = players.find(p => p.id === call.peer);
    if (!player) {
        console.log('couldn\'t find player for stream', call.peer);
    } else {
        player.stream = new StreamSplit(stream, {left: 1, right: 1});
        playAudioStream(stream, call.peer);
        log('created stream for', call.peer);
    }
     playAudioStream(stream, call.peer);
    });
}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}
    }


    if(this.color == "art2") {
            if(this.sprite_animation){
                this.body.scale.x -= 0.01;
                if(this.body.scale.x < 0 ){
                    this.sprite_animation = false; 
                }
            }else{
                this.body.scale.x += 0.01;
                if(this.body.scale.x > 1 ){
                    this.sprite_animation = true;
                }
    
            }
    
        }

        
        this.room5 = {
            x: 3200,
            y: 0,
            name: "Libby",
            width: 1500,
            height: 1500,
            floorColor: "#80EDFF",
            wallColor: "#1DCFFF",
            gridColor: "#000000",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 700,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote5",
                mass: 0
            },{
                name: "token",
                type: "quote",
                x: 650,
                y: 1300,
                width: 40, 
                height: 40, 
                color: "quote4",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 400,
                y: 300,
                width: 200, 
                height: 200, 
                color: "art4",
                mass: 0
            }],
            portals: [{
                name: "Main Lobby",
                x: 0,
                y: 600,
                width: 10,
                height: 100,
                exit: [1000, 1000]
            }]
        }
        this.floors5 = setupFloors(this.instance, this.room5)


        this.room6 = {
            x: 3100,
            y: 1600,
            name: "reception",
            width: 700,
            height: 700,
            floorColor: "#131313",
            wallColor: "#4DFA66",
            gridColor: "#454545",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: "#4dfa66",
            borderWidth: 5,
            objects: [/*{
                name: "token",
                type: "quote",
                x: 100,
                y: 600,
                width: 35, 
                height: 35, 
                color: "quote0",
                mass: 0
            }],
            portals: [],
            door: "bottom"
        }
        this.floors6 = setupFloors(this.instance, this.room6)
        this.obstacles6 = setupObstacles(this.instance, this.room6, obstacles)
        this.boxes6 = setupBoxes(this.instance, this.world, this.room6, boxes)
        


        this.room7 = {
            x: 3350,
            y: 2300,
            name: "reception",
            width: 200,
            height: 700,
            floorColor: "#131313",
            wallColor: "#4DFA66",
            gridColor: "#454545",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: "#4dfa66",
            borderWidth: 5,
            objects: [],
            portals: [{
                name: "Main Lobby",
                x: 20,
                y: 720,
                width: 200,
                height: 10,
                exit: [1000, 1000]
            }],
            door: "",
            type: "corridor"
        }
        this.floors7 = setupFloors(this.instance, this.room7)
        this.obstacles7 = setupObstacles(this.instance, this.room7, obstacles)
        //this.boxes7 = setupBoxes(this.instance, this.world, this.room7, boxes)
*/


        
        /*this.obstacles2 = setupObstacles(this.instance, this.room2, obstacles)
        this.obstacles3 = setupObstacles(this.instance, this.room3, obstacles)
        this.obstacles3 = setupObstacles(this.instance, this.room4, obstacles)
        this.obstacles3 = setupObstacles(this.instance, this.room5, obstacles)*/

        /*this.boxesTwo = setupBoxes(this.instance, this.world, this.room2, boxes)
        this.boxesThree = setupBoxes(this.instance, this.world, this.room3, boxes)
        this.boxesFour = setupBoxes(this.instance, this.world, this.room4, boxes)
        this.boxesFour = setupBoxes(this.instance, this.world, this.room5, boxes)*/
        

       

        
        
        /*this.portals2 = setupPortals(this.instance, this.room2, portals)
        this.portals3 = setupPortals(this.instance, this.room3, portals)
        this.portals4 = setupPortals(this.instance, this.room4, portals)
        this.portals5 = setupPortals(this.instance, this.room5, portals)
        
        this.portals7 = setupPortals(this.instance, this.room7, portals)
        this.portals = portals*/

        
        //crystal

        

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
        
        /*

        function findContacts(){
    for(let i = 0; i < world.narrowphase.contactEquations.length; i++){
        let eq = world.narrowphase.contactEquations[i]
        let bodyAPosition = eq.bodyA.position
        let contactPointA = eq.contactPointA
    
        let contactX = bodyAPosition[0] + contactPointA[0]
        let contactY = bodyAPosition[1] + contactPointA[1]

        spawnParticle(contactX, contactY)
    }
}&*async function startCall(target) {
    if (!peer) return;
    const call = peer.call(target, await getAudioStream());
    receiveCall(call);
}

// play the stream from the call in a video element
function receiveCall(call) {
    call.on('stream', stream => {
    // stream.noiseSuppression = true;
    const player = players.find(p => p.id === call.peer);
    if (!player) {
        console.log('couldn\'t find player for stream', call.peer);
    } else {
        player.stream = new StreamSplit(stream, {left: 1, right: 1});
        playAudioStream(stream, call.peer);
        log('created stream for', call.peer);
    }
     playAudioStream(stream, call.peer);
    });
}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}
const app = new PIXI.Application({
	width: 200,
  height: 200
});
document.body.appendChild(app.view);

const circle = new PIXI.Graphics()
	.beginTextureFill(gradient('#9ff', '#033'))
  .drawStar(50, 50, 5, 50, 20);
  
  
circle.position.set(100);
circle.pivot.set(50);
app.stage.addChild(circle);

app.ticker.add(() => {
   circle.rotation += 0.005;
});

function gradient(from, to) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  const grd = ctx.createLinearGradient(0,0,100,100);
  grd.addColorStop(0, from);
  grd.addColorStop(1, to);
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,100,100);
  return new PIXI.Texture.from(c);
}


    const portalProximity = Sound.from('audio/portal-proximity.mp3');
    portalProximity.volume = 0
    portalProximity.loop = true
    portalProximity.play()
        const portalSound = Sound.from('audio/car.mp3');
    const partySound = Sound.from('audio/grunt-birthday-party.mp3');
    const messageSound = Sound.from('audio/message.mp3');
    const leftSound = Sound.from('audio/left.mp3');
    partySound.volume = 0.008
    let lastMessage







        const scienceGalleryLogo = PIXI.Sprite.from('images/sg-white.svg');
        scienceGalleryLogo.x = 11050
        scienceGalleryLogo.y = 5605
        scienceGalleryLogo.alpha = 1
        scienceGalleryLogo.width = 187
        scienceGalleryLogo.height = 90

        this.middleground.addChild(scienceGalleryLogo)

       

        const welcomeText = new TaggedText("Welcome to <bold>BIAS ONLINE</bold>\nA real-time virtual exhibition space at Science Gallery Dublin", {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "18px",
                wordWrap: true,
                fill: "#FFFFFF",
                lineHeight: 24,
                padding: 10,
                wordWrapWidth: 300,
                leading: 1,
                align: "center",
                textBaseline: "middle"
            },
            "bold": {
                fontWeight: 900,
                fontSize: "18px",
                lineHeight: 24,
            }
        });
        welcomeText.alpha = 0
        welcomeText.x = (11055-60)
        welcomeText.y = 5720
        this.middleground.addChild(welcomeText)
       




        const controlsDesktop = new PIXI.Sprite.from('images/wasd-controls.svg');
        controlsDesktop.anchor.set(0.5);
        controlsDesktop.width = 267
        controlsDesktop.height = 229
        controlsDesktop.x = 11150
        controlsDesktop.y = 6130
        controlsDesktop.alpha = 0.5
        this.middleground.addChild(controlsDesktop)







        const downArrowFloor = new PIXI.Sprite.from('images/floor-arrow-down.svg');
        downArrowFloor.anchor.set(0.5);
        downArrowFloor.width = 32
        downArrowFloor.height = 42
        downArrowFloor.x = 11150
        downArrowFloor.y = 6300
        downArrowFloor.alpha = 0.25
        this.middleground.addChild(downArrowFloor)




        const texture = PIXI.Texture.from('images/blue-black-capsule-pattern.svg');
        const tilingSprite = new PIXI.TilingSprite(texture, 400, 200);
        tilingSprite.x = 800
        tilingSprite.y = 900
        this.middleground.addChild(tilingSprite);

        const scienceGalleryLogoFull = new PIXI.Sprite.from('images/science-gallery-full-logo.svg');
        scienceGalleryLogoFull.anchor.set(0.5);
        scienceGalleryLogoFull.x = 1000
        scienceGalleryLogoFull.y = 1000
        this.middleground.addChild(scienceGalleryLogoFull)

    


        }*/