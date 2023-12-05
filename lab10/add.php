<?php
include 'mongo.php';

$db = new db(); // Tworzenie instancji klasy db

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $document = [
        'imie' => $_POST['imie'],
        'nazwisko' => $_POST['nazwisko'],
        'wydzial' => $_POST['wydzial'],
        'rok' => $_POST['rok'],
    ];

    $db->insert($document); // Używanie metody insert z klasy db
}
?>

<?php include 'header.php'; ?>

<h2>Dodaj nowy dokument</h2>

<form method="post" action="">
    <label for="imie">Imię:</label>
    <input type="text" name="imie" required>

    <label for="nazwisko">Nazwisko:</label>
    <input type="text" name="nazwisko" required>

    <label for="wydzial">Wydział:</label>
    <input type="text" name="wydzial" required>

    <label for="rok">Rok:</label>
    <input type="number" name="rok" required>
    <br>
    <button type="submit">Dodaj dokument</button>
</form>

<?php include 'footer.php'; ?>
