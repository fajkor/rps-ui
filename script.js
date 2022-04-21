function returnWinner(pChoice, cChoice) {
    if ((pChoice + 1) % 3 == cChoice) {
        return "comp"
    }
    else if (pChoice == cChoice) {
        return "tie";
    }
    else {
        return "player"
    }

}

const options = document.querySelectorAll("#options img")
const playerImg = document.querySelector("#player-img")
const compImg = document.querySelector("#comp-img")
const result = document.querySelector("#result")
const info = document.querySelector("#info")
const playerScore = document.querySelector("#player-score")
const compScore = document.querySelector("#comp-score")
const popup = document.querySelector(".popup")
const playAgain = document.querySelector(".popup button")
const body = document.querySelector("body")
const points = document.querySelector("#points")

let running = true

let playerScoreNum = 0;
let compScoreNum = 0;

let winner = document.querySelector("#winner")

const allChoices = ["rock", "paper", "scissors"]


options.forEach(el => {
    el.addEventListener("click", () => {
        if (running) {
            let playerChoice = el.getAttribute("data-value")
            let compChoice = Math.floor(Math.random() * 3)
            updateStage(allChoices[playerChoice], allChoices[compChoice])
            // updateResultInfo(playerChoice, compChoice)
            updateInfoResults(returnWinner(playerChoice, compChoice), playerChoice, compChoice)
            updateScore()
            updateScoreEl()
            announceWinner()
        }
    })
})

function updateInfoResults(winner, pChoice, cChoice) {
    if (winner == "player") {
        info.textContent = `${allChoices[pChoice]} beats ${allChoices[cChoice]}`
        result.textContent = "You scored a point"
    }
    else if (winner == "comp") {
        info.textContent = `${allChoices[pChoice]} is beaten by ${allChoices[cChoice]}`
        result.textContent = "Computer scored a point"
    }
    else {
        info.textContent = `${allChoices[pChoice]} ties with ${allChoices[cChoice]}`
        result.textContent = "It's a tie"
    }
}
function updateStage(pChoice, cChoice) {
    playerImg.setAttribute("src", `./images/${pChoice}.png`)
    compImg.setAttribute("src", `./images/${cChoice}.png`)

}
function updateScore() {
    if (result.textContent.includes("You")) {
        playerScoreNum++
    } else if (result.textContent.includes("Computer")) {
        compScoreNum++
    }
}

function updateScoreEl() {
    playerScore.textContent = `Player: ${playerScoreNum}`;
    compScore.textContent = `Computer: ${compScoreNum}`;
}


function announceWinner() {
    if (playerScoreNum == 3 || compScoreNum == 3) {
        running = false
        points.textContent = `${playerScoreNum}:${compScoreNum}`

        if (playerScoreNum > compScoreNum) {
            showPopup("You Won!")
        }
        else {
            showPopup("You lost!")
        }
    }
}

function showPopup(text) {
    winner.textContent = text
    body.classList.add("overlay")
    popup.classList.add("open-popup")
    body.addEventListener("keypress", reset)
}
function hidePopup() {

    body.classList.remove("overlay")
    popup.classList.remove("open-popup")
}
function reset() {
    hidePopup()
    body.removeEventListener("keypress", reset)
    running = true
    playerScoreNum = 0
    compScoreNum = 0
    result.textContent = "First to score 3 points wins"
    info.textContent = "Live update"
    updateStage("user", "robot")
    updateScoreEl()




}

playAgain.addEventListener("click", reset)