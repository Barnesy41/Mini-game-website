<?php
$score = $_POST['score'];
$roundNumber = $_POST['roundNumber'];

//Split the cookie into an array to easily update the score, then convert back to a string.
$scoresArr = explode(',', $_COOKIE['personalBestScores']);
$scoresArr[$roundNumber] = $score;

//Convert array back to string
$scoresArr = implode(',', $scoresArr);

$cookie_name = "personalBestScores";
$cookie_value = $scoresArr;
$exp = time() + 60 * 60 * 24 * 365;
$path = "/";

setcookie(
    $cookie_name,
    $cookie_value,
    $exp,
    $path
);
echo $cookie_value;
?>