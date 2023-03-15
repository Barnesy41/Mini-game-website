<?php
// Start a session if one has not been started already.
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

//Retrieve all files from the given path
$path    = '../generated-emoji-images';
$files = scandir($path);

//Set the UUID to a default UUID if the user is not registered, otherwise get user's UUID
if($_SESSION['avatar'] == ''){
    $avatarUUID = 'UUID_For_Unregistered_Userrnames';
}
else{
    $avatarUUID = substr($_SESSION['avatar'], 0, 32);
}

//Loop through each file in the given directory, checking if it begins with the current user's UUID. If it does, append it to an array
$arrToString = '';
for ($i = 0; $i < count($files); $i++){

    //Filter out invalid indexes
    if(isset($files[$i]) && $files[$i] != ""){
        //append to array in the format of initializing js array if the avatar UUID matches 
        if ($avatarUUID == substr($files[$i], 0, 32)) {
            $arrToString .= $files[$i] . ',';
        }
    }

}

//Remove the final appended comma
$arrToString = substr($arrToString, 0, strlen($arrToString) - 1);

//Output the resulting string to the ajax request
echo $arrToString;
?>