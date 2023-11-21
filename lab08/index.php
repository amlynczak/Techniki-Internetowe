<?php
include "Register_new.php";
function my_autoloader($class){
    include $class.'.php';
}

spl_autoload_register('my_autoloader');
$user = new Register_new;
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Zadanie 8</title>
</head>
<body>
    <p>
        <ul>
            <?php
                if(!$user->_is_logged()){
                    echo "<li class=\"menu\"><a href='rejestracja.html'>Rejestracja w serwisie</a></li>";
                    echo "<li class=\"menu\"><a href='logowanie.html'>Logowanie do serwisu</a></li>";
                } else {
                    echo "<li class=\"menu\"><a href='user.php'>Dane użytkownika</a></li>";
                    echo "<li class=\"menu\"><a href='form.php'>Formularz danych</a></li>";
                    echo "<li class=\"menu\"><a href='messages.php'>Lista danych</a></li>";
                    echo "<li class=\"menu\"><a href='logout.php'>Wyloguj</a></li>";
                }
            ?>
        </ul>
    </p><br><br>
</body>
</html>
