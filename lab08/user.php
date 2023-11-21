<?php
include "Register_new.php";

function my_autoloader($class) {
    include  $class . '.php';
}
 
spl_autoload_register('my_autoloader');
$user = new Register_new;
 
if ( $user->_is_logged() ) { 
   $user->_read_user();
   echo $user->_write();
   echo "<p><a href='index.php'>Powrot do programu glownego</a></p>";
}
?>