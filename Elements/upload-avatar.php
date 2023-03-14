<?php 
// Start a session if one has not been started already.
  if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
  }
  $url = md5(uniqid(rand(), true));
  $upload_dir = "../generated-images/";
  $imageUrl = $upload_dir.$url.'.png';

  $img = $_POST['data'];
  $img = substr($img,strpos($img,",")+1);
  $data = base64_decode($img);
  $file = $upload_dir . $url . ".png";
  $success = file_put_contents($file, $data);

  $_SESSION['avatar'] = $url . ".png";

  echo $success;
?>