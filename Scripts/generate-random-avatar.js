window.onload = function () {
    //Initialize the images
    avatarEyes = new Image();
    avatarMouth = new Image();
    avatarBrows = new Image();
    avatarNose = new Image();

    //Start with random images
    var avatarEyesNum = Math.floor(Math.random() * 3) + 1;
    var avatarMouthNum = Math.floor(Math.random() * 3) + 1;
    var avatarBrowsNum = Math.floor(Math.random() * 3) + 1;
    var avatarNoseNum = Math.floor(Math.random() * 3) + 1;

    //save the file name of all the current images in global variables
    eyesFileName = "eyes" + avatarEyesNum + ".png";
    mouthFilename = "mouth" + avatarMouthNum + ".png";
    browsFilename = "brows" + avatarBrowsNum + ".png";
    noseFilename = "nose" + avatarNoseNum + ".png";
    
    arrOfFileNames = [eyesFileName,mouthFilename,browsFilename,noseFilename];
        
    // Get the source of each images
    var avatarEyesSource = "../Images/" + eyesFileName;
    var avatarMouthSource = "../Images/" + mouthFilename;
    var avatarBrowsSource = "../Images/" + browsFilename;
    var avatarNoseSource = "../Images/" + noseFilename;
    
    //load each image into the image object
    avatarEyes.src = avatarEyesSource;
    avatarMouth.src = avatarMouthSource;
    avatarBrows.src = avatarBrowsSource;
    avatarNose.src = avatarNoseSource;

    //When the image loads, call the avatar builder function
    avatarEyes.onload = function () {
        generateRandomAvatar();
    }
    avatarMouth.onload = function () {
        generateRandomAvatar();
    }
    avatarBrows.onload = function () {
        generateRandomAvatar();
    }
    avatarNose.onload = function () {
        generateRandomAvatar();
    }


    function generateRandomAvatar() {
        var canvas = document.getElementById('avatar-canvas');
        var canvasContext = canvas.getContext('2d');
        canvas.width = 240; //might not be necessary
        canvas.height = 240; //might not be necessary

        canvasContext.drawImage(avatarEyes, (240 - avatarEyes.width) / 2, 10);
        canvasContext.drawImage(avatarNose, (240 - avatarEyes.width) / 2, 10);
        canvasContext.drawImage(avatarMouth, (240 - avatarEyes.width) / 2, 10);
        canvasContext.drawImage(avatarBrows, (240 - avatarEyes.width) / 2, 10);
        saveAvatar();
    }
}
    
//TODO: this is terribly written code but works, try to sort if you have time
function updateImage(newImageFileName) {
    var canvas = document.getElementById('avatar-canvas');
    var canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    //find the type of image that was updated
    if (newImageFileName.substr(0, newImageFileName.length - 1) === 'eyes') {
        avatarEyes.src = "../Images/" + newImageFileName + ".png";
    }
    else if (newImageFileName.substr(0, newImageFileName.length - 1) === 'mouth'){
        avatarMouth.src = "../Images/" + newImageFileName + ".png";
    }
    else if (newImageFileName.substr(0, newImageFileName.length - 1) === 'nose') {
        avatarNose.src = "../Images/" + newImageFileName + ".png";
    }
    else if (newImageFileName.substr(0, newImageFileName.length - 1) === 'brows'){
        avatarBrows.src = "../Images/" + newImageFileName + ".png";
    }

    var newImage = new Image();
    newImage.onload = function () {
        canvasContext.drawImage(newImage, (240 - newImage.width) / 2, 10);

        function saveAvatar() {
            var canvas = document.getElementById('avatar-canvas');
            var canvasData = canvas.toDataURL("image/png");
        
            $.ajax({
                url: '../Elements/upload-avatar.php',
                type: 'POST',
                data: { data: canvasData }
            })
        }
        saveAvatar();
        console.log("avatar save attempted");
    };
}

function saveAvatar() {
    var canvas = document.getElementById('avatar-canvas');
    var canvasData = canvas.toDataURL("image/png");

    console.log("this ran");
    $.ajax({
        url: '../Elements/upload-avatar.php',
        type: 'POST',
        data: { data: canvasData },
        success: function (data) {
            console.log("data: " + data);
        },
        failure: function (data) {
            console.log("data: " + data); 
        }
    })
}