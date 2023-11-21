<?php
include_once "Register_new.php";
function my_autoloader($class) {
    include  $class . '.php';
}
 
spl_autoload_register('my_autoloader');
 
$user = new Register_new;
 
echo $user->_logout() ;
echo "<p><a href='index.php'>Powrot do programu glownego</a></p>";
 
?>