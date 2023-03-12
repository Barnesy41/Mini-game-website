//Get initial date time
function isFinished() {
    if (GLOBAL_numberOfMatches === GLOBAL_numMatchesRequired) {
        return true;
    }
    else{
        return false;
    }
}

function finalScoreIsPB() {
    if (GLOBAL_previousGameScores[GLOBAL_roundNumber] < GLOBAL_roundScore[GLOBAL_roundNumber] ) {
        return true;
    }
    return false;
}

function updatePB() {
    $.ajax({
        url: '../Elements/update-personal-best.php',
        async: false,
        data: {score: finalRoundScore, roundNumber: GLOBAL_roundNumber},
    })
}

function isOnPBPace() {
    console.log(GLOBAL_previousGameScores[GLOBAL_roundNumber - 1]);
    console.log(calculateCurrentRoundScore());
    if (GLOBAL_previousGameScores[GLOBAL_roundNumber-1] < calculateCurrentRoundScore()) {
        return true;
    }
    else {
        return false;
    }
}

function updatePairsBackgroundColor(hexCode) {
    element = document.getElementById('pairs-container');
    element.style.backgroundColor = hexCode;
}

function calculateCurrentRoundScore() { 
    //Calculate the score for the current round
    var roundScore = 0;
    for (var i = 0; i < GLOBAL_roundScores.length; i++){
        roundScore += GLOBAL_roundScores[i];
    }
    roundScore = GLOBAL_score - roundScore;
    
    return roundScore
}

GLOBAL_roundScores = [0, 0, 0, 0, 0, 0];
function endRound() {
    //Stop data tracking the round
    document.getElementById('timer').innerHTML = "COMPLETE";

    clearInterval(roundInProgress);

    //Update the score for the current round
    GLOBAL_roundScores[GLOBAL_roundNumber] = calculateCurrentRoundScore();

    if (finalScoreIsPB()) {
        updatePB();
    }

    //TODO: if round is not the final round
    deleteExistingEmojis();
    removeChildNodes('img-container');

    //Reset background color to gray
    updatePairsBackgroundColor('grey');

    var numCards = 0;
    var numCardsToMatch = 0;
    if (GLOBAL_roundNumber !== GLOBAL_numberOfRounds) {
        GLOBAL_roundNumber++;

        switch(GLOBAL_roundNumber){
            case 2:
                numCards = 10;
                numCardsToMatch = 2;
                console.log("round 2 loaded.");
                break;
            case 3:
                numCards = 12;
                numCardsToMatch = 3;
                console.log("round 3 loaded.");
                break;
            case 4:
                numCards = 15;
                numCardsToMatch = 3;
                console.log("round 4 loaded.");
                break;
            case 5:
                numCards = 16;
                numCardsToMatch = 4;
                console.log("round 5 loaded.");
                break;
            case 6:
                numCards = 20;
                numCardsToMatch = 4;
                console.log("round 6 loaded.");
                break;
        }
        //TODO: what happens if the final round is over
        addButton();
        startButton = document.getElementById('start-game-button');
        startButton.setAttribute('onclick', "pairsMainLoop(" + numCards + "," + numCardsToMatch + "); startRound()");
        startButton.innerHTML = 'Start Round ' + GLOBAL_roundNumber + '<p style="font-size: 20px; color: white;"> match ' + numCardsToMatch + ' cards in multiples of ' + numCardsToMatch + "</p>";
    }
}

function timer(initialDateTime) {
    //Get current date time
    var currentDateTime = new Date().getTime();

    //Find the amount of time elapsed
    var elapsedTime = currentDateTime - initialDateTime;

    //Convert to time and minutes
    var mins = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = mins + "m " + secs + "s ";

    //If the timer reaches 100 mins, stop the timer from updating
    if (mins > 99) {
        clearInterval(timer);
        document.getElementById('timer').innerHTML = "STOPPED";
    }
}

function scoreCounter() {
    document.getElementById('scoreCounter').innerHTML = "Score: " + GLOBAL_score + "pts";

}

function attemptsCounter() {
    document.getElementById('attemptsCounter').innerHTML = "Attempts: " + GLOBAL_numberOfAttempts;
}

function getTimerValue(){
    //Find the amount of time elapsed
    var currentDateTime = new Date().getTime();
    var elapsedTime = currentDateTime - GLOBAL_roundStartDateTime;
    elapsedTimeInSecs = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return elapsedTimeInSecs;
}

function startRound() {
    var initialDateTime = new Date().getTime();
    GLOBAL_roundStartDateTime = new Date().getTime();

    roundInProgress = setInterval(function () {
        timer(initialDateTime);
        scoreCounter();
        attemptsCounter();

        if (isOnPBPace()) {
            updatePairsBackgroundColor('#FFD700');
        }

        if (isFinished()) {
            endRound();
        }
    }, 1000);
}
