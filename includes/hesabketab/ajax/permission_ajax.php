<?php
include_once('../../cfurl.php');
$modulename = isset($_POST['modulename']) ? $_POST['modulename'] : "";
$username1 = isset($_POST['username']) ? $_POST['username'] : "";
//echo "SELECT * FROM nuke_permission WHERE username='".$username1."' AND formname='".$modulename."'";
$res = Query("SELECT * FROM nuke_permission WHERE username='".$username1."' AND formname='".$modulename."'");
$row = mysqli_fetch_array($res);
echo json_encode($row);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

