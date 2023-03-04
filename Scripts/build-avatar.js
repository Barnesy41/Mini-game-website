function generatePredefinedAvatar() {
    //have the 4 inputs stored from current or previous session then generate the avatar.
    var canvas = document.getElementById('avatar-canvas');
    let canvasContext = canvas.getContext('2d');

    let arrOfAvatarImages = $_SESSION['avatar']
    
    for (var i = 0; i < arrOfAvatarImages.length; i++){
        let image = arrOfAvatarImages[i];
        image.onload = function () {
            generateAvatar();
        }
    }

    function generateAvatar() {
        var canvas = document.getElementById('avatar-canvas');
        var canvasContext = canvas.getContext('2d');

        canvasContext.drawImage(avatarEyes, (canvas.width - image.width) / 2, 10);
    }
}