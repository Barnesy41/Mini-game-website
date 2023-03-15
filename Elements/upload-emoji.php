<?php 
// Start a session if one has not been started already.
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$url = md5(uniqid(rand(), true));
$upload_dir = "../generated-emoji-images/";

//Set the UUID to a default one if the user is not registered, otherwise get user's UUID
if($_SESSION['avatar'] == ''){
    $avatarUUID = 'UUID_For_Unregistered_Userrnames';
}
else{
    $avatarUUID = substr($_SESSION['avatar'], 0, 32);
}

$img = $_POST['data'];
$img = substr($img,strpos($img,",")+1);
$data = base64_decode($img);
$file = $upload_dir . $avatarUUID . $url . ".png";
$success = file_put_contents($file, $data);

//Calculate the filename & append it to the session variable array
 if (!isset($_SESSION['emojiImages'])) {
     $_SESSION['emojiImages'] = array();
 }
 

?>
