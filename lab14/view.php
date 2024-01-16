<?php
include 'mongo.php';

$db = new db();
?>

<?php include 'header.php'; ?>

<h2>Książki dostępne w naszej bazie:</h2>
<br>

<?php
$books = $db->select();

if (!empty($books)) {
    echo '<ul>';
    foreach ($books as $book) {
        echo '<li>';
        echo '<strong>Tytuł:</strong> ' . $book['tytul'] . '<br>';
        
        $authors = json_decode($book['autorzy'], true);
        $authors = $authors ? $authors : [$book['autorzy']];
        echo '<strong>Autorzy:</strong> ' . implode(', ', $authors) . '<br>';
        
        echo '<strong>Wydawnictwo:</strong> ' . $book['wydawnictwo'] . '<br>';
        echo '<strong>Kategoria:</strong> ' . $book['kategoria'] . '<br>';
        echo '</li>';
    }
    echo '</ul>';
} else {
    echo '<p>Brak książek do wyświetlenia.</p>';
}

include 'footer.php';
?>
