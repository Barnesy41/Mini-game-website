<?php
// Start a session if one has not been started already.
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$path    = '../generated-emoji-images';
$files = scandir($path);
$avatarUUID = substr($_SESSION['avatar'], 0, 32);

array_map('unlink', glob("../generated-emoji-images/".$avatarUUID."*.png"));
?>