export function displayDialog(text,onDisplayed){
    const dialogueUI=document.getElementById("textbox-container");
    const dialog=document.getElementById("dialog");
    dialogueUI.style.display="block";
    let index=0;
    let currentText="";
    const interval=setInterval(()=>{
        if(index<text.length)
        {
            currentText+=text[index++];
            dialog.innerHTML=currentText;
            return;
        }
        clearInterval(interval);
    },5);
    const closebtn=document.getElementById("close-btn");
    function onClose()
    {
        onDisplayed();
        dialogueUI.style.display="none";
        currentText="";
        index=0;
        dialog.innerHTML="";
        clearInterval(interval);
        closebtn.removeEventListener("click",onClose);
    }
    closebtn.addEventListener("click",onClose);
}