function removeButton() {
    var element = document.getElementById("start-game-button")
    element.remove();
}

function addButton() {
    var startButton = document.createElement('button');
    
    //Add attributes
    startButton.setAttribute('type', 'button');
    startButton.setAttribute('class', 'btn btn-primary');
    startButton.setAttribute('id', 'start-game-button');
    
    //Get the adjacent element
    var adjacentElement = document.getElementById('grid-container');

    //Add the element to the document
    adjacentElement.insertAdjacentElement('afterbegin', startButton);
}
    

function removeChildNodes(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function createNewElement(elementType, attributesArr, valuesArr, adjacentElementID, method) {
    var element = document.createElement(elementType);

    //TODO: error handling when attributesArr length != valuesArr length
    //Set attributes
    for (var i = 0; i < attributesArr.length; i++){
        element.setAttribute(attributesArr[i], valuesArr[i]);
    }
    
    //Get the adjacent element
    var adjacentElement = document.getElementById(adjacentElementID);

    //Add the element to the document
    adjacentElement.insertAdjacentElement(method, element);

}

function getAllEmojiSrc() {
    $.ajax({
        url: '../Elements/get-emoji-images.php',
        async: false,
        success: function (data) {
            stringOfEmojis = data;
        }
    })
    console.log(stringOfEmojis);
    arrOfEmojis = stringOfEmojis.split(',');
    console.log(arrOfEmojis);
    return arrOfEmojis;
}

function deleteExistingEmojis() {
    //TODO: error handling
    $.ajax({
        url: '../Elements/delete-emoji-images.php',
        type: 'POST',
        async: false,
    })
}

function randomizeArray(array) {
    randomizedArray = [];
    while (array.length > 0){
        var randomValue = Math.floor(Math.random() * array.length);
        randomizedArray.push(array[randomValue]);
        array.splice(randomValue, 1);
    }
    return randomizedArray;
}

function flipCard(cardID, isFaceDown, emojiImageFileSrc, numCardsToMatch) {
    //TODO: error handling, especially if image src not given
    //TODO: add animations
    if (isFaceDown) {
        elementToDelete = document.getElementById('anchor-card-' + cardID);
        createNewElement('img', ['src', 'class', 'id'], [emojiImageFileSrc, 'img-container rounded', 'card-' + cardID], 'anchor-card-' + cardID, 'beforeBegin');
        elementToDelete.remove();
        
        GLOBAL_numberOfCardsSelected++;
    }else {
        elementToDelete = document.getElementById('card-' + cardID);
        var functionToCall = 'flipCard(' + cardID + ',' + true + ',"' + emojiImageFileSrc + '", '+ numCardsToMatch + '); checkPair(' + numCardsToMatch + ', "' + cardID + '");';
        createNewElement('a', ['class', 'id', 'onclick'], ['img-container rounded', 'anchor-card-'+cardID, functionToCall], 'card-' + cardID, "beforeBegin");
        elementToDelete.remove();

    }
}

function checkPair(numCardsToMatch, cardID) {
    //Get the corresponding image src for the cardID and append to the array
    var cardSrc = document.getElementById('card-' + cardID).src;
    GLOBAL_uncoveredCardsSrc.push(cardSrc);
    GLOBAL_uncoveredCardsID.push(cardID);

    if (GLOBAL_numberOfCardsSelected % numCardsToMatch === 0) {
        //Increase number of attempts to match the card
        GLOBAL_numberOfAttempts++;

        var isAPair = true;
        //Check if the chosen cards are the same
        for (var i = 1; i < numCardsToMatch; i++) {
            if (GLOBAL_uncoveredCardsSrc[i - 1] !== GLOBAL_uncoveredCardsSrc[i]) {
                isAPair = false;
                break;
            }
        }

        if (isAPair) {
            //Calculate the score
            pairMatchedScoreWeight = 250; //Base score value
            var timeInSecs = getTimerValue();

            console.log("Num attempts: " + GLOBAL_numberOfAttempts);
            console.log("Time in seconds: " + timeInSecs);
            scoreCalculation = pairMatchedScoreWeight - timeInSecs - GLOBAL_numberOfAttempts
            GLOBAL_score += (scoreCalculation >= 1) ? scoreCalculation : 1;
            
            //Increase matches counter
            GLOBAL_numberOfMatches += 1;

            //Empty the uncovered cards array
            GLOBAL_uncoveredCardsSrc = []; //TODO: find a better method, if there is a pointer to this array it may cause issues
            GLOBAL_uncoveredCardsID = [];
        }

        //Re-cover all the cards as they were not a match
        else {
            var uncoveredCardsID = GLOBAL_uncoveredCardsID;
            var uncoveredCardsSrc = GLOBAL_uncoveredCardsSrc;
            var timeout = setTimeout(function () {
                for (var i = 0; i < numCardsToMatch; i++) {
                    flipCard(uncoveredCardsID[i], false, uncoveredCardsSrc[i], numCardsToMatch);
                }
            }, 250);
        }

        //Empty the uncovered cards array
        GLOBAL_uncoveredCardsSrc = []; //TODO: find a better method, if there is a pointer to this array it may cause issues
        GLOBAL_uncoveredCardsID = [];
    }
}

function getPreviousGameScores() {
    $.ajax({
        url: '../Elements/get-previous-game-score.php',
        async: false,
        success: function (data) {
            previousGameScore = data;
        }
    })
    previousGameScore = previousGameScore.split(',');
    // console.log(previousGameScore);
    return previousGameScore;
}

function getPreviousGameScores() {
    $.ajax({
        url: '../Elements/get-previous-game-score.php',
        async: false,
        success: function (data) {
            previousGameScore = data;
        }
    })
    previousGameScore = previousGameScore.split(',');
    // console.log(previousGameScore);
    return previousGameScore;
}

function getPersonalBestScores() {
    $.ajax({
        url: '../Elements/get-personal-best-scores.php',
        async: false,
        success: function (data) {
            PB_Scores = data;
        }
    })
    PB_Scores = PB_Scores.split(',');
    console.log(PB_Scores);
    // console.log(previousGameScore);
    return PB_Scores;
}

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
async function pairsMainLoop(totalNumCards, numCardsToMatch) {
    removeButton(); //Remove the 'start game' button
    deleteExistingEmojis();
    
    //TODO: archive images after a given period of time?

    //generate 2 unique images
    var numImagesToGenerate = totalNumCards/numCardsToMatch;
    var arrOfImageComponents = [];
    GLOBAL_uncoveredCardsSrc = [];
    GLOBAL_uncoveredCardsID = [];
    GLOBAL_numberOfCardsSelected = 0;
    GLOBAL_numMatchesRequired = (numCardsToMatch * numImagesToGenerate) / numCardsToMatch;
    GLOBAL_numberOfMatches = 0;
    GLOBAL_personalBestScores = getPersonalBestScores();

    for (var i = 0; i < numImagesToGenerate; i++) {
        var arrOfUsedComponents = await generateRandomEmoji(arrOfImageComponents); //Generates a random, unique, emoji.
        arrOfImageComponents.push(arrOfUsedComponents); //Appends the image components used to create the emoji image to an array

    }

    //TODO: Get the src for each image into an array
    arrOfEmojisSrc = getAllEmojiSrc();

    //duplicate the images the necessary number of times
    var tempArr = [];
    for (var i = 0; i < arrOfEmojisSrc.length; i++){
        for (var k = 0; k < numCardsToMatch; k++) {
            tempArr.push(arrOfEmojisSrc[i]);
        }
    }
    arrOfEmojisSrc = tempArr;

    //Randomize the images
    arrOfEmojisSrc = randomizeArray(arrOfEmojisSrc);

    //TODO: Create the 'instance' of each card and keep it as hidden
    for (var i = 0; i < arrOfEmojisSrc.length; i++) {

        //Create an instance of the back of the emoji for each emoji to be displayed
        var emojiFileName = arrOfEmojisSrc[i];
        var emojiFileSrc = '../generated-emoji-images/' + emojiFileName;
        var ID = 'anchor-card-' + i;
        var functionToCall = 'flipCard(' + i + ',' + true + ',"' + emojiFileSrc + '", '+ numCardsToMatch + '); checkPair(' + numCardsToMatch + ', "' + i + '");';
        createNewElement('a', ['class', 'id', 'onclick'], ['img-container rounded', ID, functionToCall], 'grid-container', "afterBegin");   
    }
    
   

    
}
