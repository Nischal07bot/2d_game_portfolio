import {k} from "./kaboomCtx.js"
import {scaleFactor} from "./constant.js"
import {displayDialog} from "./utils.js"
import {setcamScale} from "./utils.js"
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
    const map=k.add([
        k.sprite("map"),
        k.pos(0),
        k.scale(scaleFactor)
    ]);
    const player=k.make([
        k.sprite("spritesheet",{anim:"idle-down"}),
        k.area({
            shape:new k.Rect(k.vec2(0,3),10,10),//vector coordinate x and y on the origin and +3 from the x axis 
        }),
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
    ]);

    for(const layer of layers){
        if(layer.name === "boundaries"){
            for(const boundary of layer.objects){
                map.add([
                    k.area({
                        shape:new k.Rect(k.vec2(0),boundary.width,boundary.height),
                    }),
                    k.body({isStatic:true}),
                    k.pos(boundary.x,boundary.y),
                    boundary.name,
                ]);

                console.log(boundary.name);
                if(boundary.name)
                {
                    player.onCollide(boundary.name,()=>{
                        player.isInDialog=true;
                        displayDialog("TODO",()=>{
                            player.isInDialog=false;
                        })
                    })
                }

            }
            continue;
        }
        if(layer.name==="spawnpoints")
        {
            for(const entity of layer.objects)
            {
                //only one entity here but there can be many 
                if(entity.name === "player")
                {
                    console.log(entity.name);
                    player.pos=k.vec2((map.pos.x+entity.x)*scaleFactor,
                    (map.pos.y+entity.y)*scaleFactor);
                    k.add(player);
                }
            }
        }
    }
    setcamScale(k);
    k.onResize(()=>{
        setcamScale(k);
    })
    k.onUpdate(()=>{
        k.camPos(player.pos.x,player.pos.y+50);
        
    })
    k.onMouseDown((mouseBtn)=>{
        if(mouseBtn !== "left" || player.isInDialog) return;
        const worldMousePos=k.toWorld(k.mousePos());
        player.moveTo(worldMousePos,player.speed);
        const mouseAngle=player.pos.angle(worldMousePos);
        const lowerBound=50;
        const upperBound=125;

        if(mouseAngle>lowerBound && mouseAngle<upperBound && player.currentAnim !=="walk-up")
        {
            player.play("walk-up");;
            player.direction="up";
            return;
        }
        if(mouseAngle<-lowerBound && mouseAngle>-upperBound && player.currentAnim !=="walk-down")
        {
            player.play("walk-down");
            player.direction="down";
            return;
        }
        if(Math.abs(mouseAngle)>upperBound)
        {
            player.flipX=false;
            if(player.currentAnim !=="walk-side") player.play("walk-side");
            player.direction="side";
            return;
        }
        if(Math.abs(mouseAngle)<lowerBound)
        {
            player.flipX=true;
            if(player.currentAnim !=="walk-side") player.play("walk-side");
            player.direction="side";
            return;
        }
    })
    k.onMouseRelease(()=>{
        if(player.direction === "down")
        {
            player.play("idle-down");
            return;
        }
        if(player.direction === "up")
        {
            player.play("idle-up");
            return;
        }
        player.play("idle-side");
    })
})
k.go("main");