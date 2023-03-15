<?php
// Start a session if one has not been started already.
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

//Open the text file relating to the leaderboard
$fileSrc = "../leaderboard-data.txt";
$file = fopen($fileSrc, 'r');

/*For each round number, create an array of leaderboard rows, and append this to an array 
  containing the entire leaderboard where all data for a particular round is stored at array
  index = [roundNumber - 1] */
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