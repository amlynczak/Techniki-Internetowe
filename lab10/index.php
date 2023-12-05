<?php
include 'mongo.php';

$db = new db(); // Tworzenie instancji klasy db

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    $idToDelete = $_POST['delete'];
    $db->delete($idToDelete, false);
}

?>

<?php include 'header.php'; ?>

<?php include 'footer.php'; ?>
