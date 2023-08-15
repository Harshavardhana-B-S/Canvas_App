let menu=document.querySelector(".menu-cont");
let options_bar=document.querySelector(".options-cont");
let pencil_options_bar=document.querySelector(".pencil-options-cont");
let pencil=document.querySelector(".pencil");
let menu_flag=true;
let pencil_flag=true;

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
}

pencil.addEventListener("click",(e)=>{
    pencil_flag = !pencil_flag;

    if(pencil_flag)
    pencil_options_bar.style.display="block";
    else 
    pencil_options_bar.style.display="none";
})
