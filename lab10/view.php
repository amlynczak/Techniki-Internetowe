<?php
include 'mongo.php';

$db = new db();
?>

<?php include 'header.php'; ?>

<h2>Dokumenty zapisane w bazie:</h2>
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
        echo '</li>';
    }
    echo '</ul>';
} else {
    echo '<p>Brak dokumentów do wyświetlenia.</p>';
}

include 'footer.php';
?>
