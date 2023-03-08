function removeButton() {
    var element = document.getElementById("start-game-button")
    element.remove();
}



async function pairsMainLoop() {
    removeButton(); //Remove the 'start game' button
    
    //generate 2 unique images
    var numImages = 2;
    var arrOfImageComponents = [];

    for (var i = 0; i < numImages; i++) {
        var arrOfUsedComponents = await generateRandomEmoji(arrOfImageComponents);
        arrOfImageComponents.push(arrOfUsedComponents);

    }
    console.log(arrOfImageComponents);
}
