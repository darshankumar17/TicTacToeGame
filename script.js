let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; // To track draw
//2d array
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //player O
      box.classList.add("o-color")
      box.innerText = "O";
      turnO = false;
    } else {
      //player X
      box.classList.add("x-color")
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let iswinner = checkWinner();

    if (count === 9 && !iswinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled  = false;
    box.classList.remove("x-color", "o-color");  
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

 if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {    
      showWinner(pos1Val);
      return true; // Return true if there's a winner
    }
  }
  return false; // Return false if no winner
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
