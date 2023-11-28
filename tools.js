let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let mouseDownFlag=false;
let pencilColorEle=document.querySelectorAll(".pencil-color");
let pencilWidthELe=document.querySelector(".pencil-width");

let eraserWidthElem=document.querySelector(".eraserWidth");

let penColor="Red";
let penWidth=3;
let eraserColor="White";
let eraserWidth="3";

let downloadElm=document.querySelector(".download");


let undoRedo=[];
let redo=document.querySelector(".redo");
let undo=document.querySelector(".undo");
let track=0;


//API

let tool=canvas.getContext("2d");


pencilColorEle.forEach((colorEle)=>{
   colorEle.addEventListener("click",(e)=>{
     penColor=colorEle.classList[0];

    tool.strokeStyle=penColor;
   })
})

pencilWidthELe.addEventListener("input",(e)=>{
    penWidth=pencilWidthELe.value;  
    tool.lineWidth=penWidth;
})

eraserWidthElem.addEventListener("input",(e)=>{
    eraserWidth=eraserWidthElem.value;
    tool.lineWidth=eraserWidth+2;
})

eraser.addEventListener("click",(e)=>{
    if(eraser_flag){
        tool.strokeStyle=eraserColor;
        tool.lineWidth=eraserWidth;
    }else{
        tool.strokeStyle=penColor;
        tool.lineWidth=penWidth;

    }
})


canvas.addEventListener("mousedown",(e)=>{
    mouseDownFlag=true;
    beginPath({
        x:e.clientX,
        y:e.clientY,
    })
})

canvas.addEventListener("mousemove",(e)=>{
    if(mouseDownFlag){
        drawStroke({
            x:e.clientX,
            y:e.clientY,
        })
    }
})

canvas.addEventListener("mouseup",(e)=>{
    mouseDownFlag=false;

    let url = canvas.toDataURL();
    undoRedo.push(url);
    track = undoRedo.length-1;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}

downloadElm.addEventListener("click",(e)=>{
    let url=canvas.toDataURL();

    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})

redo.addEventListener("click",(e)=>{
    if(track<undoRedo.length-1)
    track++;

    let data={
        trackValue:track,
        undoRedo
    };

   
    undoRedoFeature(data);

})

undo.addEventListener("click",(e)=>{
    if(track>0)
    track--;

    let data={
        trackValue:track,
        undoRedo
    };
   

    undoRedoFeature(data);

})

function undoRedoFeature(trackObj){

    track=trackObj.trackValue;
    undoRedo=trackObj.undoRedo;

    let url = undoRedo[track];
    let img = new Image(); 
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
