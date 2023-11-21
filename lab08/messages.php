<?php
include 'MessageHandler.php';

$messageHandler = new MessageHandler();
$messages = $messageHandler->_read_messages();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Zadanie 8 - Lista danych</title>
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
    <h1>Zapisane wiadomości</h1>
    <?php
    if (!empty($messages)) {
        echo '<table margin=10px>';
        echo '<tr><th>Czas</th><th>Temat</th><th>Treść</th></tr>';
        foreach ($messages as $message) {
            echo '<tr>';
            echo '<td>' . date("Y-m-d H:i:s", $message['timestamp']) . '</td>';
            echo '<td>' . $message['subject'] . '</td>';
            echo '<td>' . $message['message'] . '</td>';
            echo '</tr>';
        }
        echo '</table>';
    } else {
        echo '<p>Brak wiadomości.</p>';
    }
    ?>
</body>
</html>
