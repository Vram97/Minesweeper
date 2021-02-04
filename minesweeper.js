/* Example Javascript file for minesweeper project */

document.addEventListener("DOMContentLoaded",()=>{
  // Page content has Loaded!
  console.log("Minesweeper Loaded!");
});

let difficulties=["Easy","Medium","Hard"];
var grid;
firstMove="yes";
gameOver=false;
bombCount=0;
time=60;

function diffOptions() {
    for(let i=0;i<3;i++){
        let diff=document.createElement("button");
        diff.id=String(i);
        diff.className="selectDifficulty"
        diff.innerHTML=String(difficulties[i]);
        diff.addEventListener('click',difficultySelect);
        document.body.appendChild(diff);
        console.log("working...")
    }
  };

function difficultySelect(){
    Difficulty= String(difficulties[this.id]);
    rectangle();
};

function rectangle(){
    window.setInterval(Timedout, 1000);
    w=40;
    btn=document.getElementById("xx");
    btn.style.display="none";
    let start=document.getElementsByClassName("selectDifficulty");
    for(const item of start){
        item.style.display="none";
    }
    let x = document.createElement("CANVAS");
    x.id="Maincanvas";
    x.width="400";
    x.height="400";
    grid = make2DArray(10,10);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          grid[i][j] = new Cell(i, j, w);
          if(Difficulty="Easy"){
            if(bombCount<30){
                if (Math.random()>=0.7){
                    grid[i][j].bomb=true;
                    bombCount=bombCount+1;
                }
            }
            
          }
          else if(Difficulty="Medium"){
            if (Math.random()>=0.5){
                if(bombCount<50){
                    grid[i][j].bomb=true;
                    bombCount=bombCount+1;
                }
            }
          }
          else {
            if(bombCount<70){
              if (Math.random()>=0.3){
                grid[i][j].bomb=true;
                bombCount=bombCount+1;
              }
            }
          }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) { 
          var ctx = x.getContext("2d");
          ctx.beginPath();
          ctx.rect(i*w, j*w, 40, 40);
          ctx.stroke();
          document.getElementById("sass").appendChild(x);
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
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
                        if(grid[k][l].bomb==true && grid[k][l]!==grid[i][j] ){
                               grid[i][j].neighborCount=grid[i][j].neighborCount +1
                        }
                    }
                }
              }
            }
        }
    };
    s=document.getElementById("sass");
    s.addEventListener('click',Reveal);
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
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.bomb = false;
    this.revealed = false;
};

