<?php
//header('Location: '.'../Pages/index.php');
if (isset($_SESSION['avatar'])) {
    echo "set";
}else{
    echo "not set" ;
}

// Start a session if one has not been started already.
if(!session_status() === PHP_SESSION_ACTIVE) {
    session_start();
} 

// Set session variables
$_SESSION['username'] = $_POST['username'];
$_SESSION['registered'] = true;


//Set username cookie
$cookie_name = "username";
$cookie_value = $_POST['username'];
$exp = 60 * 60 * 24 * 30;
$path = "/";

setcookie(
    $cookie_name,
    $cookie_value,
    time() + $exp,
    $path
);



//Set avatar cookie
$cookie_name = "avatar";
$cookie_value = $_SESSION['avatar'];
$exp = 60 * 60 * 24 * 30;

setcookie(
    $cookie_name,
    $cookie_value,
    time() + $exp,
    $path
);

?>