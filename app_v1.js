let gameSeq=[];
let userSeq=[];
let Started=false;
let level=0;
let btnColor=["Red","Green","Orange","Blue"];

let body =document.querySelector("body");
let h3 =document.querySelector("h3");
let h1 =document.querySelector("h1");
let B= document.querySelectorAll(".btn");

h1.innerText="Simon Game V1";

body.addEventListener("keydown",function(event){
    console.log("key pressed");
    console.dir(event);
    if(event.code=="Space" && Started==false){
        console.log("Game Started");
        Started=true;
        levelUp();
    }

});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`level ${level}`;
        randInd=Math.floor(Math.random()*4);
        console.log(btnColor[randInd]);
        btnFlash(B[randInd]);
        gameSeq.push(btnColor[randInd]);
        console.log(gameSeq);
    
}

function seqMatch(){
    if(gameSeq.length>0){
    for(let i=0; i<gameSeq.length; i++){
        if(gameSeq[i]!=userSeq[i]){
            return 0;
        }
    }
    return 1;
}
else{
    return 0;
}
}

for(let i=0;i<4;i++) {
    B[i].addEventListener("click",function(){
        btnFlash(B[i]);
        userSeq.push(btnColor[i]);
        console.log(userSeq);

        if(Started==true && gameSeq.length==userSeq.length && userSeq.length>0){
    
            console.log("1");
            if (seqMatch()) {
                console.log("2");
                setTimeout(levelUp,500);
            } 
            else {
                console.log("3");
                h3.innerText=`GAME OVER ! Your level is ${level} & Score is ${((2*1)+(level-2))*((level-1)/2)}`;
                B[0].remove();B[1].remove();B[2].remove();B[3].remove();
                alert("Game is over Refresh page to start again");
                // Started=false;
            }
        
        console.log("4");
        }

    });
}