function Reveal(event){
    let xcord=parseInt(event.clientX/40);
    let ycord=parseInt(event.clientY/40);
    console.log(xcord,ycord);
    if(xcord<=9 && ycord<=9 && gameOver==false) {
        if(grid[xcord][ycord].bomb==true && firstMove=="no") {
            console.log("Game Over!");
            EndGame();
        }
        else if(grid[xcord][ycord].bomb==true && firstMove=="yes"){
            grid[xcord][ycord].bomb=false;
            for (let i = xcord-1; i < xcord+2; i++) {
               for (let j = ycord-1; j < ycord+2; j++) {
                  if(i<=9 && i>=0 && j<=9 && j>=0){
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
                document.getElementById("sass").appendChild(playBtn);
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
                    document.getElementById("sass").appendChild(playBtn);
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
                    document.getElementById("sass").appendChild(playBtn);
                    console.log("You won!");
                  }
               }
        }
    }

};


function EndGame() {
    for(i=0;i<10;i++) {
        for(j=0;j<10;j++) {
            if(grid[i][j].bomb==true) {
                    x=document.getElementById("Maincanvas");
                    ctx=x.getContext("2d");
                    ctx.beginPath()
                    ctx.arc(i*w+w/2, j*w+w/2, 10,0,2*Math.PI);
                    ctx.fill();
                    ctx.stroke();
                    document.getElementById("sass").appendChild(x);
            }
        }
    }
    gameOver=true;
    retryBtn=document.createElement("BUTTON");
    retryBtn.innerHTML="RETRY";
    retryBtn.addEventListener("click", function (){location.reload()});
    document.getElementById("sass").appendChild(retryBtn);
};

function Openspace(a,b){
    firstMove="no";
    if(0<=a<10 && 0<=b<10){
        let xcord=a;
        let ycord=b;
        if(grid[xcord][ycord].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            ctx.strokeStyle="gray";
            ctx.beginPath();
            ctx.fillRect(xcord*w,ycord*w,40,40);
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
        ctx.strokeStyle="red";
        ctx.beginPath();
        ctx.strokeText(String(grid[xcord][ycord].neighborCount),xcord*w + w/2,ycord*w + w/2,40);
        ctx.stroke();
        grid[xcord][ycord].revealed=true;
        document.getElementById("sass").appendChild(x);
    }
};

function Check(xcord,ycord){
    if(0<=ycord+1 && ycord+1<10 && 0<=xcord && xcord<10){
        if(grid[xcord][ycord+1].bomb==false && grid[xcord][ycord+1].revealed==false && grid[xcord][ycord].neighborCount==0){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            ctx.strokeStyle="grey";
            ctx.beginPath();
            ctx.fillRect(xcord*w,(ycord+1)*w,40,40);
            ctx.stroke(); 
            grid[xcord][ycord+1].revealed=true;
            if(grid[xcord][ycord+1].neighborCount!==0){
                grid[xcord][ycord+1].revealed=false;
                DisplayNum(xcord,ycord+1);
            }
            Check(xcord,ycord+1);
        }
    }
    if(0<=ycord-1 && ycord-1<10 && 0<=xcord && xcord<10){
        if(grid[xcord][ycord-1].bomb==false && grid[xcord][ycord].neighborCount==0 && grid[xcord][ycord-1].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            ctx.strokeStyle="grey";
            ctx.beginPath();
            ctx.fillRect(xcord*w,(ycord-1)*w,40,40);
            ctx.stroke();
            grid[xcord][ycord-1].revealed=true;
            if(grid[xcord][ycord-1].neighborCount!==0){
                grid[xcord][ycord-1].revealed=false;
                DisplayNum(xcord,ycord-1);
                
            }
            Check(xcord,ycord-1);
        }
        
    }
    if(0<=ycord && ycord<10 && 0<=xcord+1 && xcord+1<10 && grid[xcord+1][ycord].revealed==false){
        if(grid[xcord+1][ycord].bomb==false && grid[xcord][ycord].neighborCount==0 && grid[xcord+1][ycord].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            ctx.strokeStyle="grey";
            ctx.beginPath();
            ctx.fillRect((xcord+1)*w,ycord*w,40,40);
            ctx.stroke();
            grid[xcord+1][ycord].revealed=true;
            if(grid[xcord+1][ycord].neighborCount!==0){
                grid[xcord+1][ycord].revealed=false;
                DisplayNum(xcord+1,ycord);
            }
            Check(xcord+1,ycord);
        }
    
        
    }
    if(0<=ycord && ycord<10 && 0<=xcord-1 && xcord-1<10){
        if(grid[xcord-1][ycord].bomb==false && grid[xcord][ycord].neighborCount==0 && grid[xcord-1][ycord].revealed==false){
            x=document.getElementById("Maincanvas");
            ctx=x.getContext("2d");
            ctx.strokeStyle="grey";
            ctx.beginPath();
            ctx.fillRect((xcord-1)*w,ycord*w,40,40);
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
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
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
        console.log(time);
        time=time-1;
        if(time==0){
            alert("You have run out of time!");
            gameOver=true;
            retryBtn=document.createElement("BUTTON");
            retryBtn.innerHTML="RETRY";
            retryBtn.addEventListener("click", function (){location.reload()});
            document.getElementById("sass").appendChild(retryBtn);
            clearInterval();
        }
    }

};
