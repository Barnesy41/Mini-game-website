function removeButton() {
    var element = document.getElementById("start-game-button")
    element.remove();
}

function createNewElement($elementType, attributesArr, valuesArr, adjacentElementID) {
    var element = document.createElement($elementType);

    //TODO: error handling when attributesArr length != valuesArr length
    //Set attributes
    for (var i = 0; i < attributesArr.length; i++){
        element.setAttribute(attributesArr[i], valuesArr[i]);
    }
    
    //Get the adjacent element
    var adjacentElement = document.getElementById(adjacentElementID);

    //Add the element to the document
    adjacentElement.insertAdjacentElement("afterbegin", element);
}

function getAllEmojiSrc() {
    $.ajax({
        url: '../Elements/delete-emoji-images.php',
        async: false,
        success: function (data) {
            stringOfEmojis = data;
        }
    })
    arrOfEmojis = stringOfEmojis.split(',');
    return arrOfEmojis;
}

function deleteExistingEmojis() {
    //TODO: error handling
    $.ajax({
        url: '../Elements/get-emoji-images.php',
        type: 'POST',
        async: false,
    })
}

async function pairsMainLoop() {
    removeButton(); //Remove the 'start game' button
    
    //TODO: archive images after a given period of time?


    //TODO: delete any existing files starting with the current user's UUID


    //generate 2 unique images
    var numImages = 2;
    var arrOfImageComponents = [];

    for (var i = 0; i < numImages; i++) {
        var arrOfUsedComponents = await generateRandomEmoji(arrOfImageComponents); //Generates a random, unique, emoji.
        arrOfImageComponents.push(arrOfUsedComponents); //Appends the image components used to create the emoji image to an array

    }

    //TODO: Get the src for each image in an array
    console.log(getAllEmojiSrc());

    //TODO: Randomize the images

    //TODO: Create the 'instance' of each card
    createNewElement('img', ['src', 'class'], ['../Images/eyes1.png', 'pairs-card rounded'], 'pairs-container');

}
