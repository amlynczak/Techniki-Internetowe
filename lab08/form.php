<?php
include "MessageHandler.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $msgHandler = new MessageHandler;

    $timestamp = time();
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $data = array("timestamp" => $timestamp, "subject" => $subject, "message" => $message);
    $msgHandler->_save_messages($data);

    header("Location: messages.php");
    exit();

}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Zadanie 8 - Formularz danych</title>
</head>
<body>
    <p>
        <ul>
            <li class="menu"><a href='user.php'>Dane użytkownika</a></li>
            <li class="menu"><a href="form.php">Formularz danych</a></li>
            <li class="menu"><a href="messages.php">Lista danych</a></li>
            <li class="menu"><a href='logout.php'>Wyloguj</a></li>
        </ul>
    </p><br><br><br>
    <div class="formularz">
        <form action="#" method="post">
            <div class="form-text">
                <label for="subject">Temat:</label>
                <input type="text" name="subject" required>
            </div>
            <div class="form-text">
                <label for="message">Treść wiadomości:</label>
                <textarea name="message" required></textarea>
            </div>
            <div class="form-text">
                <input type="submit" value="Wyślij">
            </div>
        </form>
    </div>
</body>
</html>