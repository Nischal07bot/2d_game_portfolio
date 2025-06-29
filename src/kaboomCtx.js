import kaboom from "kaboom";
export const k=kaboom({
    global:false,
    touchToMouse:true,
    canvas:document.getElementById("game"),
})//context of kaboom is the global object of kaboom