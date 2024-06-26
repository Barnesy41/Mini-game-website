<!DOCTYPE html>

<html>

<head>
    <title>Home</title>
    <link rel="stylesheet" href="../Style-Sheets/styles.css" type="text/css"> <!-- link to style sheet -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Check if cookies are set -->
    <?php
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }
        if(isset($_COOKIE['username']) && isset($_COOKIE['avatar'])){
            $_SESSION['username'] = $_COOKIE['username'];
            $_SESSION['avatar'] = $_COOKIE['avatar'];
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

    <?php include '../Elements/navbar.php'; ?>
    <div class="viewport" id=main>

        <?php
        if ($_SESSION['registered'] == true){
            echo "<div id='welcome-message'><p>Welcome to Paris!</p>
                <a href='pairs.php'>Click here to play</a></div>";
        }
        else{
        echo "<div id='welcome-message'><p style='font-size: 65px'>You're not using a registered session?</p> 
            <a href='registration.php'>Register now</a></div>";
        }
    ?>


    </div>

</body>

</html>