<!DOCTYPE html>

<html>

<head>
    <title>Register</title>
    <link rel="stylesheet" href="../Style-Sheets/styles.css" type="text/css"> <!-- link to style sheet -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script src="../Scripts/generate-random-avatar.js"></script>

    <?php
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
            $_SESSION['registered'] = false;
        }
        else if($_SESSION['registered'] === true){
            header('Location: '.'../Pages/index.php');
        }
    ?>

    <!-- A script that is used to validate a user's username -->
    <script src="../Scripts/validate-registration.js"></script>
</head>

<html>

<body>

    <?php include '../Elements/navbar.php'; ?>
    <div class="viewport" id="main">


        <!-- div that contains all content regarding username input and avatar creation -->
        <div style="width: 100%; height: 100%;" id="container">
            <form method="GET" id="registration-form" class="needs-validation"
                action="../Elements/process-registration.php" novalidate>

                <!--Output title and the canvas that contains the avatar img -->
                <h3 style="text-align: center; font-weight: bold;">Create Avatar</h3>
                <canvas id="avatar-canvas"></canvas>

                <!-- a div containing all components that can be used to form an avatar -->
                <div class="image-row">
                    <!-- Contains all eye components -->
                    <label class="label">Eyes:&nbsp;</label>
                    <div class="image-group">
                        <a onclick="updateImage('eyes1')" id='eyes'><img src="../Images/eyes1.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('eyes2')" id='eyes'><img src="../Images/eyes2.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('eyes3')" id='eyes'><img src="../Images/eyes3.png"
                                class="rounded img-thumbnail"></a>
                    </div>

                    <!-- Contains all mouth components -->
                    <label class="label">Mouth:&nbsp;</label>
                    <div class="image-group">
                        <a onclick="updateImage('mouth1')" id='mouth'><img src="../Images/mouth1.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('mouth2')" id='mouth'><img src="../Images/mouth2.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('mouth3')" id='mouth'><img src="../Images/mouth3.png"
                                class="rounded img-thumbnail"></a>
                    </div>

                    <!-- Contains all nose components -->
                    <label class="label">Nose:&nbsp;</label>
                    <div class="image-group">
                        <a onclick="updateImage('nose1')" id='nose'><img src="../Images/nose1.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('nose2')" id='nose'><img src="../Images/nose2.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('nose3')" id='nose'><img src="../Images/nose3.png"
                                class="rounded img-thumbnail"></a>
                    </div>

                    <!-- Contains all brows components -->
                    <label class="label">Brows:&nbsp;</label>
                    <div class="image-group">
                        <a onclick="updateImage('brows1')" id='brows'><img src="../Images/brows1.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('brows2')" id='brows'><img src="../Images/brows2.png"
                                class="rounded img-thumbnail"></a>
                        <a onclick="updateImage('brows3')" id='brows'><img src="../Images/brows3.png"
                                class="rounded img-thumbnail"></a>
                    </div>
                </div>

                <!--Output username field & validate-->
                <div class="mb-3">
                    <input type="text" name="username" class="form-control" id="username"
                        placeholder="Enter a Username..." required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Invalid username.
                    </div>
                </div>

                <!-- Output submit button -->
                <div class="col-12" style="text-align:center; padding-top:1.5em">
                    <button class="btn btn-primary" type="submit">Register</button>
                </div>
            </form>
        </div>


    </div>

</body>

</html>