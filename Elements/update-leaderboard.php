<?php
session_start();

$scoresArr = $_POST["data"];

$fileSrc = "../leaderboard-data.txt";
$file = fopen($fileSrc, 'r');
$roundNumber = 1;
$fileToArr = [];
while(! feof($file)){
    $roundNumberToString = "Round: ".$roundNumber;

    $line = fgets($file);
    $line = strip_tags($line);
    $line = str_replace("\n", '', $line);
    $line = str_replace("\r", '', $line);
    
    $roundNumberToString = strip_tags($roundNumberToString);

    if ("Round: ".($roundNumber+1) === $line){
        $roundNumber++;
        $roundNumberToString = "Round: ".$roundNumber;
    }
    if ($line === "Round: 7"){ //'Round 7' is actually the sum of all round scores
        $userRoundScore = 0;
        for ($i = 0; $i < count($scoresArr); $i++){
            $userRoundScore += $scoresArr[$i];
        }

        $userLeaderboardEntry = $userRoundScore . "," . $_SESSION['username'] . "," . $_SESSION['avatar'];

        //Create a new array for this round, appending the user's score as the first value.
        array_push($fileToArr, array($userLeaderboardEntry));
    }
    else if ($line === $roundNumberToString){
        $userRoundScore = $scoresArr[$roundNumber - 1];
        $userLeaderboardEntry = $userRoundScore . "," . $_SESSION['username'] . "," . $_SESSION['avatar'];

        //Create a new array for this round, appending the user's score as the first value.
        array_push($fileToArr, array($userLeaderboardEntry));
    }
    else{
       array_push($fileToArr[$roundNumber - 1], $line);
    }
}
fclose($file);

//Sort the scores into order
for ($i = 0; $i < count($fileToArr); $i++){
    rsort($fileToArr[$i]);
}

//Create a new leaderboard file
$file = fopen("../leaderboard-data.txt", 'w');

//Write the new data to the leaderboard-data.txt file
for ($i = 0; $i < count($fileToArr); $i++){
    fwrite($file, 'Round: ' . $i + 1 . "\n");

    for ($k=0; $k < count($fileToArr[$i]); $k++){
        if ($i == 6 && $k == count($fileToArr[$i]) - 1){
            fwrite($file, $fileToArr[$i][$k]);
        }
        else{
            fwrite($file, $fileToArr[$i][$k]."\n");
        }
    }
}
fclose($file);

?>
