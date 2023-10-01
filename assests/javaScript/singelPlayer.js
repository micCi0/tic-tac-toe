let currentPlayer ,  game = true,  computerPlayer = false,
user = true,playerSelected = null,computerSelected = null,gameOver = false;
const buttons = document.querySelectorAll(".control button")
const gameGrid = document.querySelector(".game");
const infoText = document.querySelector("p");
const restartButton = document.querySelector(".restart");
const link = document.querySelector("a");
let activeStatus = {
    player:[],
    computer:[],
    keys:[],
    lastRandom:[],
    lastPlayerPositon:[],
    winningCombination:[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
}
restartButton.addEventListener("click" , restart)
buttons.forEach((player) =>{
    player.addEventListener("click" , () =>{
        switch(player.className){
            case "playerO":
                currentPlayer = "O";
                playerSelected = "O"
                setGame();
                break;
            case "playerX":
                currentPlayer = "X";
                playerSelected = "X"
                setGame();
                break;    
        }
    })
})
function setGame(){
     gameGrid.classList.add("show");
    document.querySelector(".control").classList.add("hide");
    link.style.display = "block"
    infoText.textContent = `You have turn`
    game = true;
}
const options = document.querySelectorAll(".option");
options.forEach((option , index) =>{
    option.addEventListener("click" , () =>{
        if(!gameOver){
        if(currentPlayer == "X" && !option.textContent  && user){
            currentPlayer = "O"
            option.textContent = playerSelected
            option.classList.add("playerX");
                activeStatus.player.push(currentPlayer);
                activeStatus.keys.push(index)
                checkWinner();
                if(user){
                    computerMove()
                 } 
        }
        else if(currentPlayer == "O" && !option.textContent && user){
                currentPlayer = "X";
                option.textContent =playerSelected
                option.classList.add("playerO");
                    activeStatus.player.push(currentPlayer);
                    activeStatus.keys.push(index);
                    checkWinner();
                    if(user){
                        computerMove()
                     }
        }
    }
        
    })

})
function computerMove() {
    if(gameOver) return;
    let randomPosition;
    computerPlayer = true;
    user = false;
    const availablePositions = [];
    for (let i = 0; i < options.length; i++) {
        if (
            !activeStatus.lastPlayerPositon.includes(i) &&
            !activeStatus.lastRandom.includes(i) &&
            !options[i].textContent
        ) {
            availablePositions.push(i);
        }
    }
    if (availablePositions.length === 0) {
        infoText.textContent = "It's a draw!";
        return;
    }
    randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    activeStatus.lastRandom.push(randomPosition);
    infoText.textContent = "Computer has turn";

    setTimeout(() => {
      (playerSelected == "X") ? computerSelected = "O" : computerSelected = "X";
      options[randomPosition].classList.add(`player${computerSelected}`);
        options[randomPosition].textContent = computerSelected

            activeStatus.computer.push(computerSelected);
        
        computerPlayer = false;
        infoText.textContent = "Your turn";
        user = true;
        checkWinner();
    }, 1000);
}
function endGame(result) {
    game = false;
    gameOver = true;
    infoText.textContent = result;
    restartButton.classList.add("show");
}

function checkWinner() {
    for (const combination of activeStatus.winningCombination) {
        const [a, b, c] = combination;
        const positions = [a, b, c];

        const playerPositions = positions.map(position => options[position].textContent);

        if (playerPositions.every(position => position === playerSelected)) {
            endGame(`${playerSelected} wins!`);
            return;
        } else if (playerPositions.every(position => position === computerSelected)) {
            endGame(`${computerSelected} wins!`);
            return;
        }
    }
    
    if (![...options].some(option => option.textContent === "")) {
        endGame("It's a draw!");
    }
}
function restart(){
    activeStatus.computer = [];
    activeStatus.player = [];
    activeStatus.keys = [];
    activeStatus.lastRandom = [],
   activeStatus.lastPlayerPositon = []
   game = true;
   gameOver = false;
   restartButton.classList.remove("show");
   options.forEach((option) =>option.textContent = null);
   infoText.textContent = `You have turn`

}