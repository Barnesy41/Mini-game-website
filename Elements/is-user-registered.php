<?php
session_start();

if ($_SESSION['registered'] == ''){
    echo false;
}
else{
    echo true;
}
?>