<?php
include 'mongo.php';

$db = new db(); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    $idToDelete = $_POST['delete'];
    $db->delete($idToDelete, true);
}
?>

<?php include 'header.php'; ?>

<h2>Usuń dokumenty</h2>
<br>

<?php
$documents = $db->select();

if (!empty($documents)) {
    echo '<ul>';
    foreach ($documents as $document) {
        echo '<li>';
        echo '<strong>Imię:</strong> ' . $document['imie'] . '<br>';
        echo '<strong>Nazwisko:</strong> ' . $document['nazwisko'] . '<br>';
        echo '<strong>Wydział:</strong> ' . $document['wydzial'] . '<br>';
        echo '<strong>Rok:</strong> ' . $document['rok'] . '<br>';
        echo '<form method="post" action="">
                  <input type="hidden" name="delete" value="' . $document['_id'] . '">
                  <button type="submit">Usuń dokument</button>
              </form>';
        echo '</li>';
    }
    echo '</ul>';
} else {
    echo '<p>Brak dokumentów do wyświetlenia.</p>';
}

include 'footer.php';
?>
