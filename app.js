/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixRow, scoresForWin;

init()

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        document.querySelector('#inputForScores').value = ''
        document.querySelector('#scoreButton').style.display = 'none'
        document.querySelector('#inputForScores').style.display = 'none'
        // confirmScores()
        var diceDOM = document.querySelector('.dice')
        var dice2DOM = document.querySelector('.dice-2')

        var dice = Math.floor(Math.random() * 6) + 1
        var dice2 = Math.floor(Math.random() * 6) + 1

        dice2DOM.style.display = 'block'
        dice2DOM.src = 'dice-' + dice2 + '.png'
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

        if (dice !== 1 && dice2 !== 1) {
            if (dice === 6 || dice2 === 6) {
                sixRow++;
                roundScore += dice + dice2
                document.querySelector('#current-' + activePlayer).textContent = roundScore

                if (sixRow === 2) {
                    sixRow = 0
                    scores[activePlayer] = 0
                    document.querySelector('.reason-' + activePlayer).innerHTML = 'Dices are 6!'

                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
                    nextPlayer()
                    document.querySelector('.reason-' + activePlayer).innerHTML = ''

                    return;
                }
            } else {
                sixRow = 0
                roundScore += dice + dice2
                document.querySelector('#current-' + activePlayer).textContent = roundScore
            }
            //            sixRow = 0
            //            roundScore += dice
            //            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            document.querySelector('.reason-' + activePlayer).innerHTML = 'Dice is 1!'
            nextPlayer();
            document.querySelector('.reason-' + activePlayer).innerHTML = ''

        }

    }


})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        sixRow = 0
        scores[activePlayer] += roundScore

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        if (scores[activePlayer] >= scoresForWin) {

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.dice-2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false

        } else {
            nextPlayer();
        }

    }



})

function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

    roundScore = 0

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.dice-2').style.display = 'none'
}

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    sixRow = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.dice-2').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.getElementById('name-0').textContent = 'Player 1!'
    document.getElementById('name-1').textContent = 'Player 2!'

    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')

    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')

    document.querySelector('#scoreButton').style.display = 'block'
    document.querySelector('#inputForScores').style.display = 'block'
}

document.querySelector('.btn-new').addEventListener('click', init)


function confirmScores() {
    inputValue = document.querySelector('#inputForScores').value
    scoresForWin = inputValue
    console.log(scoresForWin)
    if( inputValue === ''){
        scoresForWin = 100;
    } else {
        scoresForWin = inputValue

    }

    document.querySelector('#inputForScores').value = ''
    document.querySelector('#scoreButton').style.display = 'none'
    document.querySelector('#inputForScores').style.display = 'none'
}

document.querySelector('#scoreButton').addEventListener('click', confirmScores)


/*
* Отображать
*
*
* */