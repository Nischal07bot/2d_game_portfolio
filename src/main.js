import {k} from "./kaboomCtx.js"
import {scaleFactor} from "./constant.js"
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
k.loadSprite("map","./map.png")
k.setBackground(k.Color.fromHex("#31104f"));
k.scene("main",async () =>{
    const mapData=await (await fetch("./map.json")).json();
    const layers=mapData.layers;
    const map=k.make([
        k.sprite("map"),
        k.pos(0),
        k.scale(scaleFactor)
    ]);
    const player=k.make([
        k.sprite("spritesheet",{anim:"idle-down"},
            k.area({
            shape:new k.Rect(k.vec2(0,3),10,10),//vector coordinate x and y on the origin and +3 from the x axis 
          
        })),
        k.body(),//make the player a physical object 
        k.anchor("center"), //to make the x and y coordinate at the center
        k.pos(),
        k.scale(scaleFactor),
        {
            speed:250,
            direction:"down",
            isInDialog:false,
        },
        "player",
    ])
})
k.go("main");