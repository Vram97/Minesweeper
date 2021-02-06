/* Example Javascript file for minesweeper project */

document.addEventListener("DOMContentLoaded",()=>{
  // Page content has Loaded!
  console.log("Minesweeper Loaded!");
});

firstMove="yes";
difficulties=["Easy","Medium","Hard"];
diffLevels=difficulties.length;
squareWidth=40;
row=10;
column=10;
var grid;
time=60;
timer=document.createElement("div");
timer.id="mydiv";
bombCount=0;
bombRadius=10;
gameOver=false;

function diffOptions() {
    gameStart=document.getElementById("xx");
    gameStart.style.display="none";
    for(let i=0;i<diffLevels;i++){
        let diff=document.createElement("button");
        diff.id=String(i);
        diff.className="selectDifficulty"
        diff.innerHTML=String(difficulties[i]);
        diff.addEventListener('click',difficultySelect);
        document.body.appendChild(diff);
        console.log("working...");
    }
};

function difficultySelect(){
    Difficulty= String(difficulties[this.id]);
    console.log(Difficulty);
    rectangle(Difficulty);
};

function rectangle(Difficulty){
    window.setInterval(Timedout, 1000);
    squareWidth=40;
    btn=document.getElementById("xx");
    btn.style.display="none";
    let start=document.getElementsByClassName("selectDifficulty");
    for(const item of start){
        item.style.display="none";
    }
    x = document.createElement("CANVAS");
    x.id="Maincanvas";
    x.width="400";
    x.height="400";
    grid = make2DArray(row,column);
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
          grid[i][j] = new Cell(i, j, squareWidth);
        }
    }
    if(Difficulty=="Easy"){
              for(bombCount=0;bombCount<30;bombCount++){
                  b=false;
                  for(i=0;b!=true;i++){
                      let randomBomb=grid[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)];
                      if(randomBomb.bomb==false){
                        randomBomb.bomb=true;
                        break;
                      }
                      else{
                          continue;
                      }               
                  }
              }
    }
    else if(Difficulty=="Medium"){
               for(bombCount=0;bombCount<50;bombCount++){
                    console.log("struggling")
                    b=false;
                    for(i=0;b!=true;i++){
                        let randomBomb=grid[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)];
                        if(randomBomb.bomb==false){
                          randomBomb.bomb=true;
                          break;
                        }
                        else{
                            continue;
                        }             
                    }
                }
    }
    else {
           for(bombCount=0;bombCount<70;bombCount++){
                b=false;
                for(i=0;b!=true;i++){
                    let randomBomb=grid[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)];
                    if(randomBomb.bomb==false){
                      randomBomb.bomb=true;
                      break;
                    }
                    else{
                        continue;
                    }                 
                }
            } 
            
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) { 
          squareWidth=40
          var ctx = x.getContext("2d");
          ctx.beginPath();
          ctx.rect(i*squareWidth, j*squareWidth, squareWidth,squareWidth);
          ctx.stroke();
          document.getElementById("main").appendChild(x);
          for (let k = i-1; k < i+2; k++) {
              if(k<0 || k>9) {
                  continue;
              }
              else {
                for (let l = j-1; l < j+2; l++) {
                    if(l<0 || l>9){
                        continue;
                    }
                    else {
                        if(grid[k][l].bomb==true && grid[k][l]!==grid[i][j]){
                               grid[i][j].neighborCount=grid[i][j].neighborCount +1
                        }
                    }
                }
              }
          }
        }
    }
    s=document.getElementById("main");
    s.addEventListener('click',Reveal);
    s.addEventListener('contextmenu',Flag);
};


function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };

function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.neighborCount = 0;
    this.bomb = false;
    this.revealed = false;
    this.flagged=false;
};

