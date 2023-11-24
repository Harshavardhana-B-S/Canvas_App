let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let mouseDownFlag=false;
let pencilColor=document.querySelectorAll(".pencil-color");
//API
let tool=canvas.getContext("2d");
tool.strokeStyle="Blue";
tool.lineWidth="3";

// tool.beginPath();
// tool.moveTo(10,10);
// tool.lineTo(200,250);
// tool.stroke();

// tool.beginPath();
// tool.moveTo(200,250);
// tool.lineTo(310,250);
// tool.stroke();

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
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}