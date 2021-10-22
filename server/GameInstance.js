import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import p2 from 'p2'

import Identity from '../common/message/Identity.js'

import WeaponFired from '../common/message/WeaponFired.js'
import CollisionSystem from '../common/CollisionSystem.js'
import followPath from './followPath.js'
import damagePlayer from './damagePlayer.js'

import instanceHookAPI from './instanceHookAPI.js'
import applyCommand from '../common/applyCommand.js'


import setupFloors from './setupFloors.js'
import setupBoxes from './setupBoxes.js'
import setupWalls from './setupWalls.js'
import setupObjectWalls from './setupObjectWalls.js'
import setupPortals from './setupPortals.js'
import setupObstacles from './setupObstacles.js'


import addFlower from './addFlower.js'

import Flower from '../common/entity/Flower.js'
import Box from '../common/entity/Box.js'
import Obstacle from '../common/entity/Obstacle.js'

import PlayerCharacter from '../common/entity/PlayerCharacter.js'

import Art from '../common/entity/Art.js'
import InfoPanel from '../common/entity/InfoPanel.js'

import { fire } from '../common/weapon.js'

import Notification from '../common/message/Notification'
import Walking from '../common/message/Walking'

import lagCompensatedHitscanCheck from './lagCompensatedHitscanCheck'

import fs from 'fs'
import SAT from 'sat'

import { GoogleSpreadsheet } from 'google-spreadsheet'
import Info from '../common/entity/InfoPanel.js'


var swearjar = require('swearjar');
var SpellChecker = require('spellchecker')
var Filter = require('./cleanHacked');
var filter = new Filter();

