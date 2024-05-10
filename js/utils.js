function playerCollision({ rect1 , rect2 }) {
    return (
        rect1.position.x < rect2.position.x + rect2.attackBox.width &&
        rect1.position.x + rect1.attackBox.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.attackBox.height &&
        rect1.position.y + rect1.attackBox.height > rect2.position.y
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    displayText.style.display = "flex"
    if (player.health === enemy.health) {
        displayText.innerHTML =  "TIE!"
    } else if (player.health > enemy.health) {
        displayText.innerHTML =  "BLUE WINS!"
    } else if (player.health < enemy.health) {
        displayText.innerHTML =  "YELLOW WINS!"
    }
}

let timerCounter = 21
let timerId
function countdownTimer () {
    if (timerCounter > 0) {
        timerId = setTimeout(countdownTimer, 1000)
        timerCounter--
        timer.innerHTML = timerCounter
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }

}