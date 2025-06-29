import {k} from "./kaboomCtx.js"
k.loadSprite("spritesheet","./spritesheet.png",{
    sliceX:39,//since there are 624 and when the each frame=16*16 tile therefore 624/16 that no. of frames on the x axis we got
    sliceY:31,//every frame is 16*16 tile height of the image /16 and u get the no. of frames on the y axis
    anims:{
        "idle-down":936,
        "walk-down":{from :936,to: 939,loop:true,speed:8},
        "idle-side":975,
        "walk-side":{from:975,to:978,loop:true,speed:8},//flip the character for the left side this is right side
        "idle-up":1014,
        "walk-up":{from:1014,to:1017,loop:true,speed:8},//speed is the frame rate loop set to true depedns on us when to stop 
    }
});
