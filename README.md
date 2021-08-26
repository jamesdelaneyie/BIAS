![screenshot-bias](https://user-images.githubusercontent.com/5830894/130322063-39100c13-a738-43aa-a607-aa78ac564081.png)

# B.I.A.S. 

Bi-directional Intimate Ambient Space is a little real-time physical 2d social world. 

It's a place you make. You can go there and interaction with other people and things. 

The founding pillars of the project are that lowering the visual fidelity of real time digital communication and building an interaction pallete suited to screen devices, while at all times seeking to _faithly transpose_ IRL interactions into a screen-first world. 

For more information about where I'm coming at this from, check out this presentation: https://bit.ly/3j3J77b

*Show me what you got:*

```
nvm use 12
npm install
npm start
```

TO DO: A lot. I'll also try update this with some of the concepts and design choices as I build it.

BIAS is composed of warped and curropted versions of these masterful creations by folks who should be deeply thanked by all of us: 
* [nengi.js](https://github.com/timetocode/nengi)
* p2.js – @schteppe
* peerjs - 
* PIXI.js joypad  – @endel
* PUXI.js UI Framework – @bQvle @SukantPal

Being built right now in the open by James Delaney for Science Gallery Dublin's commision of "Can you build us an online gallery?" for their year-long season of exhibitions, events and education, questioning the social, psychological and technological aspects of bias in AI, Ethics, Trust and Justice.

**UI Builder Notes:**
* Each individual UI Element is a PUXI.Stage container
* Using one large PUXI.Stage doesn't allow click events to pass through to the world
* UI has two communication methods, a stream of data, and individual events
* STAGE -> WIDGETGROUP -> WIDGET -> GRAPHICS 

License: Open Source BSD-3-Clause

