<!DOCTYPE html>

<html>
<head>
    <title>Pairs</title>
    <link rel="stylesheet" href="../Style Sheets/styles.css" type="text/css"> <!-- link to style sheet -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Check if cookies are set -->
    <?php
        if(isset($_COOKIE['username']) && isset($_COOKIE['avatar'])){
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }
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

    <!-- The js to generate a random emoji image -->
    <script src="../Scripts/generate-emoji-image.js"></script>

    <!-- The js behind the pairs game -->
    <script src="../Scripts/pairs.js"></script>

    <!-- The js behind the timer -->
    <script src="../Scripts/start-round.js"></script>

</head>

<html>
<body>
    <?php include '../Elements/navbar.php' ?>

    <div class="viewport">

        <div class='page-content-container'>
            <h3 id="timer" style="text-align: center">0m 0s</h3>
            <canvas id="hidden-canvas" hidden></canvas> <!-- element used to draw emojis before saving them as img -->
            <div class="pairs-container rounded" id="pairs-container">
                <div class = 'grid-container center' id = 'grid-container'>
                    <button type="button" id="start-game-button" class="btn btn-primary" onclick="pairsMainLoop(6,2); startRound()">Start Game</button> <!-- run all of the generating emojis functions using one function, update a session variable with the results then call the main loop function after. -->
                </div>

            </div>

            <!-- <div class="flip-box">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <img src="../Images/card-background1.png" alt="Paris" style="width:300px;height:200px">
                    </div>
                    <div class="flip-box-back">
                        <h2>Paris</h2>
                        <p>What an amazing city</p>
                    </div>
                </div>
            </div>  -->
        </div>
    </div>

</body>