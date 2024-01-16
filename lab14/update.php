<?php
include 'mongo.php';

$db = new db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['ident'])) {
        header("Location: update_form.php?ident=" . $_POST['ident']);
        exit();
    } else {
        echo "Error: Book ID is missing.";
    }
}

$books = $db->select();
?>

<?php include 'header.php'; ?>

<h2>Wybierz książkę do aktualizacji:</h2>
<br>

<?php if (!empty($books)): ?>
    <form method="get" action="update_form.php">
        <ul>
            <?php foreach ($books as $book): ?>
                <li>
                    <strong>Tytuł:</strong> <?= $book['tytul'] ?><br>
                    
                    <?php
                    // Decode the JSON string to an array for authors
                    $authors = json_decode($book['autorzy'], true);
                    $authorsString = implode(', ', $authors ?: [$book['autorzy']]);
                    ?>
                    <strong>Autorzy:</strong> <?= $authorsString ?><br>
                    
                    <strong>Wydawnictwo:</strong> <?= $book['wydawnictwo'] ?><br>
                    <strong>Kategoria:</strong> <?= $book['kategoria'] ?><br>
                    <button type="submit" name="ident" value="<?= $book['_id'] ?>">Aktualizuj</button>
                </li>
            <?php endforeach; ?>
        </ul>
    </form>
<?php else: ?>
    <p>Brak książek do wyświetlenia.</p>
<?php endif; ?>

<?php include 'footer.php'; ?>

