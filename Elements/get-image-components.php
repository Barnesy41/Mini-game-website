<?php

$path    = '../Images';
$files = array_diff(scandir($path), array('.', '..', 'index-background.avif', 'index-background.png'));

$arrToString = '';
for ($i = 0; $i < count($files); $i++){

    //Filters out invalid indexes
    if(isset($files[$i])){
        //append to array in the format of initializing js array
        if ($i == count($files) - 1) {
            $arrToString .= $files[$i];
        } 
        else {
            $arrToString .= $files[$i] . ', ';
        }
    }

}
echo $arrToString;
?>