function Reveal(event){
    let xcord=parseInt(event.clientX/squareWidth);
    let ycord=parseInt(event.clientY/squareWidth);
    console.log(ycord,xcord);
    if(xcord<row && ycord<column && gameOver==false) {
        if(grid[xcord][ycord].bomb==true && firstMove=="no") {
            console.log("Game Over!");
            EndGame();
        }
        else if(grid[xcord][ycord].bomb==true && firstMove=="yes"){
            console.log("That was a bomb!");
            grid[xcord][ycord].bomb=false;
            for (let i = xcord-1; i < xcord+2; i++) {
               for (let j = ycord-1; j < ycord+2; j++) {
                  if(i<row && i>=0 && j<column && j>=0 && (i!=xcord && j!=ycord)){
                          grid[i][j].neighborCount=grid[i][j].neighborCount-1;
                    }
                }
            }
            firstMove="no";
            Reveal(event);
            if(Winner()==true){
                gameOver=true;
                playBtn=document.createElement("BUTTON");
                playBtn.innerHTML="PLAY AGAIN";
                playBtn.addEventListener("click", function (){location.reload()});
                document.getElementById("main").appendChild(playBtn);
                console.log("You won!");
            }
          }
        else{
              if(grid[xcord][ycord].neighborCount==0){
                  Openspace(xcord,ycord);
                  if(Winner()==true){
                    gameOver=true;
                    playBtn=document.createElement("BUTTON");
                    playBtn.innerHTML="PLAY AGAIN";
                    playBtn.addEventListener("click", function (){location.reload()});
                    document.getElementById("main").appendChild(playBtn);
                    console.log("You won!");
                  }
               }
               else{
                  DisplayNum(xcord,ycord);
                  if(Winner()==true){
                    gameOver=true;
                    playBtn=document.createElement("BUTTON");
                    playBtn.innerHTML="PLAY AGAIN";
                    playBtn.addEventListener("click", function (){location.reload()});
                    document.getElementById("main").appendChild(playBtn);
                    console.log("You won!");
                  }
               }
        }
    }

};


function EndGame() {
    for(i=0;i<row;i++) {
        for(j=0;j<column;j++) {
            if(grid[i][j].bomb==true) {
                    x=document.getElementById("Maincanvas");
                    ctx=x.getContext("2d");
                    ctx.beginPath()
                    ctx.strokeStyle="black";
                    ctx.arc(i*squareWidth+squareWidth/2, j*squareWidth+squareWidth/2, bombRadius,0,2*Math.PI);
                    ctx.fillStyle="black";
                    ctx.fill();
                    ctx.stroke();
                    document.getElementById("main").appendChild(x);
            }
        }
    }
    gameOver=true;
    retryBtn=document.createElement("BUTTON");
    retryBtn.innerHTML="RETRY";
    retryBtn.addEventListener("click", function (){location.reload()});
    document.getElementById("main").appendChild(retryBtn);
};

