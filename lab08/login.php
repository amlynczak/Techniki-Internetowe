<?php
include "Register_new.php";
function my_autoloader($class) {
    include  $class . '.php';
}
 
spl_autoload_register('my_autoloader');
 
$user = new Register_new;
 
echo $user->_login() ;
echo "<p><a href='form.php'>Powrot do programu glownego</a></p>";
             
?>
