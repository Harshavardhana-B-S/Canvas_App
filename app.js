let menu=document.querySelector(".menu-cont");
let options_bar=document.querySelector(".options-cont");

let pencil_options_bar=document.querySelector(".pencil-options-cont");
let pencil=document.querySelector(".pencil");
let menu_flag=true;
let pencil_flag=true;

let eraser_flag=true;
let eraser=document.querySelector(".eraser");
let eraser_options_bar=document.querySelector(".eraser-option-cont");

let sticky_text_flag=true;
let sticky=document.querySelector(".sticky");

let upload=document.querySelector(".upload");

// let menu_flag=true;
menu.addEventListener("click",(e)=>{
    menu_flag = !menu_flag;
    if(menu_flag)
    openTools();
    else 
    closeTools();
})

function openTools(){
    let iconTag= menu.children[0];
    iconTag.classList.remove("fa-times");
    iconTag.classList.add("fa-bars");
    options_bar.style.display = "flex";
}

function closeTools(){
    let iconTag=menu.children[0];
    iconTag.classList.remove("fa-bars");
    iconTag.classList.add("fa-times");
    options_bar.style.display = "none";

    pencil_options_bar.style.display="none";
    eraser_options_bar.style.display="none";
}

pencil.addEventListener("click",(e)=>{
    pencil_flag = !pencil_flag;

    if(pencil_flag)
    pencil_options_bar.style.display="block";
    else 
    pencil_options_bar.style.display="none";
})

eraser.addEventListener("click",(e)=>{
    eraser_flag = !eraser_flag;

    if(eraser_flag)
    eraser_options_bar.style.display="block";
    else 
    eraser_options_bar.style.display="none";
})


sticky.addEventListener("click",(e)=>{

    let sticky_template=
    `
    <div class="sticky-header">
            <div class="minimize-sticky"></div>
            <div class="close-sticky"></div>
    </div>
    <div class="text-area">
            <textarea></textarea>
    </div> 
    `;

    let stickyCont = document.createElement("div");
    
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = sticky_template;
    document.body.appendChild(stickyCont);


    let minimize = stickyCont.querySelector(".minimize-sticky");
    let remove = stickyCont.querySelector(".close-sticky");
    let textarea=stickyCont.querySelector(".text-area");

    notesActions(stickyCont,remove,minimize,textarea);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
})





upload.addEventListener("click",(e)=>{
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let sticky_template = `
        <div class="sticky-header">
            <div class="minimize-sticky"></div>
            <div class="close-sticky"></div>
    </div>
        <div class="text-area">
            <img  src="${url}"/>
        </div>
        `;

    let stickyCont = document.createElement("div");
    
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = sticky_template;
    document.body.appendChild(stickyCont);


    let minimize = stickyCont.querySelector(".minimize-sticky");
    let remove = stickyCont.querySelector(".close-sticky");
    let textarea=stickyCont.querySelector(".text-area");

    notesActions(stickyCont,remove,minimize,textarea);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
        
    })
})

function notesActions(sticky_cont,remove,minimize,textarea){

    remove.addEventListener("click",(e)=>{
        sticky_cont.remove();
    });

    minimize.addEventListener("click",(e)=>{
        sticky_text_flag = !sticky_text_flag;
    if(sticky_text_flag)
    textarea.style.display="none";
    else
    textarea.style.display="block";
    
    });
 
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}