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
    if (GLOBAL_personalBestScores[GLOBAL_roundNumber - 1] < GLOBAL_roundScores[GLOBAL_roundNumber - 1] ) {
        return true;
    }
    return false;
}

function updatePB() {
    console.log(GLOBAL_roundScores[GLOBAL_roundNumber - 1]);
    console.log(GLOBAL_roundNumber-1);
    $.ajax({
        url: '../Elements/update-personal-best.php',
        type: "POST",
        async: false,
        data: {score: GLOBAL_roundScores[GLOBAL_roundNumber - 1], roundNumber: GLOBAL_roundNumber - 1 },
        success: function (data) {
            console.log(data);
        }
    })
}

function isOnPBPace() {
    if (GLOBAL_personalBestScores[GLOBAL_roundNumber-1] < calculateCurrentRoundScore()) {
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
    GLOBAL_roundScores[GLOBAL_roundNumber-1] = calculateCurrentRoundScore();

    if (finalScoreIsPB()) {
        updatePB();
        console.log("PB UPDATED");
    }

    //TODO: if round is not the final round
    deleteExistingEmojis();
    removeChildNodes('img-container');

    //Reset background color to gray
    updatePairsBackgroundColor('grey');

    var numCards = 0;
    var numCardsToMatch = 0;
    //GLOBAL_roundNumber = 6; //TODO: remove, for testing purposes.
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
    else {
        console.log("game ended.");
        addPlayAgainButton();

        if (isRegistered()) {
            addSubmitScoreButton(GLOBAL_roundScores);
        }
    }
}

function isRegistered() {
    $.ajax({
        url: '../Elements/is-user-registered.php',
        type: 'POST',
        async: false,
        data: {},
        success: function (data) {
            isUserRegistered = data
        }

    })
    console.log(isUserRegistered);
    return isUserRegistered;
}

function addPlayAgainButton() {
    var playAgainButton = document.createElement('button');
    
    //Add attributes
    playAgainButton.setAttribute('type', 'button');
    playAgainButton.setAttribute('class', 'btn btn-primary');
    playAgainButton.setAttribute('id', 'play-again-button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.setAttribute('onclick', 'deleteReplayButtons(); addStartButton(); resetGlobalVariables();');
    
    //Get the adjacent element
    var adjacentElement = document.getElementById('grid-container');

    //Add the element to the document
    adjacentElement.insertAdjacentElement('afterbegin', playAgainButton);

    console.log("added play again buttons");
}    

function addSubmitScoreButton(arrOfRoundScores) {
    var submitScoreButton = document.createElement('button');
    
    //Add attributes
    submitScoreButton.setAttribute('type', 'button');
    submitScoreButton.setAttribute('class', 'btn btn-primary');
    submitScoreButton.setAttribute('id', 'submit-score-button');
    submitScoreButton.textContent = 'Submit Score';
    submitScoreButton.setAttribute("onclick", 'addToLeaderboard(); deleteReplayButtons(); addStartButton(); resetGlobalVariables();');
    console.log("onclick", 'addToLeaderboard(' + GLOBAL_roundScores + '); deleteReplayButtons(); addStartButton();');
    console.log(typeof (GLOBAL_roundScores));
    console.log(GLOBAL_roundScores);

    //Get the adjacent element
    var adjacentElement = document.getElementById('grid-container');

    //Add the element to the document
    adjacentElement.insertAdjacentElement('afterbegin', submitScoreButton);
}

function deleteReplayButtons() {
    element = document.getElementById('play-again-button');
    element.remove();

    element = document.getElementById('submit-score-button');
    if (element != null) {
        element.remove();
    }
}

function resetGlobalVariables() {
    GLOBAL_numberOfCardsSelected = 0;
    GLOBAL_score = 0;
    GLOBAL_roundScore = 0;
    GLOBAL_uncoveredCardsSrc = [];
    GLOBAL_uncoveredCardsID = [];
    GLOBAL_numberOfAttempts = 0;
    GLOBAL_numberOfMatches = 0;
    GLOBAL_numMatchesRequired = 0
    GLOBAL_numberOfRounds = 6;
    GLOBAL_roundNumber = 1;
    GLOBAL_levelScores = [0];
    GLOBAL_previousGameScores = getPreviousGameScores();
    GLOBAL_personalBestScores = getPersonalBestScores();
    GLOBAL_roundScores = [0, 0, 0, 0, 0, 0];
}

function playTrack(trackName) {
    var element = document.getElementById(trackName);
    element.play();

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
    document.getElementById('scoreCounter').innerHTML = "Score: " + calculateCurrentRoundScore() + "pts";

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
    playTrack('background-track');

    var initialDateTime = new Date().getTime();
    GLOBAL_roundStartDateTime = new Date().getTime();

    GLOBAL_numberOfAttempts = 0; //Set attempts counter to zero
    roundInProgress = setInterval(function () {

        timer(initialDateTime);
        scoreCounter();
        attemptsCounter();

        if (isOnPBPace()) {
            updatePairsBackgroundColor('#FFD700');
        }

        if (isFinished()) {
            playTrack('round-complete-track');
            endRound();
        }
    }, 1000);
}
