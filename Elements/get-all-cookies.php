<?php
$allCookies = $_SERVER['HTTP_COOKIE'];
echo $allCookies;

$cookieArray = explode('; ', $allCookies);
print_r($cookieArray);
?>