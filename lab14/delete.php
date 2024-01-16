<?php
include 'mongo.php';

$db = new db(); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    $idToDelete = $_POST['delete'];
    $db->delete($idToDelete, true);
}
?>

<?php include 'header.php'; ?>

<h2>Usuń Książki z bazy danych</h2>
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
        echo '<form method="post" action="">
                  <input type="hidden" name="delete" value="' . $book['_id'] . '">
                  <button type="submit">Usuń książkę</button>
              </form>';
        echo '</li>';
    }
    echo '</ul>';
} else {
    echo '<p>Brak książek do wyświetlenia.</p>';
}

include 'footer.php';
?>
