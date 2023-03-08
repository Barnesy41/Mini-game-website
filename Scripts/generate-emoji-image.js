var emojiSrc;
function generateRandomEmoji() {
    //Initialize the images
    emojiEyes = new Image();
    emojiMouth = new Image();

    //Start with random images
    var emojiEyesNum = Math.floor(Math.random() * 3) + 1;
    var emojiMouthNum = Math.floor(Math.random() * 3) + 1;

    //save the file name of all the current images in global variables
    eyesFileName = "eyes" + emojiEyesNum + ".png";
    mouthFileName = "mouth" + emojiMouthNum + ".png";
        
    //Append the file names to an array that is later returned by this function.
    arrOfFileNames = [eyesFileName, mouthFileName];

    // Get the source of each images
    var emojiEyesSource = "../Images/" + eyesFileName;
    var emojiMouthSource = "../Images/" + mouthFileName;
    
    //load each image into the image object
    emojiEyes.src = emojiEyesSource;
    emojiMouth.src = emojiMouthSource;
    generateEmoji();


    function generateEmoji() {
        var canvas = document.getElementById('hidden-canvas');
        var canvasContext = canvas.getContext('2d');
        canvas.width = 240; //might not be necessary
        canvas.height = 240; //might not be necessary

        canvasContext.strokeStyle = "red"; //TODO cycle colors
        //canvasContext.rect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(emojiEyes, (240 - emojiEyes.width) / 2, 10);
        canvasContext.drawImage(emojiMouth, (240 - emojiMouth.width) / 2, 10);

        saveEmoji();

        function saveEmoji() {
            var canvas = document.getElementById('hidden-canvas');
            var canvasData = canvas.toDataURL("image/png");
            
            $.ajax({
                url: '../Elements/upload-emoji.php',
                type: 'POST',
                async: false,
                data: { data: canvasData },
                success: function (data) {
                    var result = data;
                    emojiSrc = result;
                }
            })
            

        }
    }
    return arrOfFileNames;
}