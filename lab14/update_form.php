<?php
include 'mongo.php';

$db = new db();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['ident']) || $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['ident'])) {
    $bookId = $_GET['ident'];
    $book = $db->getBookById($bookId);

    if (!$book) {
        echo 'Error: Book not found.';
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $updatedBook = [
            'tytul' => $_POST['tytul'],
            'autorzy' => json_encode(explode(', ', $_POST['autorzy'])),
            'wydawnictwo' => $_POST['wydawnictwo'],
            'kategoria' => $_POST['kategoria'],
        ];

        $result = $db->update($bookId, $updatedBook, true);

        if ($result > 0) {
            echo "Update successful!";
        } else {
            echo "Update failed.";
        }
    }
} else {
    echo 'Error: Book ID is missing.';
    exit();
}
?>

<?php include 'header.php'; ?>

<h2>Aktualizuj książkę</h2>

<form method="post" action="">
    <label for="tytul">Tytuł:</label>
    <input type="text" name="tytul" value="<?= $book['tytul'] ?>" required>

    <label for="autorzy">Autorzy (oddzielone przecinkiem i spacją):</label>
    <input type="text" name="autorzy" required>

    <label for="wydawnictwo">Wydawnictwo:</label>
    <select name="wydawnictwo" required>
        <option value="wydawnictwo1">Wydawnictwo 1</option>
        <option value="wydawnictwo2">Wydawnictwo 2</option>
        <option value="wydawnictwo3">Wydawnictwo 3</option>
    </select>

    <label for="kategoria">kategoria:</label>
    <select name="kategoria" required>
        <option value="Fantasy">Fantasy</option>
        <option value="Kuchnia">Kuchnia</option>
        <option value="Biografie">Biografie</option>
    </select>

    <br>
    <button type="submit">Aktualizuj Książkę</button>
</form>

<?php include 'footer.php'; ?>