function Openspace(a,b){
    firstMove="no";
    if(0<=a<row && 0<=b<column){
        let xcord=a;
        let ycord=b;
        if(grid[xcord][ycord].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            if(grid[xcord][ycord].flagged==true){
                ctx.fillStyle="#FFFFFF";
                ctx.fillRect(xcord*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
                ctx.stroke();
                grid[xcord][ycord].flagged=false;
            }
            ctx.fillStyle="black";
            ctx.beginPath();
            ctx.fillRect(xcord*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
            ctx.stroke();
            Check(xcord,ycord);
        }
    }
    
};
function DisplayNum(a,b){
    firstMove="no";
    let xcord=a;
    let ycord=b;
    if(grid[xcord][ycord].revealed==false){
        x=document.getElementById("Maincanvas");
        ctx=x.getContext("2d");
        ctx.font = "20px Georgia";
        if(grid[xcord][ycord].flagged==true){
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(xcord*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
            ctx.strokeStyle="black";
            ctx.rect(xcord*squareWidth,ycord*squareWidth,squareWidth,squareWidth)
            ctx.stroke()
            grid[xcord][ycord].flagged=false;
        }
        ctx.beginPath();
        ctx.strokeStyle="red";
        ctx.strokeText(String(grid[xcord][ycord].neighborCount),xcord*squareWidth + squareWidth/2,ycord*squareWidth + squareWidth/2,40);
        ctx.stroke();
        grid[xcord][ycord].revealed=true;
        document.getElementById("main").appendChild(x);
    }
};

function Check(xcord,ycord){
    if(0<=ycord+1 && ycord+1<column && 0<=xcord && xcord<row){
        if(grid[xcord][ycord+1].bomb==false && grid[xcord][ycord+1].revealed==false && grid[xcord][ycord].neighborCount==0){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            if(grid[xcord][ycord+1].flagged==true){
                ctx.fillStyle="#FFFFFF";
                ctx.fillRect(xcord*squareWidth,(ycord+1)*squareWidth,squareWidth,squareWidth);
                ctx.stroke()
                grid[xcord][ycord+1].flagged=false;
            }
            ctx.fillStyle="black";
            ctx.beginPath();
            ctx.fillRect(xcord*squareWidth,(ycord+1)*squareWidth,squareWidth,squareWidth);
            ctx.stroke(); 
            grid[xcord][ycord+1].revealed=true;
            if(grid[xcord][ycord+1].neighborCount!==0){
                grid[xcord][ycord+1].revealed=false;
                DisplayNum(xcord,ycord+1);
            }
            Check(xcord,ycord+1);
        }
    }
    if(0<=ycord-1 && ycord-1<column && 0<=xcord && xcord<row){
        if(grid[xcord][ycord-1].bomb==false && grid[xcord][ycord].neighborCount==0 && grid[xcord][ycord-1].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            if(grid[xcord][ycord-1].flagged==true){
                ctx.fillStyle="#FFFFFF";
                ctx.fillRect(xcord*squareWidth,(ycord-1)*squareWidth,squareWidth);
                ctx.stroke()
                grid[xcord][ycord-1].flagged=false;
            }
            ctx.fillStyle="black";
            ctx.beginPath();
            ctx.fillRect(xcord*squareWidth,(ycord-1)*squareWidth,squareWidth,squareWidth);
            ctx.stroke();
            grid[xcord][ycord-1].revealed=true;
            if(grid[xcord][ycord-1].neighborCount!==0){
                grid[xcord][ycord-1].revealed=false;
                DisplayNum(xcord,ycord-1);
                
            }
            Check(xcord,ycord-1);
        }
        
    }
    if(0<=ycord && ycord<column && 0<=xcord+1 && xcord+1<row && grid[xcord+1][ycord].revealed==false){
        if(grid[xcord+1][ycord].bomb==false && grid[xcord][ycord].neighborCount==0 && grid[xcord+1][ycord].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            if(grid[xcord+1][ycord].flagged==true){
                ctx.fillStyle="#FFFFFF";
                ctx.fillRect((xcord+1)*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
                ctx.stroke()
                grid[xcord+1][ycord].flagged=false;
            }
            ctx.fillStyle="black";
            ctx.beginPath();
            ctx.fillRect((xcord+1)*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
            ctx.stroke();
            grid[xcord+1][ycord].revealed=true;
            if(grid[xcord+1][ycord].neighborCount!==0){
                grid[xcord+1][ycord].revealed=false;
                DisplayNum(xcord+1,ycord);
            }
            Check(xcord+1,ycord);
        }
    
        
    }
    if(0<=ycord && ycord<column && 0<=xcord-1 && xcord-1<row){
        if(grid[xcord-1][ycord].bomb==false && grid[xcord][ycord].neighborCount==0 && grid[xcord-1][ycord].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            if(grid[xcord-1][ycord].flagged==true){
                ctx.fillStyle="#FFFFFF";
                ctx.fillRect((xcord-1)*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
                ctx.stroke()
                grid[xcord-1][ycord].flagged=false;
            }
            ctx.fillStyle="black";
            ctx.beginPath();
            ctx.fillRect((xcord-1)*squareWidth,ycord*squareWidth,squareWidth,squareWidth);
            ctx.stroke();
            grid[xcord-1][ycord].revealed=true;
            if(grid[xcord-1][ycord].neighborCount!==0){
                grid[xcord-1][ycord].revealed=false;
                DisplayNum(xcord-1,ycord);
            }
            Check(xcord-1,ycord);
        }
        
    }
    
};

function Winner(){
    let count1=0
    let count2=0
    for(i=0;i<row;i++){
        for(j=0;j<column;j++){
            if(grid[i][j].bomb==false && grid[i][j].revealed==true){
                count1=count1+1
            }
            else if(grid[i][j].bomb==true && grid[i][j].revealed==false){
                count2=count2+1
            }
            else{
                count2=0;
                break;
            }
        }
    }
    if(count1+count2==100){
        return true;
    }
    else{
        return false;
    }

};

function Timedout(){
    if(gameOver==false){
        time=time-1;
        timer.innerHTML="Seconds Left:" + String(time);
        document.getElementById("main").appendChild(timer);
        if(time==0){
            alert("You have run out of time!");
            EndGame();
            gameOver=true;
            clearInterval();
        }
    }

};

function Flag(event){
    console.log("right click")
    event.preventDefault();
    let xcord=parseInt(event.clientX/squareWidth);
    let ycord=parseInt(event.clientY/squareWidth);
    if(grid[xcord][ycord].revealed==false && gameOver==false){
        x=document.getElementById("Maincanvas");
        var ctx = x.getContext("2d");
        ctx.beginPath();
        if(grid[xcord][ycord].flagged==false){
           ctx.fillStyle="yellow";
           grid[xcord][ycord].flagged=true;
           console.log("flag");
        }
        else{
           ctx.fillStyle='#FFFFFF';
           grid[xcord][ycord].flagged=false;
           console.log("unflag");
        }
        ctx.fillRect(xcord*squareWidth,ycord*squareWidth, 40, 40);
        ctx.strokeStyle="black";
        ctx.rect(xcord*squareWidth,ycord*squareWidth, 40, 40);
        ctx.stroke();
        document.getElementById("main").appendChild(x);
    }
    
}

