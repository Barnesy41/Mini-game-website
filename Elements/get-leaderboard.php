<?php
session_start();

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
    if ($line === $roundNumberToString){
        //Create a new array for this round
        array_push($fileToArr, array());
    }
    else{
       array_push($fileToArr[$roundNumber - 1], $line);
    }
}
fclose($file);

//Put the PHP array into js form
$js_array = json_encode($fileToArr);
echo $js_array;
?>