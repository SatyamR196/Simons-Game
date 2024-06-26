//This is my modified version,where at every level new set of button will flash and you have to repeat it.
//for level 1 ,1 btn will flash ,for l2 2 random btn will flash and you have to repeat it ....
let gameSeq=[];
let userSeq=[];
let Started=false;
let level=0;
let btnColor=["Red","Green","Orange","Blue"];

let body =document.querySelector("body");
let h3 =document.querySelector("h3");
let h1 =document.querySelector("h1");
let B= document.querySelectorAll(".btn");

h1.innerText="Simon Game V2";

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
    body.style.backgroundColor="lightgreen";
    setTimeout(function(){
        body.style.backgroundColor="white";
    },200);
    userSeq=[];
    gameSeq=[];
    level++;
    h3.innerText=`level ${level}`;
    for(let i=0;i<level;i++){
        setTimeout(function(){
            randInd=Math.floor(Math.random()*4);
            console.log(btnColor[randInd]);
            btnFlash(B[randInd]);
            gameSeq.push(btnColor[randInd]);
            console.log(gameSeq);
            //problem: all are flashing at the same time => solution replace 500 by 500*(i+1)
            //this is becasue the The setTimeout function is asynchronous, which means it doesn’t
            //block the rest of the code from executing. So, when you call setTimeout inside a loop,
            //it schedules the callback function (in this case, btnFlash(B[i])) to run after the 
            //specified delay (1000 milliseconds), but it doesn’t pause the loop. The loop continues
            // to run and increments i on each iteration
        },500*(i+1));
    }   
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
                    h3.innerHTML=`<b>GAME OVER !</b> Your level is ${level} & Score is ${((2*1)+(level-2))*((level-1)/2)} <br>
                    <i>Press Space key to Start</i>`;
                    reset();
                    // Started=false;
                }
            
            console.log("4");
            }

    });
}

function reset(){
    body.style.backgroundColor="lightsalmon";
    setTimeout(function(){
        body.style.backgroundColor="white";
    },200);
    gameSeq=[];
    userSeq=[];
    level=0;
    Started=false;
}