class GameInstance {
    constructor() {

        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        instanceHookAPI(this.instance)

        this.totalUsers = 0
        this.activeUsers = []

        const doc = new GoogleSpreadsheet('1M4TNR1k7f2OLdN_cUd1-k2Hyb_zTWWzl7gs37sLd1OE');
        const creds = require('../bias-online-keys.json');
        
       
        this.portals = new Map()
        this.obstacles = new Map()
        this.boxes = new Map()
        this.artworks = new Map()
        this.flowers = new Map()
        this.infoPanels = new Map()

        this.world = new p2.World({gravity: [0, 0]});


        this.room = {
            x: 0,
            y: 0,
            width: 4800,
            height: 3480,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#00FF00",
            holes: [{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            }]
        }

        setupObjectWalls(this.instance, this.world, this.room, this.boxes)
        setupWalls(this.instance, this.room, this.obstacles, 'wall')




        for(let x=0; x < 120; x++) {
            let box = new Box({
                name: "",
                type: "particle",
                x: 1773 + (15 * x),
                y: 1333 + (10 * x),
                width: 3,
                height: 3,
                mass: 0.001,
                color: "05db4c",
            })
            this.instance.addEntity(box)
            this.world.addBody(box.body)
            this.boxes.set(box.nid, box)
        }

        for(let x=0; x < 20; x++) {
            let size = 30 + Math.floor(Math.random() * 120)
            let box = new Box({
                name: "blackbox",
                type: "",
                x: 1773 + (100 * x),
                y: 1333 + (100 * x),
                width: size,
                height: size,
                mass: 0.001,
                color: "ffffff",
            })
            this.instance.addEntity(box)
            this.world.addBody(box.body)
            this.boxes.set(box.nid, box)
        }


        


        let welcomeInfo = {
            name: "14",
            type: "circle",
            x: 2600,
            y: 1560,
            width: 80,
            height: 80,
            color: "#FB4D3D",
        }

        let welcomeInfoPanel = new InfoPanel(welcomeInfo)
        this.instance.addEntity(welcomeInfoPanel)
        this.world.addBody(welcomeInfoPanel.body)
        this.infoPanels.set(welcomeInfoPanel.nid, welcomeInfoPanel)







        let libbysRoom = {
            x: 245,
            y: 240,
            width: 1175,
            height: 940,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#00b140",
            holes: [{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 515,
                width: 415,
            },{
                offset: 0,
                width: 0,
            }]
        }

        setupObjectWalls(this.instance, this.world, libbysRoom, this.boxes)
        setupWalls(this.instance, libbysRoom, this.obstacles, 'wall')

        let libbyInnerRoom = {
            x: 389,
            y: 388,
            width: 880,
            height: 580,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 5,
            wallColor: "#00b140",
            holes: [{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            }]
        }

        setupObjectWalls(this.instance, this.world, libbyInnerRoom, this.boxes)
        setupWalls(this.instance, libbyInnerRoom, this.obstacles, 'wall')

        let libbyEntrance = {
            x: 774,
            y: 1190,
            width: 409,
            height: 168,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#00b140",
            holes: [{
                offset: 0,
                width: 415,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 415,
            },{
                offset: 0,
                width: 0,
            }]
        }

        setupObjectWalls(this.instance, this.world, libbyEntrance, this.boxes)
        setupWalls(this.instance, libbyEntrance, this.obstacles, 'wall')

       
        let libbyArtworkObject = {
            name: "<bold>CLASSES</bold>\nLibby Heaney",
            type: "rectangle",
            x: 415,
            y: 443,
            width: 830,
            height: 530,
            mass: 0,
            color: "#ffffff",
        }
        let libbyArtwork = new Art(libbyArtworkObject)
        this.instance.addEntity(libbyArtwork)
        this.world.addBody(libbyArtwork.body)
        this.artworks.set(libbyArtwork.nid, libbyArtwork)


        let libbyArtworkInfo = {
            name: "9",
            type: "circle",
            x: 1212,
            y: 950,
            width: 80,
            height: 80,
            color: "#05db4c",
        }

        let libbyInfoPanel = new InfoPanel(libbyArtworkInfo)
        this.instance.addEntity(libbyInfoPanel)
        this.world.addBody(libbyInfoPanel.body)
        this.infoPanels.set(libbyInfoPanel.nid, libbyInfoPanel)























        let noahArtworkObject = {
            name: "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson",
            type: "circle",
            x: 800,
            y: 2318,
            width: 400,
            height: 400,
            mass: 0,
            color: "#ffffff",
        }
        let noahArtwork = new Art(noahArtworkObject)
        this.instance.addEntity(noahArtwork)
        this.world.addBody(noahArtwork.body)
        this.artworks.set(noahArtwork.nid, noahArtwork)


        let noahArtworkInfo = {
            name: "10",
            type: "circle",
            x: 1146,
            y: 1910,
            width: 80,
            height: 80,
            color: "#ffff1a",
        }

        let noahInfoPanel = new InfoPanel(noahArtworkInfo)
        this.instance.addEntity(noahInfoPanel)
        this.world.addBody(noahInfoPanel.body)
        this.infoPanels.set(noahInfoPanel.nid, noahInfoPanel)



        let noahWall1 = new Obstacle({ 
            name: "noahWall",
            x: 1130,
            y: 2024, 
            width: 600, 
            height: 10, 
            border: 10,
            color: "#ffff00",
            angle: 47.5
        })
        this.instance.addEntity(noahWall1)
        this.obstacles.set(noahWall1.nid, noahWall1)


        let noahWall2 = new Obstacle({ 
            name: "noahWall",
            x: 437,
            y: 2425, 
            width: 600, 
            height: 10, 
            border: 10,
            color: "#ffff00",
            angle: 317.5
        })
        this.instance.addEntity(noahWall2)
        this.obstacles.set(noahWall2.nid, noahWall2)



        let noahWall3 = new Obstacle({ 
            name: "noahWall",
            x: 433,
            y: 2628, 
            width: 600, 
            height: 10, 
            border: 10,
            color: "#ffff00",
            angle: 47.5
        })
        this.instance.addEntity(noahWall3)
        this.obstacles.set(noahWall3.nid, noahWall3)


        let noahWall4 = new Obstacle({ 
            name: "noahWall",
            x: 1091,
            y: 3074, 
            width: 600, 
            height: 10, 
            border: 10,
            color: "#ffff00",
            angle: 317.5
        })
        this.instance.addEntity(noahWall4)
        this.obstacles.set(noahWall4.nid, noahWall4)















        let stairsUp = new Obstacle({ 
            name: 'stairsUp',
            x: 3390,
            y: 2130,
            width: 103, 
            height: 150, 
            border: 0,
            color: "#ffff00",
            angle: 45
        })
        this.instance.addEntity(stairsUp)
        this.obstacles.set(stairsUp.nid, stairsUp)

        let stairsDown = new Obstacle({ 
            name: 'stairsDown',
            x: 3515,
            y: 2006,
            width: 103, 
            height: 150, 
            border: 0,
            color: "#00ffff",
            angle: 45
        })
        this.instance.addEntity(stairsDown)
        this.obstacles.set(stairsDown.nid, stairsDown)

        let johannColor = "#fc5854" //##e26d5a ff7546

        let johannArtworkInfo = {
            name: "12",
            type: "circle",
            x: 3430,
            y: 2380,
            width: 80,
            height: 80,
            color: "#e26d5a",
        }

        let johannInfoPanel = new InfoPanel(johannArtworkInfo)
        this.instance.addEntity(johannInfoPanel)
        this.world.addBody(johannInfoPanel.body)
        this.infoPanels.set(johannInfoPanel.nid, johannInfoPanel)



        let johannBlocker = new Obstacle({ 
            name: "johannBlocker",
            x: 4015,
            y: 2725, 
            width: 680, 
            height: 680, 
            border: 10,
            color: johannColor,
            angle: 0
        })
        this.instance.addEntity(johannBlocker)
        this.obstacles.set(johannBlocker.nid, johannBlocker)

        let johannBlockerOuter = new Obstacle({ 
            name: "johannBlockerOuter",
            x: 4015,
            y: 2725, 
            width: 1360, 
            height: 1360, 
            border: 10,
            color: johannColor,
            angle: 0
        })
        this.instance.addEntity(johannBlockerOuter)
        this.obstacles.set(johannBlockerOuter.nid, johannBlockerOuter)


      


        let johannInnerWall1 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3420,
            y: 2400, 
            width: 80, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 115
        })
        this.instance.addEntity(johannInnerWall1)
        this.obstacles.set(johannInnerWall1.nid, johannInnerWall1)

        let johannInnerWall2 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3386,
            y: 2473, 
            width: 80, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 108
        })
        this.instance.addEntity(johannInnerWall2)
        this.obstacles.set(johannInnerWall2.nid, johannInnerWall2)

        let johannInnerWall3 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3359,
            y: 2555, 
            width: 100, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 100
        })
        this.instance.addEntity(johannInnerWall3)
        this.obstacles.set(johannInnerWall3.nid, johannInnerWall3)

        let johannInnerWall4 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3340,
            y: 2794, 
            width: 100, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 80
        })
        this.instance.addEntity(johannInnerWall4)
        this.obstacles.set(johannInnerWall4.nid, johannInnerWall4)


        let johannInnerWall5 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3360,
            y: 2901, 
            width: 100, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 70
        })
        this.instance.addEntity(johannInnerWall5)
        this.obstacles.set(johannInnerWall5.nid, johannInnerWall5)

        let johannInnerWall6 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3360,
            y: 2901, 
            width: 100, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 70
        })
        this.instance.addEntity(johannInnerWall6)
        this.obstacles.set(johannInnerWall6.nid, johannInnerWall6)


        let johannInnerWall7 = new Obstacle({ 
            name: "johannInnerWall",
            x: 3398,
            y: 3002, 
            width: 100, 
            height: 3, 
            border: 5,
            color: johannColor,
            angle: 63
        })
        this.instance.addEntity(johannInnerWall7)
        this.obstacles.set(johannInnerWall7.nid, johannInnerWall7)

        

        

        


        let johannWall1 = new Obstacle({ 
            name: "johannWall1",
            x: 3283,
            y: 2235, 
            width: 220, 
            height: 10, 
            border: 10,
            color: johannColor,
            angle: 45
        })
        this.instance.addEntity(johannWall1)
        this.obstacles.set(johannWall1.nid, johannWall1)



        let johannWall3 = new Obstacle({ 
            name: "johannWall3",
            x: 3398,
            y: 2123, 
            width: 100, 
            height: 10, 
            border: 10,
            color: johannColor,
            angle: 45
        })
        this.instance.addEntity(johannWall3)
        this.obstacles.set(johannWall3.nid, johannWall3)


        let johannWall4 = new Obstacle({ 
            name: "johannWall4",
            x: 3408,
            y: 2113, 
            width: 100, 
            height: 10, 
            border: 10,
            color: johannColor,
            angle: 45
        })
        this.instance.addEntity(johannWall4)
        this.obstacles.set(johannWall4.nid, johannWall4)


        let johannWall2 = new Obstacle({ 
            name: "johannWall1",
            x: 3521,
            y: 1999, 
            width: 220, 
            height: 10, 
            border: 10,
            color: johannColor,
            angle: 45
        })
        this.instance.addEntity(johannWall2)
        this.obstacles.set(johannWall2.nid, johannWall2)





       

    


        let johannArtworkBooth1Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 3288,
            y: 2662,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth1 = new Art(johannArtworkBooth1Styles)
        this.instance.addEntity(johannArtworkBooth1)
        this.world.addBody(johannArtworkBooth1.body)
        this.artworks.set(johannArtworkBooth1.nid, johannArtworkBooth1)


        let johannArtworkBooth2Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 3411,
            y: 3086,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth2 = new Art(johannArtworkBooth2Styles)
        this.instance.addEntity(johannArtworkBooth2)
        this.world.addBody(johannArtworkBooth2.body)
        this.artworks.set(johannArtworkBooth2.nid, johannArtworkBooth2)


        let johannArtworkBooth3Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 3847,
            y: 3330,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth3 = new Art(johannArtworkBooth3Styles)
        this.instance.addEntity(johannArtworkBooth3)
        this.world.addBody(johannArtworkBooth3.body)
        this.artworks.set(johannArtworkBooth3.nid, johannArtworkBooth3)


        let johannArtworkBooth4Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 4343,
            y: 3204,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth4 = new Art(johannArtworkBooth4Styles)
        this.instance.addEntity(johannArtworkBooth4)
        this.world.addBody(johannArtworkBooth4.body)
        this.artworks.set(johannArtworkBooth4.nid, johannArtworkBooth4)


        let johannArtworkBooth5Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 4600,
            y: 2820,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth5 = new Art(johannArtworkBooth5Styles)
        this.instance.addEntity(johannArtworkBooth5)
        this.world.addBody(johannArtworkBooth5.body)
        this.artworks.set(johannArtworkBooth5.nid, johannArtworkBooth5)
       


        let johannArtworkBooth6Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 4550,
            y: 2370,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth6 = new Art(johannArtworkBooth6Styles)
        this.instance.addEntity(johannArtworkBooth6)
        this.world.addBody(johannArtworkBooth6.body)
        this.artworks.set(johannArtworkBooth6.nid, johannArtworkBooth6)
   

        let johannArtworkBooth7Styles = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 4153,
            y: 2040,
            width: 120,
            height: 120,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtworkBooth7 = new Art(johannArtworkBooth7Styles)
        this.instance.addEntity(johannArtworkBooth7)
        this.world.addBody(johannArtworkBooth7.body)
        this.artworks.set(johannArtworkBooth7.nid, johannArtworkBooth7)






















        let mushonRoom = {
            x: 2905,
            y: 295,
            width: 945,
            height: 825,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 3,
            wallColor: "#6b378f",
            holes: [{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 350,
                width: 240,
            },{
                offset: 0,
                width: 0,
            }]
        }
        setupObjectWalls(this.instance, this.world, mushonRoom, this.boxes)
        setupWalls(this.instance, mushonRoom, this.obstacles, 'wall')



        let mushonArtworkInfo = {
            name: "11",
            type: "circle",
            x: 3160,
            y: 1205,
            width: 80,
            height: 80,
            color: "#6b378f",
        }

        let mushonInfoPanel = new InfoPanel(mushonArtworkInfo)
        this.instance.addEntity(mushonInfoPanel)
        this.world.addBody(mushonInfoPanel.body)
        this.infoPanels.set(mushonInfoPanel.nid, mushonInfoPanel)


        let mushonArtworkObject = {
            name: "<bold>NORMALIZI.NG</bold>\nMushon Zer-Aviv",
            type: "",
            x: 3320,
            y: 650,
            width: 119,
            height: 119,
            mass: 0,
            color: "#ffffff",
        }
        let mushonArtwork = new Art(mushonArtworkObject)
        this.instance.addEntity(mushonArtwork)
        this.world.addBody(mushonArtwork.body)
        this.artworks.set(mushonArtwork.nid, mushonArtwork)


        /*let mushonKiller = new Box({
            name: "mushonKiller",
            type: "",
            x: 3143,
            y: 924,
            width: 150,
            height: 200,
            mass: 0,
            color: "ff0000",
            offset: 20000,
            speedAdjust: 1.2
        })
        this.instance.addEntity(mushonKiller)
        this.world.addBody(mushonKiller.body)
        this.boxes.set(mushonKiller.nid, mushonKiller)

        let mushonKillerTwo = new Box({
            name: "mushonKiller",
            type: "",
            x: 3343,
            y: 924,
            width: 150,
            height: 200,
            mass: 0,
            color: "ff0000",
            offset: 0,
            speedAdjust: 1
        })
        this.instance.addEntity(mushonKillerTwo)
        this.world.addBody(mushonKillerTwo.body)
        this.boxes.set(mushonKillerTwo.nid, mushonKillerTwo)

        let mushonKillerThree = new Box({
            name: "mushonKiller",
            type: "",
            x: 3543,
            y: 924,
            width: 150,
            height: 200,
            mass: 0,
            color: "ff0000",
            offset: 10000,
            speedAdjust: 2
        })
        this.instance.addEntity(mushonKillerThree)
        this.world.addBody(mushonKillerThree.body)
        this.boxes.set(mushonKillerThree.nid, mushonKillerThree)

        let mushonKillerFour = new Box({
            name: "mushonKiller",
            type: "",
            x: 3743,
            y: 924,
            width: 150,
            height: 200,
            mass: 0,
            color: "ff0000",
            offset: 30000,
            speedAdjust: 0.5
        })
        this.instance.addEntity(mushonKillerFour)
        this.world.addBody(mushonKillerFour.body)
        this.boxes.set(mushonKillerFour.nid, mushonKillerFour)


        let mushonKillerFive = new Box({
            name: "mushonKiller",
            type: "",
            x: 3943,
            y: 924,
            width: 150,
            height: 200,
            mass: 0,
            color: "ff0000",
            offset: 21000,
            speedAdjust: 1
        })
        this.instance.addEntity(mushonKillerFive)
        this.world.addBody(mushonKillerFive.body)
        this.boxes.set(mushonKillerFive.nid, mushonKillerFive)

        let mushonKillerSix = new Box({
            name: "mushonKiller",
            type: "",
            x: 4143,
            y: 924,
            width: 150,
            height: 200,
            mass: 0,
            color: "ff0000",
            offset: 35000,
            speedAdjust: 2
        })
        this.instance.addEntity(mushonKillerSix)
        this.world.addBody(mushonKillerSix.body)
        this.boxes.set(mushonKillerSix.nid, mushonKillerSix)*/
        



        this.instance.on('connect', ({ client, data, callback }) => {
            
            const channel = this.instance.createChannel()

            channel.subscribe(client)
            client.channel = channel
            
            client.positions = []
           
            client.view = {
                x: 0,
                y: 0,
                halfWidth: 2500,
                halfHeight: 2300
            }

            let theWorldDesign = JSON.stringify({
                art:[
                    libbyArtworkObject,
                    noahArtworkObject, 
                    johannArtworkBooth1Styles, 
                    johannArtworkBooth2Styles, 
                    johannArtworkBooth3Styles,
                    johannArtworkBooth4Styles,  
                    johannArtworkBooth5Styles,
                    johannArtworkBooth6Styles,
                    johannArtworkBooth7Styles,  
                    mushonArtworkObject
                ],
                rooms: [
                    libbysRoom,
                    libbyInnerRoom,
                    libbyEntrance,
                    mushonRoom
                ]
            })

            this.instance.message(new Notification(theWorldDesign, 'mapInfo', 0, 0), client)
            
            if(data.fromClient.bot == true) {
                let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                //let colorNow = PIXI.utils.string2hex(color);
                let number = Math.floor(Math.random() * 200)
                var x = Math.floor((Math.random() * 4000) + 1)
                var y = Math.floor((Math.random() * 3000 + 1))
                let command = {name: "Bot-" + number + "", avatar: "", color: ""+color+"", x:x, y: y}
                this.joinSession(command, client, doc, creds, true) 
            }
            
            

            if(data.fromClient.name) {
                this.instance.message(new Notification('', 'login', 0, 0), client)
               
                let command = {name: data.fromClient.name, avatar: data.fromClient.avatar, color: data.fromClient.color, x: data.fromClient.x, y: data.fromClient.y, floor: data.fromClient.floor}
                this.joinSession(command, client, doc, creds, true)  

                let theInstance = this.instance
                let theClient = client
                setTimeout(function(){                
                    theInstance.message(new Notification("0", 'showNotification'), theClient)
                }, 3500)
            }

            callback({ accepted: true, text: ""})

        })

        this.instance.on('disconnect', client => {

            this.totalUsers--
            
            if(client.rawEntity) {
                this.instance.messageAll(new Notification(''+ client.rawEntity.name +'', 'personLeft', 20, 20))
            }

            if(client.rawEntity) {
                client.channel.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
            }
            if(client.channel) {
                client.channel.destroy()
            }
            
        })
        

        this.instance.on('command::JoinCommand', ({ command, client }) => {
            
            //console.log('this')
            this.joinSession(command, client, doc, creds, false)
            let theInstance = this.instance
            let theClient = client
            setTimeout(function(){                
                theInstance.message(new Notification("1", 'showNotification'), theClient)
            }, 3500)
            
        })
        

        this.instance.on('command::ToggleCommand', ({ command, client }) => {

            if(command.type == "sleeping" && command.boolean == true) {

                if(client.smoothEntity) {
                    client.smoothEntity.sleeping = true
                    client.rawEntity.sleeping = true
                }


            } else if(command.type == "sleeping" && command.boolean == false)  {

               
                if(client.smoothEntity) {
                    client.smoothEntity.sleeping = false
                    client.rawEntity.sleeping = false
                }
                //console.log('awake')

            }

            if(command.type == "headphones" && command.boolean == true) {

                client.headphones = true
                client.rawEntity.headphones = true
                client.smoothEntity.headphones = true

            } else if (command.type == "headphones" && command.boolean == false) {

                
                for (let artwork of this.artworks.values()) {
                    
                    if(artwork.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson") {
                        let collided = false
                        
                        collided = SAT.testCircleCircle(client.rawEntity.collider.circle, artwork.collider.circle) 
                        
                        if(collided == true) {

                            const response = new SAT.Response()

                            if (SAT.testCircleCircle(client.rawEntity.collider.circle, artwork.collider.circle, response)) {
                                client.rawEntity.x -= response.overlapV.x * 4
                                client.rawEntity.y -= response.overlapV.y * 4
                            }
                            
 
                        }

                    }
                    
                   
                }

                setTimeout(function(){
                    client.headphones = false
                    if(client.rawEntity) {
                        client.rawEntity.headphones = false
                        client.smoothEntity.headphones = false
                        if(client.rawEntity.x > 1700 && client.rawEntity.x < 2300) {
                            client.rawEntity.x = 1009
                            client.rawEntity.y = 2194
                        }
                        client.smoothEntity.sleeping = false
                        client.rawEntity.sleeping = false
                    }
                }, 500)

                
              

                

            }


 
        })


        this.instance.on('command::LeaveCommand', ({ command, client }) => {

           this.instance.messageAll(new Notification(''+ client.rawEntity.name +'', 'personLeft', 20, 20))


           for (var i = this.activeUsers.length - 1; i >= 0; --i) {
               if (this.activeUsers[i].name == ''+ client.rawEntity.name +'') {
                   this.activeUsers.splice(i,1);
               }
           }


           if(client.rawEntity.nid) {
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
               client.channel.removeEntity(client.rawEntity)
              
           }
           client.channel.destroy()




        })

        this.messageDebounceTimer = 0
        this.timeDebounceTimer = 0


        this.instance.on('command::MoveCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity

            client.sleepTimer = 0

            if(command.forward == true || command.backward == true || command.left == true || command.right == true) {
                this.messageDebounceTimer++

                if(this.messageDebounceTimer > 20) {
                    this.instance.addLocalMessage(new Walking(client.smoothEntity.nid, client.color, client.smoothEntity.rotation, rawEntity.x, rawEntity.y))
                    //console.log(client.smoothEntity.nid+' walked')
                    this.messageDebounceTimer = 0
                }
            }

            applyCommand(rawEntity, command, this.obstacles, this.boxes, this.artworks, this.infoPanels)

            client.positions.push({
                x: rawEntity.x,
                y: rawEntity.y,
                delta: rawEntity.delta,
                rotation: rawEntity.rotation
            })
            

            
        })



        this.instance.on('command::SpeakCommand', ({ command, client, tick }) => {

            client.sleepTimer = 0

            if(command.type == "emojiBlast") {

                this.instance.messageAll(new Notification(command.text, 'emojiBlast', command.x, command.y))
            
            } else if(command.type == "talk") {

                //set the message
                const message = command.text

                if(command.text == "") {
                    return
                }

                //remove duplicate characters over 2
                let messageTrimmed = message.replace(/(.)\1{2,}/g, '$1$1')

                //the regex motherlode 
                var exp = /[\u0000-\u001f-[-`{-þĀ-žƀ-Ɏɐ-ʮʰ-ϾЀ-ӾԀ-\u052e\u0530-\u058e\u0590-\u05fe\u0600-\u07be߀-\u07fe\u0800-\u083e\u0840-\u085e\u08a0-\u08fe\u0900-\u09fe\u0a00-\u0a7e\u0a80-\u0afe\u0b00-\u0b7e\u0b80-\u0bfe\u0c00-\u0cfe\u0d00-\u0dfe\u0e00-\u0e7e\u0e80-\u0efeༀ-\u0ffeက-\u10feᄀ-\u11feሀ-\u137eᎀ-\u139eᎠ-\u13fe\u1400-\u167e\u1680-\u169eᚠ-\u16feᜀ-\u171eᜠ-\u173eᝀ-\u175eᝠ-\u177eក-\u17fe᠀-\u18ae\u18b0-\u18feᤀ-\u197eᦀ-\u1aae\u1b00-\u1b7e\u1b80-\u1bbe\u1bc0-\u1bfeᰀ-᱿\u1cc0-\u1cce\u1cd0-\u1cfeᴀ-ᵾᶀ-Ỿἀ-῾\u2000-\u209e₠-\u20ce\u20d0-\u20fe℀-\u218e←-\u23fe␀-\u243e⑀-\u245e①-\u26fe\u2700-➾⟀-\u2bfeⰀ-ⱞⱠ-\u2c7eⲀ-\u2d2eⴰ-\u2d7eⶀ-ⷞ\u2de0-\u2e7e⺀-\u2efe⼀-\u2fde⿰-\u2ffe\u3000-\u312e\u3130-ㆎ㆐-\u31be㇀-\u31eeㇰ-㋾㌀-\u4dbe䷀-\u9ffeꀀ-\ua48e꒐-\ua4ce\ua4d0-\ua4feꔀ-\ua63eꙀ-\ua69e\ua6a0-\ua6fe꜀-\ua82e\ua830-\ua83eꡀ-\ua87e\ua880-\ua8de\ua8e0-\ua8fe꤀-\ua97e\ua980-\ua9deꨀ-\uaa7e\uaa80-\uaade\uaae0-\uaafe\uab00-\uab2e\uabc0-\uabfe가-\ud7ae\ud7b0-\ud7fe\ud806-\ud807\ud80a-\ud80b\ud80e-\ud819\ud81c-\ud82b\ud82d-\ud833\ud836-\ud83a\ud83e-\ud83f\ud86f-\ud87d\ud87f-\udb3f\udb41-\udb7f\udc00-\ufafeﬀ-\ufdfe\ufe00-\ufe1e\ufe20-\ufe2e︰-\ufe6eﹰ-￮\ufff0-\ufffe]|[\ud80c\ud835\ud840-\ud868\ud86a-\ud86c\udb80-\udbbe\udbc0-\udbfe][\udc00-\udfff]|\ud800[\udc00-\udc7e\udc80-\udcfe\udd00-\udd8e\udd90-\uddce\uddd0-\uddfe\ude80-\ude9e\udea0-\udede\udf00-\udf2e\udf30-\udf4e\udf80-\udfde]|\ud801[\udc00-\udc4e\udc50-\udcae]|\ud802[\udc00-\udc5e\udd00-\udd3f\udd80-\udd9e\udda0-\uddfe\ude00-\ude5e\ude60-\ude7e\udf00-\udf3e\udf40-\udf5e\udf60-\udf7e]|\ud803[\udc00-\udc4e\ude60-\ude7e]|\ud804[\udc00-\udc7e\udc80-\udcce\udcd0-\udcfe\udd00-\udd4e\udd80-\uddde]|\ud805[\ude80-\udece]|\ud808[\udc00-\udffe]|\ud809[\udc00-\udc7e]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude3e]|\ud81b[\udf00-\udf9e]|\ud82c[\udc00-\udcfe]|\ud834[\udc00-\udcfe\udd00-\uddfe\ude00-\ude4e\udf00-\udf5e\udf60-\udf7e]|\ud83b[\ude00-\udefe]|\ud83c[\udc00-\udc2e\udc30-\udc9e\udca0-\udcfe\udd00-\uddfe\ude00-\udefe\udf00-\udfff]|\ud83d[\udc00-\uddfe\ude00-\ude4e\ude80-\udefe\udf00-\udf7e]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]|\udb40[\udc00-\udc7f\udd00-\uddef]|\udbbf[\udc00-\udffe]|\udbff[\udc00-\udffe]|[\ud800-\ud805\ud808-\ud809\ud80c-\ud80d\ud81a-\ud81b\ud82c\ud834-\ud835\ud83b-\ud83d\ud840-\ud86e\ud87e\udb40\udb80-\udbff]/g;
                let messageEnglishCharactersOnly = messageTrimmed.replace(exp, "")
                
                let newSentance = ""
                let singleWords = messageEnglishCharactersOnly.split(" ")
                singleWords.forEach(word => {
                    let isMisspelled = SpellChecker.isMisspelled(word)
                    if(isMisspelled) {
                        let replacementWord = SpellChecker.getCorrectionsForMisspelling(word)
                        if(replacementWord[0]) {
                            newSentance += " "+replacementWord[0]
                        } else {
                            newSentance += " ???"
                        }
                    } else {
                        if(word == "rape") {
                            newSentance += " ****"
                        } else {
                            newSentance += " "+word
                        }
                    }
                })
                var secondRound = newSentance.substring(1);
              

                let firstPass = swearjar.censor(secondRound);

                if(firstPass.length > 0) {

                    let thirdPass = filter.cleanHacked(firstPass)

                    this.instance.messageAll(new Notification(thirdPass, 'text', command.x, command.y))

                }
                
            }

        })

        this.instance.on('command::FireCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity

            if(command.color == "#00ff00") {
                let x = client.rawEntity.x + Math.floor(Math.random() * 200)
                let y = client.rawEntity.y + Math.floor(Math.random() * 200)
                command.x = x
                command.y = y
            }
            
            const flowerCommand = {x: command.x, y: command.y, color: command.color }

            

            let sticker = false 

            if (fire(rawEntity)) {
                let endX = command.x
                let endY = command.y

                this.artworks.forEach(artwork => {
                    let hitObstacle
                    if(artwork.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson") {
                        hitObstacle = CollisionSystem.checkLineCircle(rawEntity.x, rawEntity.y, command.x, command.y, artwork.collider.circle)
                    }
                    if (hitObstacle) {
                        endX = hitObstacle.x
                        endY = hitObstacle.y

                        artwork.sticker = parseInt(Math.random() * 100)
                        sticker = true
                    }
                })

                const timeAgo = client.latency + 100
                const hits = lagCompensatedHitscanCheck(this.instance, rawEntity.x, rawEntity.y, endX, endY, timeAgo)


                /*for (let box of this.boxes.values()) {

                    if(box.type == "soccer-ball") {

                        if(Math.abs(rawEntity.x - box.body.position[0]) <= 120 && Math.abs(rawEntity.y - box.body.position[1]) <= 120) {

                                rawEntity.justFired = true

                                //console.log('tester')
                            
                                let XForce = command.x/30000
                                let yForce = command.y/30000
                                
                                XForce = 0.05 
                                yForce = -0.05

                                box.body.applyImpulse([XForce,yForce],[command.x, command.y])

                        }
                     }
                    
                }*/
               
                //console.log('checker')
                hits.forEach(victim => {
                    
                    if (victim.nid !== rawEntity.nid && victim.nid !== smoothEntity.nid) {
                        damagePlayer(victim, 25)
                        victim.sticker = parseInt(Math.random() * 100)
                        sticker = true
                    }
                })

                if(sticker == false) {
                    addFlower(this.instance, flowerCommand, this.flowers)
                }
                

           

                this.instance.addLocalMessage(new WeaponFired(smoothEntity.nid, smoothEntity.x, smoothEntity.y, command.x, command.y))
            }
       
        })
    }

   
    async addIdentity(doc, creds, command) {

        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo(); 

        const guestBook = doc.sheetsByIndex[0]; 
        let joinTime = Date.now();
        
        guestBook.headerValues = ['name', 'avatar', 'color', 'joined']

        await guestBook.addRow({ 
            name: ''+command.name+'', 
            avatar: ''+command.avatar+'', 
            color: ''+command.color+'',
            joined: ''+joinTime+''
        });

        
    }

    joinSession(command, client, doc, creds, login) {

            if(login == false) {
                this.addIdentity(doc, creds, command)
            }

            const name = command.name
            

            //remove duplicate characters over 2
            let nameTrimmed = name.replace(/(.)\1{2,}/g, '$1$1')

            //the regex motherlode 
            var exp = /[\u0000-\u001f-[-`{-þĀ-žƀ-Ɏɐ-ʮʰ-ϾЀ-ӾԀ-\u052e\u0530-\u058e\u0590-\u05fe\u0600-\u07be߀-\u07fe\u0800-\u083e\u0840-\u085e\u08a0-\u08fe\u0900-\u09fe\u0a00-\u0a7e\u0a80-\u0afe\u0b00-\u0b7e\u0b80-\u0bfe\u0c00-\u0cfe\u0d00-\u0dfe\u0e00-\u0e7e\u0e80-\u0efeༀ-\u0ffeက-\u10feᄀ-\u11feሀ-\u137eᎀ-\u139eᎠ-\u13fe\u1400-\u167e\u1680-\u169eᚠ-\u16feᜀ-\u171eᜠ-\u173eᝀ-\u175eᝠ-\u177eក-\u17fe᠀-\u18ae\u18b0-\u18feᤀ-\u197eᦀ-\u1aae\u1b00-\u1b7e\u1b80-\u1bbe\u1bc0-\u1bfeᰀ-᱿\u1cc0-\u1cce\u1cd0-\u1cfeᴀ-ᵾᶀ-Ỿἀ-῾\u2000-\u209e₠-\u20ce\u20d0-\u20fe℀-\u218e←-\u23fe␀-\u243e⑀-\u245e①-\u26fe\u2700-➾⟀-\u2bfeⰀ-ⱞⱠ-\u2c7eⲀ-\u2d2eⴰ-\u2d7eⶀ-ⷞ\u2de0-\u2e7e⺀-\u2efe⼀-\u2fde⿰-\u2ffe\u3000-\u312e\u3130-ㆎ㆐-\u31be㇀-\u31eeㇰ-㋾㌀-\u4dbe䷀-\u9ffeꀀ-\ua48e꒐-\ua4ce\ua4d0-\ua4feꔀ-\ua63eꙀ-\ua69e\ua6a0-\ua6fe꜀-\ua82e\ua830-\ua83eꡀ-\ua87e\ua880-\ua8de\ua8e0-\ua8fe꤀-\ua97e\ua980-\ua9deꨀ-\uaa7e\uaa80-\uaade\uaae0-\uaafe\uab00-\uab2e\uabc0-\uabfe가-\ud7ae\ud7b0-\ud7fe\ud806-\ud807\ud80a-\ud80b\ud80e-\ud819\ud81c-\ud82b\ud82d-\ud833\ud836-\ud83a\ud83e-\ud83f\ud86f-\ud87d\ud87f-\udb3f\udb41-\udb7f\udc00-\ufafeﬀ-\ufdfe\ufe00-\ufe1e\ufe20-\ufe2e︰-\ufe6eﹰ-￮\ufff0-\ufffe]|[\ud80c\ud835\ud840-\ud868\ud86a-\ud86c\udb80-\udbbe\udbc0-\udbfe][\udc00-\udfff]|\ud800[\udc00-\udc7e\udc80-\udcfe\udd00-\udd8e\udd90-\uddce\uddd0-\uddfe\ude80-\ude9e\udea0-\udede\udf00-\udf2e\udf30-\udf4e\udf80-\udfde]|\ud801[\udc00-\udc4e\udc50-\udcae]|\ud802[\udc00-\udc5e\udd00-\udd3f\udd80-\udd9e\udda0-\uddfe\ude00-\ude5e\ude60-\ude7e\udf00-\udf3e\udf40-\udf5e\udf60-\udf7e]|\ud803[\udc00-\udc4e\ude60-\ude7e]|\ud804[\udc00-\udc7e\udc80-\udcce\udcd0-\udcfe\udd00-\udd4e\udd80-\uddde]|\ud805[\ude80-\udece]|\ud808[\udc00-\udffe]|\ud809[\udc00-\udc7e]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude3e]|\ud81b[\udf00-\udf9e]|\ud82c[\udc00-\udcfe]|\ud834[\udc00-\udcfe\udd00-\uddfe\ude00-\ude4e\udf00-\udf5e\udf60-\udf7e]|\ud83b[\ude00-\udefe]|\ud83c[\udc00-\udc2e\udc30-\udc9e\udca0-\udcfe\udd00-\uddfe\ude00-\udefe\udf00-\udfff]|\ud83d[\udc00-\uddfe\ude00-\ude4e\ude80-\udefe\udf00-\udf7e]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]|\udb40[\udc00-\udc7f\udd00-\uddef]|\udbbf[\udc00-\udffe]|\udbff[\udc00-\udffe]|[\ud800-\ud805\ud808-\ud809\ud80c-\ud80d\ud81a-\ud81b\ud82c\ud834-\ud835\ud83b-\ud83d\ud840-\ud86e\ud87e\udb40\udb80-\udbff]/g;
            let nameEnglishCharactersOnly = nameTrimmed.replace(exp, "")
            
            let newName = ""
            let singleName = nameEnglishCharactersOnly.split(" ")
            singleName.forEach(word => {
                let isMisspelled = SpellChecker.isMisspelled(word)
                if(isMisspelled) {
                    let replacementWord = SpellChecker.getCorrectionsForMisspelling(word)
                    if(replacementWord[0]) {
                        newName += " "+replacementWord[0]
                    } else {
                        newName += " ???"
                    }
                } else {
                    if(word == "rape") {
                        newName += " ****"
                    } else {
                        newName += " "+word
                    }
                }
            })
            let givenName = newName.substring(1);
            //console.log("name:"+givenName)
            givenName = swearjar.censor(givenName);

            const rawEntity = new PlayerCharacter({ self: true, avatar: ""+command.avatar+"", color: ""+command.color+"", floor: command.floor })
            const smoothEntity = new PlayerCharacter({ self: false, avatar: ""+command.avatar+"", color: ""+command.color+"", floor: command.floor })

            rawEntity.client = client
            client.rawEntity = rawEntity
            
            smoothEntity.client = client
            client.smoothEntity = smoothEntity

            client.sleepTimer = 1

            const peerID = client.peerID;

            let spawnX = 2400
            let spawnY = 1950

            //2402&y=1947

            if(!isNaN(command.x)) {
                rawEntity.x = Number(command.x)
            } else {
                rawEntity.x = spawnX
            }
            if(!isNaN(command.y)) {
                rawEntity.y = Number(command.y)
            } else {
                rawEntity.y = spawnY
            }
            
            if(!isNaN(command.x)) {
                smoothEntity.x = Number(command.x)
            } else {
                smoothEntity.x = spawnX
            }
            if(!isNaN(command.y)) {
                smoothEntity.y = Number(command.y)
            } else {
                smoothEntity.y = spawnY
            }

            //console.log(command.x, command.y)


            this.world.addBody(rawEntity.body);
            this.instance.addEntity(rawEntity)
            client.channel.addEntity(rawEntity)

            smoothEntity.collidable = true
            this.instance.addEntity(smoothEntity)

             
            smoothEntity.name = givenName
            rawEntity.name = givenName
            client.name = givenName

            smoothEntity.avatar = command.avatar
            rawEntity.avatar = command.avatar
            client.avatar = command.avatar

            smoothEntity.color = command.color
            rawEntity.color = command.color
            client.color = command.color

            smoothEntity.isAlive = true;
            rawEntity.isAlive = true;
            
            
            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid, ""+peerID+"", ""+ command.avatar +"",""+ givenName +"", ""+ command.color +""), client)
            this.instance.messageAll(new Notification(''+ command.name +'', 'personJoined', 20, 20))

            //this.instance.addLocalMessage(new Walking(client.smoothEntity.nid, client.color, client.smoothEntity.rotation, rawEntity.x, rawEntity.y))


            this.totalUsers++
            this.activeUsers.push({name: command.name})

           

            
    }
    update(delta, tick, now) {
        this.instance.emitCommands()

        this.instance.clients.forEach(client => {

            if(client.rawEntity) {
                
                if(!client.rawEntity.headphones) {
                    client.view.x = client.rawEntity.x
                    client.view.y = client.rawEntity.y
                    
                    client.rawEntity.body.position[0] = client.rawEntity.x
                    client.rawEntity.body.position[1] = client.rawEntity.y
    
                    client.rawEntity.body.angle = client.rawEntity.rotation
                    client.sleepTimer++

                } else {

                }

                if(client.sleepTimer > 60) {
                    //client.rawEntity.sleeping = true
                    client.smoothEntity.sleeping = true
                }
                
               
            }
            
            const smoothEntity = client.smoothEntity
            if (smoothEntity) {
                const maximumMovementPerFrameInPixels = 410 * delta
                followPath(smoothEntity, client.positions, maximumMovementPerFrameInPixels)
            }

            //console.log(client.sleepTimer)

        })

        //Start Art
        this.instance.clients.forEach(client => {

            let touching = false

            for (let artwork of this.artworks.values()) {

               if(client.rawEntity) {

                   let collided = false

                   if(artwork.collider.polygon) {
                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, artwork.collider.polygon) 
                   } else {
                        collided = SAT.testCircleCircle(client.rawEntity.collider.circle, artwork.collider.circle) 
                        
                   }
                   
                   
                   if(collided == true) {

                        let directionVertical, directionHorizontal

                        console.log('checker')

                        if(client.rawEntity.x < artwork.x - artwork.width/2) {
                            directionHorizontal = 1
                        } else if (client.rawEntity.x > artwork.x + artwork.width/2) {
                            directionHorizontal = 2
                        } 

                        if(client.rawEntity.y < artwork.y - artwork.height/2) {
                            directionVertical = 1
                        } else if (client.rawEntity.y > (artwork.y + artwork.height/2)) {
                            directionVertical = 2
                        } 

                        if(artwork.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson") {
                            this.artworks.forEach(artwork => {
                
                                if(artwork.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson") {
                                    
                                    client.rawEntity.headphones = true
                                    client.smoothEntity.headphones = true


                                    let xPosition
                                    let yPosition
                                    
                                    let xOffset = 150 * Math.sin(client.rawEntity.seat)
                                    let yOffset = 150 * Math.cos(client.rawEntity.seat)
                                    let offsetWorld = p2.vec2
                                    artwork.body.vectorToWorldFrame(offsetWorld, [xOffset,yOffset])
                                    console.log(offsetWorld)
                                    
                                    xPosition = artwork.collider.circle.pos.x + offsetWorld[0]
                                    yPosition = artwork.collider.circle.pos.y + offsetWorld[1]
                                    

                                    console.log(artwork.collider)

                                    client.rawEntity.x = xPosition
                                    client.rawEntity.y = yPosition
                                    
                                    client.smoothEntity.x = xPosition
                                    client.smoothEntity.y = yPosition

                                    const dx = 950 -  client.rawEntity.x
                                    const dy = 1980 -  client.rawEntity.y
                                    const rotation = Math.atan2(dy, dx)
                                    //client.rawEntity.rotation = rotation
                                    //client.smoothEntity.rotation = rotation


                                }
                            })
                        }

                      

                        
                        this.instance.message(new Notification(artwork.name, 'showStartArtButton', directionHorizontal, directionVertical), client)
                    
                        touching = true

                        break

                   } else {
                        
                   }
          
               }

           }

           if(touching == false) {
            this.instance.message(new Notification("uo!", 'hideStartArtButton'), client)
          }


       })




       


    this.instance.clients.forEach(client => {

        for (let infoPanel of this.infoPanels.values()) {

            if(client.smoothEntity) {

                let thisClient = client.rawEntity

                var a = thisClient.x - infoPanel.x;
                var b = thisClient.y - infoPanel.y
                var c = Math.sqrt( a*a + b*b );

                if(c < 100) {

                    let x = infoPanel.collider.x
                    let y = infoPanel.collider.y

                    infoPanel.light = c

                    this.instance.message(new Notification(infoPanel.name, 'showQuoteButton', x, y), client)
                    
                }
            }

        }

    })

        

        this.world.step(1/20);

        
       

        this.artworks.forEach(artwork => {

            
            artwork.x = artwork.body.position[0]
            artwork.y = artwork.body.position[1]
            artwork.rotation = artwork.body.angle 
            
            
            
        })

        this.artworks.forEach(artwork => {
            
            if(artwork.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson") {

                artwork.body.angle += 0.02
               
            }
        })

        this.obstacles.forEach(obstacle => {
            
            //obstacle.angle = obstacle.body.angle 

            
        })




        this.infoPanels.forEach(infoPanel => {
            
            infoPanel.x = infoPanel.body.position[0]
            infoPanel.y = infoPanel.body.position[1]
            infoPanel.rotation = infoPanel.body.angle 
            
            
        })

        //Floor Triggers
        this.instance.clients.forEach(client => {
            if(client.rawEntity) {
                
                for (let obstacle of this.obstacles.values()) {
                    let collided = false
                    if(obstacle.name == "johannBlocker") {
                        collided = SAT.testCircleCircle(client.rawEntity.collider.circle, obstacle.collider.circle)
                    } else {
                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, obstacle.collider.polygon)
                    }
                    
                    if(collided) {
                        if(obstacle.name == "stairsUp" && client.rawEntity.floor == 0) {
                            client.rawEntity.floor = 1
                        }
                    }
                    if(collided) {
                        if(obstacle.name == "stairsDown" && client.rawEntity.floor == 1) {
                            client.rawEntity.floor = 0
                        }
                    }

                    
                }
            }

        })


        //Floor Triggers
        this.instance.clients.forEach(client => {
            if(client.rawEntity) {
                
                for (let box of this.boxes.values()) {
                    if(box.name == "mushonKiller") {
                        let collided = false
                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, box.collider.polygon)
                        if(collided) {
                            
                                client.rawEntity.isAlive = false

                                setTimeout(function(){
                                    client.rawEntity.x = 3014
                                    client.rawEntity.y = 725
                                    client.rawEntity.isAlive = true
                                }, 1000)
                            
                            }
                        }
                }
            }

        })

        

        //this.boxes.forEach

        this.boxes.forEach((box, index) => {
            
            box.x = box.body.position[0]
            box.y = box.body.position[1]
            box.rotation = box.body.angle 

            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
            box.body.force[0] += 0.1 * Math.random() * plusOrMinus
            box.body.force[1] += 0.1 * Math.random() * plusOrMinus2
        

            if(box.name == "mushonKiller") {
                //box.y = box.body.position[1]
                let position = tick + box.offset
                let speed = 20 * box.speedAdjust
                let movement = Math.sin(position/speed) * 350
                //console.log(box.offset)
                box.y = movement + 700
            }
             
            
        })
        

        
        this.timeDebounceTimer++
        if(this.timeDebounceTimer > 20) {
            this.instance.messageAll(new Notification(""+(this.world.time.toFixed())+"", 'worldInfoTime'))
            this.instance.messageAll(new Notification(""+this.totalUsers+"", 'worldInfoTotalUsers'))
            this.instance.messageAll(new Notification(""+this.activeUsers.length+"", 'worldInfoActiveUsers'))
            this.timeDebounceTimer = 0
        }
        

        this.instance.update()
    }
}

export default GameInstance
