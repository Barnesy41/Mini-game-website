<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="../Style Sheets/styles.css" type="text/css"> <!-- link to style sheet -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <!-- Check if cookies are set -->
    <?php
    if(isset($_cookie['username']) && isset($_cookie['avatar'])){
        session_start();
        $_SESSION['username'] = $_cookie['username'];
        $_SESSION['avatar'] = $_cookie['avatar'];
        $_SESSION['registered'] = true;
    }
    else if(session_status() === PHP_SESSION_ACTIVE) {
        $_SESSION['username'] = '';
        $_SESSION['avatar'] = '';
        $_SESSION['registered'] = false;
    } 
    else{
        session_start();
        $_SESSION['username'] = '';
        $_SESSION['avatar'] = '';
        $_SESSION['registered'] = false;
    } 
    ?>
</head>

<html>
<body>

</body>