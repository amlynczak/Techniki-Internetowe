<?php
include "Register_new.php";
function my_autoloader($class) {
    include  $class . '.php';
}
 
spl_autoload_register('my_autoloader');
 
$reg = new Register_new ;
$reg->_read();
$reg->_write();
echo $reg->_save();
echo "<p><a href='index.php'>Powrot do programu glownego</a></p>";
?>
