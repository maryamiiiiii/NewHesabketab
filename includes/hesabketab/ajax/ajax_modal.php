<?php
include_once('../../../cfurl.php');

$idClass = isset($_POST['idClass']) ? $_POST['idClass'] : "";
if($idClass != ""){
   echo codingclass($idClass);
}



?>
