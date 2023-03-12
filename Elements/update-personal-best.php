<?php
$score = $_POST['score'];
$roundNumber = $_POST['roundNumber'];

$_COOKIE['personalBestScores'][$roundNumber - 1] = $score;
?>