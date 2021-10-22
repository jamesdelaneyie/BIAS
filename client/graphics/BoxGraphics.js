import * as PIXI from 'pixi.js'

class BoxGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.name = state.name
        this.type = state.type

        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color    
        this.radius = state.radius
       
        this.color = PIXI.utils.string2hex(this.color);

        const type = this.type

        if(this.name == "blackbox") {
            this.videoTexture = PIXI.Texture.from('/video/box.mp4');
            this.videoTexture.baseTexture.resource.source.muted = true
            this.videoTexture.baseTexture.resource.source.loop = true
            this.videoTexture.baseTexture.resource.source.playsinline = true
            this.videoTexture.baseTexture.resource.autoPlay = true
            this.videoTexture.baseTexture.resource.volume = 0

            const video = this.videoTexture.baseTexture.resource.source
            video.muted = true
            video.playbackRate = 2;

            const filter = new PIXI.filters.ColorMatrixFilter();
            filter.sepia();

            

            const videoSprite = new PIXI.Sprite(this.videoTexture);
            videoSprite.x = (-state.width/2)*2
            videoSprite.y = (-state.height/2)*2
            videoSprite.width = state.width*2 //.width;
            videoSprite.height = state.height*2//state.height;
            videoSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY
            videoSprite.filter = [filter]
            //this.addChild(videoSprite);

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
                
            ];//30/22/70-1

            let whiteCube = PIXI.AnimatedSprite.fromFrames(cubeSprite, true);
            whiteCube.width = state.width*2.5
            whiteCube.height = state.height*2.5
            whiteCube.x = -state.width*1.5
            whiteCube.y = -state.height*1.5
            
            whiteCube.play()
            this.addChild(whiteCube)


            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.lineStyle(0, 0xffffff)
            this.body.drawRoundedRect(-state.width, -state.height, state.width*2, state.height*2, 1)
            this.body.endFill()

            //this.addChild(this.body)

        } else {

            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.lineStyle(0, 0xffffff)
            this.body.drawRoundedRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2, 1)
            this.body.endFill()
            //this.body.blendMode = PIXI.BLEND_MODES.ADD
            this.body.pivot.set(0.5,0.5)
            this.body.scale.set(0.5)
            this.addChild(this.body)

        }

        

        



        //blackbox

        /*if (state.color == "quote0") {
            state.width = 120
            state.height = 120
            this.auraContainer = new PIXI.Container();   
            var canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
            var auraTexture = new PIXI.RenderTexture.create(120, 120);
            var auraSprite = new PIXI.Sprite(auraTexture);
            this.auraContainer.addChild(auraSprite)
            
            const aura = new PIXI.Graphics();
            const auraColor = PIXI.utils.string2hex("#1DCFFF");
            aura.beginFill(auraColor);
            aura.drawCircle(0, 0, 60);
            aura.endFill();
            this.auraContainer.addChild(aura);
            canvasRenderer.render(this.auraContainer, auraTexture)
            this.addChild(this.auraContainer)
        }*/
        //console.log(type)

        /*if(this.name == "token") {
            this.body = new PIXI.Graphics()
            this.tokenImage = new PIXI.Sprite.from('images/'+type+'-icon.svg');
            this.tokenImage.width = state.width;
            this.tokenImage.height = state.height;
            this.tokenImage.x = -state.width/2
            this.tokenImage.y = -state.height/2
            if(state.type == "security-cam") {
                this.tokenImage.x = 0
                this.tokenImage.y = 0
                this.tokenImage.angle = -90
                this.tokenImage.anchor.set(0.5, 0.8)
            }
            this.body.addChild(this.tokenImage)
            this.addChild(this.body)

        } else {
            

        }*/


        this.count = 0
       
        
    }

   

    updateColor(color) {
       
    }

    


    update(delta) {

        this.count++

        if(this.color == "quote0") {
            this.auraContainer.scale.set(1 + Math.sin((this.count/10)) * 0.1, 1 + Math.sin((this.count/10)) * 0.1);
            this.auraContainer.alpha = 0.2 + Math.sin((this.count/10)) * 0.1;
        }

    }
}

export default BoxGraphics