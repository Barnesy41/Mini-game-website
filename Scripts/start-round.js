//Get initial date time
function isFinished() {
    if (GLOBAL_numberOfMatches === GLOBAL_numMatchesRequired) {
        return true;
    }
    else{
        return false;
    }
}

function endRound() {
    //Stop data tracking the round
    document.getElementById('timer').innerHTML = "COMPLETE";

    clearInterval(roundInProgress);

    //GLOBAL_roundScore ;
    //UPDATE PB if PB is set
    // if (GLOBAL_previousGameScores[GLOBAL_roundNumber] < GLOBAL_roundScore ) {
    //     $.ajax({
    //         url: '../Elements/get-previous-game-score.php',
    //         async: false,
    //         success: function (data) {
    //             previousGameScore = data;
    //         }
    //     })

    // }

    //TODO: if round is not the final round
    deleteExistingEmojis();
    removeChildNodes('img-container');

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

function startTimer() {
    var initialDateTime = new Date().getTime();

    roundInProgress = setInterval(function () {
        
    }, 1000);
}

function scoreCounter() {
    document.getElementById('scoreCounter').innerHTML = "Score: " + GLOBAL_score + "pts";

}

function attemptsCounter() {
    document.getElementById('attemptsCounter').innerHTML = "Attempts: " + GLOBAL_numberOfAttempts;
}

function startRound() {
    var initialDateTime = new Date().getTime();

    roundInProgress = setInterval(function () {
        timer(initialDateTime);
        scoreCounter();
        attemptsCounter();

        if (isFinished()) {
            endRound();
        }
    }, 1000);
}
