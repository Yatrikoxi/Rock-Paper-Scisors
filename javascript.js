const options = ["rock", "paper", "scissors"];
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const gameText = document.getElementById("gameText");
const gameNumber = document.getElementById("gameNumber");
const gameMsg = document.getElementById("gameMsg");
const playerPoints = document.getElementById("playerPoints");
const compPoints = document.getElementById("compPoints");
const resetDiv = document.getElementById("resetDiv");
const resetButton = document.createElement("button");
resetButton.setAttribute("class", "button button:hover whiteText");
resetButton.textContent = "Again?";
resetButton.addEventListener("click", () => {
    reset();
})


// button event listeners. Starts 1 round 
rock.addEventListener('click', (e) => {
    playerSelection = "rock";
    playRound(playerSelection);
    gameNumber.textContent = `Round ${gameCount}`;
});
paper.addEventListener('click', (e) => {
    playerSelection = "paper";
    playRound(playerSelection);
    gameNumber.textContent = `Round ${gameCount}`;
})
scissors.addEventListener('click', (e) => {
    playerSelection = "scissors";
    playRound(playerSelection);
    gameNumber.textContent = `Round ${gameCount}`;
})

// Computer produced choice
function getComputerChoice() {
    let choice = options[Math.floor(Math.random() * options.length)];
    return choice;
}
// Player choice
let playerSelection = "";

//score
let scorePlayer = 0;
let scoreComputer = 0;
let gameCount = 0;


// One round of game
function playRound(playerSelection){
    let computerSelection = getComputerChoice();
    const result = checkWinner(playerSelection, computerSelection);
    gameCount++;
    if (result == "Tie"){
        gameMsg.textContent = "It's a Tie! Nobody gets point." ;
    }
    else if(result == "Player"){
        scorePlayer++;
        gameMsg.textContent = `You win this round! Your ${playerSelection} beats ${computerSelection}.`;
        playerPoints.textContent =`${scorePlayer}`;
        playerSelection = "";
        if (scorePlayer == 5 || scoreComputer == 5) {
            gameOver(scorePlayer, scoreComputer);
        } 
    }
    else{
        scoreComputer++;
        gameMsg.textContent = `You lose this round. Comps ${computerSelection} beats ${playerSelection}.`;
        compPoints.textContent =`${scoreComputer}`;
        if (scorePlayer == 5 || scoreComputer == 5) {
            gameOver(scorePlayer, scoreComputer);
        } 
    }
}

//  winner deciding function
function checkWinner(playerSelection, computerSelection){
    if (playerSelection == computerSelection){
        return "Tie";
    }
    else if (
        (playerSelection == "scissors" && computerSelection == "paper")
     || (playerSelection == "paper" && computerSelection == "rock")
     || (playerSelection == "rock" && computerSelection == "scissors")
     ){
        return "Player";
     }
     else {
        return "Computer";
     }
}
// End of the game function - adds reset button under main Block
function gameOver(scorePlayer, scoreComputer) {
    document.querySelector("#rock").disabled = true;
    document.querySelector("#paper").disabled = true;
    document.querySelector("#scissors").disabled = true;
    rock.classList.remove("button:hover");
    resetDiv.appendChild(resetButton); 

    if (scorePlayer === 5) {
        gameMsg.textContent = "And the winner is Player!";
        compPoints.classList.add("redText");
        compPoints.classList.remove("whiteText");
    } else if (scoreComputer === 5) {
        gameMsg.textContent = "And the winner is Computer!";
        playerPoints.classList.add("redText");
        playerPoints.classList.remove("whiteText");
    }  
}

// returns function to buttons, resets classes on points and score.
function reset(){
    scoreComputer = 0;
    scorePlayer = 0;
    gameCount = 0;
    gameNumber.textContent = "Good Luck!";
    gameMsg.textContent = "First to 5 points wins!";
    compPoints.textContent = `${scoreComputer}`;
    playerPoints.textContent = `${scorePlayer}`;
    playerPoints.classList.remove("redText");
    playerPoints.classList.add("whiteText");
    compPoints.classList.remove("redText");
    compPoints.classList.add("whiteText");
    document.querySelector("#rock").disabled = false;
    document.querySelector("#paper").disabled = false;
    document.querySelector("#scissors").disabled = false;
    resetButton.remove();
}