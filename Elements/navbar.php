<head>
    <link rel="stylesheet" href="../Style Sheets/styles.css" type="text/css"> <!-- link to style sheet -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<div class="toolbar">
    <div id="left">
      <a href="index.php" name="home" id="left">Home</a>
    </div>

    <div id="right">
        <a href="pairs.php" name="memory" id="right">Play Pairs</a>
      <?php
      if ($_SESSION['registered'] === false){
        echo '<a id="right" href="registration.php" name="register">Register</a>';
      }
      else{
        echo '<a id="right" href="leaderboard.php" name="leaderboard">Leaderboard</a>';
        echo '<a id="right" href="leaderboard.php" name="leaderboard"><img class="avatar" src="../generated-images/',$_SESSION['avatar'],'"></a>';
      }
      ?>
    </div>

</div>