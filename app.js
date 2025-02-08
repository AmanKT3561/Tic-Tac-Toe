let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let body = document.querySelector("body");
let modebtn = document.querySelector("#mode");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); 
let player1 = prompt("Enter Player1 Name"); 
let player2 = prompt("Enter Player2 Name"); 

// setting up mode change
let currMode = "light";
modebtn.addEventListener("click", () =>{
    if(currMode==="light"){
        currMode = "dark";
        body.style.backgroundColor = "black";
        body.style.color = "white";
        resetbtn.style.backgroundColor = "white";
        resetbtn.style.color = "black";
        modebtn.style.backgroundColor = "white";
        modebtn.style.color = "black";
        newGameBtn.style.backgroundColor = "white";
        newGameBtn.style.color = "black";
        msg.style.color = "white";
    }
    else {
        currMode = "light";
        body.style.backgroundColor = "dodgerblue";
        body.style.color = "Black";
        resetbtn.style.backgroundColor = "Black";
        resetbtn.style.color = "white";
        modebtn.style.backgroundColor = "black";
        modebtn.style.color = "white";
        newGameBtn.style.backgroundColor = "black";
        newGameBtn.style.color = "white";
        msg.style.color = "black";
    }
});
//finished setting up mode change

//to initialise the pattern && to fill the boxes with O and X
let turnO = true;
let clicks;
const clickZero = () => {
    clicks = 0;
};
clickZero();
const winPattern = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("clicked");
        if(turnO){
            box.innerText = "O";
            box.style.backgroundColor = "orange";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.backgroundColor = "yellow";
            turnO = true;
        } 
        box.disabled = true;
        checkWinner();
        clicks++;
        console.log(clicks);
        checkDraw();
    });
});
//done

//to check winners by patterns
const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if( pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val==pos3Val){
                console.log("Winner is", pos1Val);
                showWinner(pos1Val);
                disableBoxes();
            }
        }
    }
};
//done
//reset background
const backgroundC = () => {
    for(let box of boxes){
    box.style.backgroundColor = "white";
}
}
//done

//check for draw
const checkDraw = () => {
    if(clicks === 9){
        msg.innerText = `This is a Draw`;
        msgContainer.classList.remove("hide");
    }
};
//to disable boxes after winning
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};
//done

//to disable boxes after clicking new Game
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
//done

//to show the winner
const showWinner = (winner) => {
if(winner==='O') msg.innerText = `Congratulations, Winner is ${player1}`;
else msg.innerText = `Congratulations, Winner is ${player2}`;
msgContainer.classList.remove("hide");
};
//done

//resetting the Game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    clickZero();
    backgroundC();
};
//done

//finally adding the buttons click func
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
//done