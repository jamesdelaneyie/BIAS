import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { ease } from 'pixi-ease'


class FlowerGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y

        this.color = state.color    
        this.color = PIXI.utils.string2hex(this.color);


        /* Circle Stamp
        let flower = new Graphics()
        flower.lineStyle(0)
        flower.beginFill(this.color, 1.0, true)
        flower.drawCircle(0, 0, 25)
        flower.endFill()
        flower.cacheAsBitmap = true
        flower.alpha = 0
        flower.scale.set(0.2)
        */

        this.flower = false

        if(state.y > 1300) {
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

        } else {

            this.flower = true
            var leaf = new PIXI.Graphics();
            leaf.alpha = 0
            ease.add(leaf, {alpha: 1, scale: 1}, { duration: 1000, ease: 'easeOutExpo' })
            this.addChild(leaf);

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



            this.prev = 0;

            var Wanderer = function(p) {
                this.init(p);
            }

            function randColor(){
                return {r:0, g:Math.random(), b:0};
            }

            window.uTime = 0;
            this.wanderers = [];
            this.newWanderers = [];

            Wanderer.prototype.init = function(p) {

                this.color = randColor();
                if(p) { this.head = p;}
                else this.head = getRandomTarget();
                this.head.time = window.uTime;
            };

            Wanderer.prototype.update = function() {

                    //console.log(this.head)
                    var candidates = neighbors(this.head);
                    let wanderers = this.wanderers

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
                    }
                    else {

                        leaf.lineStyle(MIN_LINE_THICKNESS+Math.pow(MAX_LINE_THICKNESS,1-window.uTime/40),
                            rgbToHex(this.color,1));//(1-(window.uTime%30+0.2*Math.random())/30)));

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
                return grid[10][10];
            }

            var candidates;

        
            this.wanderers.push(new Wanderer(grid[CELLS_X/2>>0][CELLS_Y/2>>0]));
            this.wanderers.push(new Wanderer());


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
        

    }
}

export default FlowerGraphics