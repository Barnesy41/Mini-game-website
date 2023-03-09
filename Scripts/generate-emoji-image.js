var emojiSrc;
async function generateRandomEmoji(arrOfImageComponents) {
    //Initialize the images
    emojiEyes = new Image();
    emojiMouth = new Image();

    var isDuplicate = true;
    eyesFileName = "";
    mouthFileName = "";
    arrOfFileNames = [];
    var emojiEyesNum = -1;
    var emojiMouthNum = -1;
    
    while (isDuplicate) {
        isDuplicate = false;

        //Start with random images
        emojiEyesNum = Math.floor(Math.random() * 3) + 1;
        emojiMouthNum = Math.floor(Math.random() * 3) + 1;

        //save the file name of all the current images in global variables
        eyesFileName = "eyes" + emojiEyesNum + ".png";
        mouthFileName = "mouth" + emojiMouthNum + ".png";
            
        //Append the file names to an array that is later returned by this function.
        arrOfFileNames = [eyesFileName, mouthFileName];
        
        if (arrOfImageComponents != undefined) {
            for (var k = 0; k < arrOfImageComponents.length; k++) {
                if (arrOfImageComponents[k].toString() === arrOfFileNames.toString()) {
                    isDuplicate = true; //Image already exists
                    break;
                }
            }
        }

        if (!isDuplicate) {
            console.log(arrOfImageComponents);
        }
    }

    // Get the source of each images
    var emojiEyesSource = "../Images/" + eyesFileName;
    var emojiMouthSource = "../Images/" + mouthFileName;
    
    var promise = await new Promise(function (resolve, reject) {
        var numOfLoadedImages = 0;
        var numImagesToLoad = 2;

        //load each image into the image object
        emojiEyes.onload = function () {
            numOfLoadedImages++;
            if (numOfLoadedImages === numImagesToLoad) {
                generateEmoji()
                resolve([eyesFileName, mouthFileName]);
            }
        };
        emojiEyesNum.onerror = reject;
        emojiEyes.src = emojiEyesSource;

        emojiMouth.onload = function () {
            numOfLoadedImages++;
            if (numOfLoadedImages === numImagesToLoad) {
                generateEmoji()
                resolve([eyesFileName, mouthFileName]);
            }
        };
        emojiMouth.onerror = reject;
        emojiMouth.src = emojiMouthSource;
        console.log(emojiEyes, emojiMouth);
    });
    return promise;


    function generateEmoji() {
        var canvas = document.getElementById('hidden-canvas');
        var canvasContext = canvas.getContext('2d');
        canvas.width = 240; //might not be necessary
        canvas.height = 240; //might not be necessary

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
}