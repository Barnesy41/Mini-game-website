<!DOCTYPE html>

<html>
<head>
    <title>Register</title>
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

<div class="viewport">
    <?php include '../Elements/navbar.php'; ?>

    <div>
        <form method="post" id="registration-form" class="needs-validation" action="../Elements/process-registration.php" novalidate>
            <!--Output username field -->
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" placeholder="JohnSmith14" required>
                <div class="valid-feedback">
                    Looks good!
                </div>
                <div class="invalid-feedback">
                    Invalid username.
                </div>
            </div>
            <!--Output Avatar select field -->
            <!-- TODO: Add avatar selection -->
            <label class="form-label">Avatar</label>
            <select class="form-control selectpicker" aria-label="Default select example" id="avatar-dropdown" name="avatar">
                <option selected>Select Your Avatar</option>
                <option value="../Images/Profile-Avatar-1.png" class="form-control">Avatar 1</option>
                <option value="../Images/Profile-Avatar-2.png" class="form-control">Avatar 2</option>
                <option value="../Images/Profile-Avatar-3.png" class="form-control">Avatar 3</option>
            </select>

            <!-- Output submit button -->
            <div class="col-12" style="text-align:center; padding-top:1.5em">
                <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>

        <script src="../Scripts/validate-registration.js"></script>
    </div>

</div>

</body>
</html>