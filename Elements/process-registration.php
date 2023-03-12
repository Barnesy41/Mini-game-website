<?php
header('Location: '.'../Pages/index.php');

// Start a session if one has not been started already.
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

// Set session variables
$username = $_GET['username'];
$_SESSION['username'] = $username;
$_SESSION['registered'] = true;


//Commoon cookie values
$exp = time() + 60 * 60 * 24 * 365;
$path = "/";

//Set avatar cookie
$avatarID = $_SESSION['avatar'];
$_SESSION['avatarUUID'] = substr($_SESSION['avatar'], 0, 32);
$cookie_name = "avatar";
$cookie_value = $avatarID;

setcookie(
    $cookie_name,
    $cookie_value,
    $exp,
    $path
);

//Set username cookie
$cookie_name = "username";
$cookie_value = $username;

setcookie(
    $cookie_name,
    $cookie_value,
    $exp,
    $path
);

//initialize previousRoundScore cookie
// $cookie_name = "previousGameScore";
// $cookie_value = "0, 0, 0, 0, 0, 0";

// setcookie(
//     $cookie_name,
//     $cookie_value,
//     $exp,
//     $path
// );

?>