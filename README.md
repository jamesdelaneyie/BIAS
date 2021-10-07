![screenshot-bias](https://github.com/jamesdelaneyie/BIAS/raw/science-gallery/public/images/screenshot-1.png)

# B.I.A.S. 

Bi-directional Intimate Ambient Space is a real-time 2d world. 

It's a place you can make. And then you can go there and interact with things and people. 

The founding pillars of the project are that lowering the visual fidelity of real time digital communication and building an interaction pallete suited to screen devices, and seeking to _faithly transpose_ IRL interactions into a screen-first world;

**V0.1.0 ALPHA IS LIVE:**
bias.jamesdelaney.ie

**Features**
* Identity creation
* 2D movement in a dual-collision world
* Text, emoji-blast, and voice chat
* Portals and triggers


*Show me what you got:*

```
nvm use 12
npm install
npm start
```

**TO DO FEATURES**:
* Collect / Hold Objects
* Draw / Leave Note In Space
* Admin Mode


BIAS is composed of warped and curropted versions of these masterful creations by folks who should be deeply thanked by all of us: 
* [nengi.js](https://github.com/timetocode/nengi) - Multiplayer Networking Engine AKA THE GOAT
* [p2.js](https://github.com/schteppe/p2.js/) – 2D Physics Library
* [PIXI.js](https://github.com/pixijs) — 2D WebGL Rendering Library
* [peerjs](https://github.com/peers/peerjs) - Peer to Peer Comms over WebRTC 
* [Virtual Joystick](https://github.com/endel/pixi-virtual-joystick)  — Joypad for PIXI
* [PUXI.js](https://github.com/pixijs/pixi-ui) — UI Framework for PIXI.js
* [@pixi/sound](https://github.com/pixijs/sound) — WebAudio API Library 
* [pixi-ease](https://github.com/davidfig/pixi-ease) — PIXI Animation Easing Library

**TO DO** 
Add important utilities to above

**Background** 
Being built right now in the open by James Delaney for Science Gallery Dublin's commision of "Can you build us an online gallery?" for their year-long season of exhibitions, events and education, questioning the social, psychological and technological aspects of bias in AI, Ethics, Trust and Justice.

**UI Builder Notes:**
* Each individual UI Element is a PUXI.Stage container
* Using one large PUXI.Stage doesn't allow click events to pass through to the world
* UI has two communication methods, a stream of data, and individual events
* STAGE -> WIDGETGROUP -> WIDGET -> GRAPHICS 

License: Open Source BSD-3-Clause
Presentation: https://bit.ly/3j3J77b

