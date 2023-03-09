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
    //TODO: if round is not the final round
    deleteExistingEmojis();
    removeChildNodes('img-container');

    if (GLOBAL_roundNumber !== GLOBAL_numberOfRounds) {
        GLOBAL_roundNumber++;

        switch(GLOBAL_roundNumber){
            case 2:
                numCards = 10;
                numCardsToMatch = 2;
                break;
            case 3:
                numCards = 12;
                numCardsToMatch = 3;
                break;
            case 4:
                numCards = 15;
                numCardsToMatch = 3;
                break;
            case 5:
                numCards = 16;
                numCardsToMatch = 4;
                break;
            case 6:
                numCards = 20;
                numCardsToMatch = 4;
                break;
        }

        addButton();
        startButton = document.getElementById('start-game-button');
        startButton.setAttribute('onclick', "pairsMainLoop(" + numCards + "," + numCardsToMatch + "); startRound()");
        startButton.innerHTML = 'Start Round <p>match 2</p>';
    }
}

function startTimer() {
    var initialDateTime = new Date().getTime();

    timer = setInterval(function () {
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
        else if (isFinished()) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML = "COMPLETE";

            endRound();
        }
    }, 1000);
}

function startRound() {
    startTimer();
}
