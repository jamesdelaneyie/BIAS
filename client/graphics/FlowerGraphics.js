import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { ease } from 'pixi-ease'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function random(min, max) {
    return Math.floor(min + Math.random()*(max-min));
}
function getLineEndPoint(pos, len, ang) {
    return {x: pos.x + len*Math.cos(ang*180/Math.PI),
            y: pos.y + len*Math.sin(ang*180/Math.PI)};
}

function lerp(v0, v1, t) {
    return ( 1.0 - t ) * v0 + t * v1;
}


function animatePathDrawing(line, points) {

        if(line.progress < 1) {
            line.progress += 0.01
            line.alpha = line.progress
            drawBezierSplit(line, 0, 0, points[2], points[3], points[4], points[5], 0, line.progress);
        } 
        
    
}


/**
 * Draws a splitted bezier-curve
 * 
 * @param ctx       The canvas context to draw to
 * @param x0        The x-coord of the start point
 * @param y0        The y-coord of the start point
 * @param x1        The x-coord of the control point
 * @param y1        The y-coord of the control point
 * @param x2        The x-coord of the end point
 * @param y2        The y-coord of the end point
 * @param t0        The start ratio of the splitted bezier from 0.0 to 1.0
 * @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
 */

 function drawBezierSplit(line, x0, y0, x1, y1, x2, y2, t0, t1) {
    //ctx.beginPath();
    //console.log(t1)
   
    if(t1 < 0.2) {
        line.lineStyle(1, 0xffffb1, 0.3)
    } else if (t1 < 0.4) {
        line.lineStyle(2, 0xffffb1, 0.2)
    } else if (t1 < 0.6) {
        line.lineStyle(3, 0xffffb1, 0.2)
    } else if (t1 < 0.8) {
        line.lineStyle(2, 0xffffb1, 0.2)
    } else {
        line.lineStyle(1, 0xffffb1, 0.1)
    }
    

	if( 0.0 == t0 && t1 == 1.0 ) {
		line.moveTo( x0, y0 );
		line.quadraticCurveTo( x1, y1, x2, y2 );
	} else if( t0 != t1 ) {
        var t00 = t0 * t0,
            t01 = 1.0 - t0,
            t02 = t01 * t01,
            t03 = 2.0 * t0 * t01;
        
        var nx0 = t02 * x0 + t03 * x1 + t00 * x2,
            ny0 = t02 * y0 + t03 * y1 + t00 * y2;
        
        t00 = t1 * t1;
        t01 = 1.0 - t1;
        t02 = t01 * t01;
        t03 = 2.0 * t1 * t01;
        
        var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
            ny2 = t02 * y0 + t03 * y1 + t00 * y2;
        
        var nx1 = lerp ( lerp ( x0 , x1 , t0 ) , lerp ( x1 , x2 , t0 ) , t1 ),
            ny1 = lerp ( lerp ( y0 , y1 , t0 ) , lerp ( y1 , y2 , t0 ) , t1 );
        
        line.moveTo( nx0, ny0 );
        line.quadraticCurveTo( nx1, ny1, nx2, ny2 );
	}
    
}


class FlowerGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y

        this.color = state.color    
        this.color = PIXI.utils.string2hex(this.color);

        this.lines = []

        this.flower = false

        if(state.y < 1700 && state.x < 2850) {

            
            this.flower = true
            var leaf = new PIXI.Graphics();
            leaf.alpha = 0
            ease.add(leaf, {alpha: 1, scale: 1}, { duration: 1000, ease: 'easeOutExpo' })
            this.addChild(leaf);


            var flowerDot = new PIXI.Graphics();
            //flowerDot.alpha = 0
            //ease.add(flowerDot, {alpha: 1, scale: 1}, { duration: 1000, ease: 'easeOutExpo' })
            this.addChild(flowerDot);

            var GRID_SIZE = 5;
            var CELLS_X = 200/GRID_SIZE;
            var CELLS_Y = 200/GRID_SIZE;
            var MIN_LINE_THICKNESS = 1;
            var MAX_LINE_THICKNESS = 6;
            var jitter = 0.7;
            var grid = [];

            for (var x = 0;x<CELLS_X;x++) {
                grid.push([]);
                for(var y = 0;y<CELLS_Y;y++) {
                    var gXY = {};

                    grid[x][y] = gXY;
                    gXY.ref = {x:x,y:y};
                    gXY.time = Number.MAX_SAFE_INTEGER;
                
                    gXY.x = GRID_SIZE * (x+Math.random()*jitter) - 100;
                    gXY.y = GRID_SIZE * (y+Math.random()*jitter) - 100;


                }
            }

            function rgbToHex(c,coef) {
                if(isNaN(coef)) coef = 1;
                c.r = Math.min(1,c.r);
                c.g = Math.min(1,c.g);
                c.b = Math.min(1,c.b);
                return Math.floor(c.r*0xff*coef)*0x10000+Math.floor(c.g*0xff*coef)*0x100+Math.floor(c.b*0xff*coef);
            }
            var colors = [];

            function neighbors(orig) {
                var neighbors =[];
            
                var ref = orig.ref;
                for(var xo = -1; xo<=1;xo++) {
                    for(var yo = -1; yo<=1;yo++) {
                        if(xo==0&&yo==0)continue;

                        var gX = grid[ref.x+xo]
                        if(!gX) continue;
                        var target = gX[ref.y+yo];
                        if(!target) continue;
                        neighbors.push(target);	
                        }
                }
                return neighbors;
            }


            let flowerColor = this.color
            //console.log(flowerColor)


            this.prev = 0;

            var Wanderer = function(p) {
                this.init(p);
            }

            function randColor(){
                return {r:0, g:Math.random()+0.2, b:0};
            }

            window.uTime = 0;

            this.wanderers = [];
            this.newWanderers = [];

            Wanderer.prototype.init = function(p) {

                this.color = randColor();

                if(p) { 
                    this.head = p
                } else {
                    this.head = getRandomTarget();
                    //console.log(this.head)
                }

                this.head.time = window.uTime;
            };

            Wanderer.prototype.update = function() {

                    var candidates = neighbors(this.head);

                    var newCandidates = [];
                    for(var i =0 ;i<candidates.length;i++) {
                        var time = Number.MAX_SAFE_INTEGER==candidates[i].time;
                        if(time) { 
                            candidates[i].time = this.head.time+1;
                            newCandidates.push(candidates[i]);
                        }
                    }

                    this.prev = this.head;
                    this.head = newCandidates[Math.random()*newCandidates.length>>0];
                    var otherHead = newCandidates[Math.random()*newCandidates.length>>0];

                    if(!this.head) { 
                        this.toDispose = true;
                        flowerDot.beginFill(flowerColor, 1.0, true)
                        flowerDot.drawCircle(this.prev.x, this.prev.y, 3)
                        flowerDot.endFill()
                    }
                    else {

                        leaf.lineStyle( MIN_LINE_THICKNESS + Math.pow(MAX_LINE_THICKNESS,1-window.uTime/40), rgbToHex(this.color,1) );
                        //console.log(Math.pow(MAX_LINE_THICKNESS,window.uTime/40))

                        if(this.head.time % 30 == 0) {
                            flowerDot.beginFill(flowerColor, 1.0, true)
                            flowerDot.drawCircle(this.prev.x, this.prev.y, 3)
                            flowerDot.endFill()
                        }

                        if(Math.random()<0.25) {
                            var w = new Wanderer(otherHead);
                            w.color = {		r:this.color.r*(0.97+0.05*Math.random()),
                                            g:this.color.g*(0.97+0.05*Math.random()),
                                            b:this.color.b*(0.97+0.05*Math.random())};
                            //wanderers.push(w);
                            leaf.moveTo(this.prev.x,this.prev.y);
                            leaf.lineTo(otherHead.x,otherHead.y);
                        }
                        leaf.moveTo(this.prev.x,this.prev.y);
                        leaf.lineTo(this.head.x,this.head.y);
                    }

            };

            function getRandomTarget() {
                return grid[19][19];
            }

            var candidates;

            let starter = grid[CELLS_X/2>>0][CELLS_Y/2>>0]
            this.wanderers.push(new Wanderer(starter));
            this.wanderers.push(new Wanderer());




            /*
            */

        } else if(state.y > 1300 && state.x < 2500) {

            let choice = Math.floor(Math.random() * (4 - 1) + 1)
            if(choice == 1) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-calm.svg');
            } else if (choice == 2) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-sad.svg');
            } else if (choice == 3) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker.svg');
            }
            let size = Math.floor(Math.random() * (6 - 2) + 1)
            this.smileyStamp.width = size*10;
            this.smileyStamp.height = size*10;
            this.smileyStamp.x = 0
            this.smileyStamp.y = 0
            let angle = Math.floor(Math.random() * (360 - 1) + 1)
            this.smileyStamp.scale.set(3)
            this.smileyStamp.angle = angle 
            this.smileyStamp.anchor.set(0.5, 0.5)
            this.smileyStamp.alpha = 0
            this.addChild(this.smileyStamp)
            ease.add(this.smileyStamp, {alpha: 1, scale: 0.5}, { duration: 150, ease: 'easeOutExpo' })

            /*


            const URL = '/audio/car.mp3';
    
            const context = new AudioContext();
                
            let yodelBuffer;

            //const container = this
            const audioWave = new PIXI.ParticleContainer()
            this.addChild(audioWave)

            window.fetch(URL)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    yodelBuffer = audioBuffer;
                    
                    console.log(audioBuffer)
                    setTimeout(function(){
                        //play(yodelBuffer)
                        drawWaveform(audioBuffer, 0.35, 2)
                    }, 500)
                    
                });
            
            
                

            function play(audioBuffer) {
                const source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(context.destination);
                source.start();
            }



            function drawWaveform (audioBuffer, pos, zoom) {

                if(audioBuffer) {

                
                    //Safari//MacBookPro2015BigSur
                    let width = 400
                    let height = 400

                    //console.log(audioBuffer)
              
                // calculate displayed part of audio 
                // and slice audio buffer to only process that part
                const bufferLength = audioBuffer.length
                const zoomLength = bufferLength / zoom
                const start = Math.max(0, bufferLength * pos - zoomLength / 2)
                const end = Math.min(bufferLength, start + zoomLength)
                const rawAudioData = audioBuffer.getChannelData(0).slice(start, end)
              
                // process chunks corresponding to 1 pixel width
                const chunkSize = Math.max(1, Math.floor(rawAudioData.length / width))
                const values = []
                    
                    let x = 0;

                    //var drawAudio = setInterval(function(){

                        //console.log(x)
                    for(let x = 0; x < width; x++) {
                        const start = x*chunkSize
                        const end = start + chunkSize
                        const chunk = rawAudioData.slice(start, end)
                        // calculate the total positive and negative area
                        let positive = 0
                        let negative = 0
                        chunk.forEach(val => 
                            val > 0 && (positive += val) || val < 0 && (negative += val)
                        )
                        // make it mean (this part makes dezommed audio smaller, needs improvement)
                        negative /= chunk.length
                        positive /= chunk.length
                        // calculate amplitude of the wave
                        var chunkAmp = -(negative - positive)
                        // draw the bar corresponding to this pixel
                       
                        let drawHeight = Math.max(1, chunkAmp * height)
                       


                        var sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
                        sprite.tint = 0xff7e6b; 
                        sprite.x = x
                        sprite.y = (height / 2 - positive * height) - height/2
                        sprite.width = 1;
                        sprite.alpha = 0.5
                        sprite.height = drawHeight;
                        //sprite.angle = x/10 - 20
                        

                        audioWave.addChild(sprite);
                        
                        //audioWave.addChild(rect)
                        //container.width = container.width + 1
                    }
                   
              }}*/

            

            //differential line growth algorithm
            //squaers at angle,. crystal style. 
            
            


        } else if (state.y < 1300 && state.x > 1850) {
            //nothing
        } else {

            this.wrapper = new PIXI.Container()
            this.wrapper.alpha = 0.02

            for(var i=0;i<1;i++) {
               
            
                let line = new Graphics()
                line.progress = 0
    
                let angle = random(0, 360);

                let length = random(800, 1000);
                let startPos = {
                    x : 0,
                    y : 0
                }

                let endPos = getLineEndPoint(startPos, length, angle);
    
                let bezier1Angle = random(angle - 90, angle + 90) % 360;
                let bezier2Angle = (180 + random(angle - 90, angle + 90)) % 360;
    
                let lineSize = 500
    
                let bezier1Length = lineSize;
                let bezier2Length = lineSize;
    
                let bezier1Pos = getLineEndPoint(startPos, bezier1Length, bezier1Angle);
                let bezier2Pos = getLineEndPoint(endPos, bezier2Length, bezier2Angle);
    
                line.points = [bezier1Angle, bezier2Angle, bezier1Pos.x, bezier1Pos.y,
                    bezier2Pos.x, bezier2Pos.y,
                    endPos.x, endPos.y]
              
               
                this.lines.push(line)
                

                this.wrapper.addChild(line)

                

            }

            this.addChild(this.wrapper)


         
           

        }
       
    
    }

    update(delta) {

      
        if(this.flower) {

        
            window.uTime++;
            
            this.prev = delta

            for(var n = 0;n<this.wanderers.length;n++) {
                this.wanderers[n].update();
                if(!this.wanderers[n].toDispose) this.newWanderers.push(this.wanderers[n]); else {
                }
            }

            this.wanderers = this.newWanderers;
            this.newWanderers = [];

        }

        //console.log(this)
        for(let x=0;x<this.lines.length;x++) {
            //console.log(this.lines)
            animatePathDrawing(this.lines[x], this.lines[x].points)
        }

       


        

    }
}

export default FlowerGraphics