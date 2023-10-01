let game = true,currentPlayer = "X";
const message = document.querySelector("p");
const restartButton = document.querySelector(".restart");
const options = document.querySelectorAll(".option");
message.textContent = `${currentPlayer} has turn`;

let playerX = [];
let playerO = [];
winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartButton.addEventListener("click" , restart)
options.forEach((item) =>{
    if(!game) return;
    item.addEventListener("click" , () =>{
        if(item.textContent =="" && game){
            (currentPlayer == "X") ? currentPlayer = "O" : currentPlayer = "X";
            item.classList.add(`player${currentPlayer}`)
            item.textContent = currentPlayer;
            if(playerX.length<3){
                playerX.push(currentPlayer);
                
            }
            else if(playerO.length<3){
                playerO.push(currentPlayer)
            }
            checkWinner();
        }
      
        
    })

})

function checkWinner() {
    for (const combination of winningCombination) {
        const [a, b, c] = combination;
        const positions = [a, b, c];

        const playerPositions = positions.map(position => options[position].textContent);
        
        if (playerPositions.every(position => playerO.includes(position))) {
            message.textContent = ("Player O won");
            endGame();
            return;
        } else if (playerPositions.every(position => playerX.includes(position))) {
            message.textContent = ("Player X won");
            
            endGame();
            return;
        }
    }

    if (playerX.length + playerO.length === 9) {
       message.textContent =  ("It's a draw");
        endGame();
    }
}
function endGame(){
  game = false;
  restartButton.classList.add("show")
    
}
function restart(){
    game = true;
    playerO = [];
    playerX = [];
    restartButton.classList.remove("show")
   options.forEach((option) =>{
    option.classList.remove("playerX");
    option.classList.remove("playerO");
    option.textContent = null;  
   })
    message.textContent = `${currentPlayer} has turn`;

}