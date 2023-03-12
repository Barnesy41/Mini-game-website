<?php
// Start a session if one has not been started already.
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$path    = '../generated-emoji-images';
$files = scandir($path);
$avatarUUID = substr($_SESSION['avatar'], 0, 32);

$arrToString = '';
for ($i = 0; $i < count($files); $i++){

    //Filters out invalid indexes
    if(isset($files[$i]) && $files[$i] != ""){
        //append to array in the format of initializing js array if the avatar UUID matches 
        //the UUID of the current user
        if ($avatarUUID == substr($files[$i], 0, 32)) {
            if ($i == count($files) - 1) {
                $arrToString .= $files[$i];

            } else {
                $arrToString .= $files[$i] . ',';
            }
        }
    }

}
echo $arrToString;
?>