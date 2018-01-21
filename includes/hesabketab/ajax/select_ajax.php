<?php
include_once('../../../cfurl.php');
////////////////////////////////////////////////////////////////////////////////
$maincatvalue = isset($_POST['maincatvalue']) ? $_POST['maincatvalue'] : "";
if($maincatvalue != ""){
   $res= Query("SELECT * FROM nuke_coding WHERE tbl_coding_parent = $maincatvalue");
   $row=array();
//   $row['value'] = array();
//   $row['title']=array();
   while($row_sub = mysqli_fetch_array($res)){
       array_push($row,$row_sub);
   }
   echo json_encode($row);
}

