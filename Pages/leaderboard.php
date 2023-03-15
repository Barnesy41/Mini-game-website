<!DOCTYPE html>
<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="../Style-Sheets/styles.css" type="text/css"> <!-- link to style sheet -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
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

    <!-- The js behind the leaderboard -->
    <script src="../Scripts/leaderboard.js"></script>

</head>

<html>
<body>
    <?php include '../Elements/navbar.php' ?>
    <div class="viewport" id="main">
        <div class="horizontally-centered-container">
            <button type="button" class="btn btn-primary" onclick="outputLeaderboard(1, getLeaderboardAsArr());">Round 1</button>
            <button type="button" class="btn btn-secondary" onclick="outputLeaderboard(2, getLeaderboardAsArr());">Round 2</button>
            <button type="button" class="btn btn-success" onclick="outputLeaderboard(3, getLeaderboardAsArr());">Round 3</button>
            <button type="button" class="btn btn-danger" onclick="outputLeaderboard(4, getLeaderboardAsArr());">Round 4</button>
            <button type="button" class="btn btn-warning" onclick="outputLeaderboard(5, getLeaderboardAsArr());">Round 5</button>
            <button type="button" class="btn btn-info" onclick="outputLeaderboard(6, getLeaderboardAsArr());">Round 6</button>
            <button type="button" class="btn btn-dark" onclick="outputLeaderboard(7, getLeaderboardAsArr());">Total Score</button>
        </div>

        <div id="leaderboard">
            <table id='leaderboard-table'>
                <caption>Total Score Leaderboard</caption>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>

                <!-- contain all other rows in the table -->
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</body>

<script>
    outputLeaderboard(7, getLeaderboardAsArr());
</script>