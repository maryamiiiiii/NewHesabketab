<?php
include_once('../../../cfurl.php');
$target_dir = "upload/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$extract = explode('.',$_FILES["file"]["name"]);
$name = f.'_'.time();
$ext = $extract[1];
$file_name=$name.'.'.$ext;
//$directory 
$fileList = json_decode($_POST['fileList']);
for($i = 0; $i < sizeof($fileList); $i++)
{
    unlink(basename($fileList[$i]));
}
$isbn=$_POST['isbn'];
$form_name=$_POST['form_name'];
//$deleteid = isset($_POST['deleteid']) ? $_POST['deleteid'] : "";
//if($deleteid !=""){
//    Query("DELETE * FROM nuke_files WHERE ");
//}
if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$file_name)) {
    $status = 1;
    Query("INSERT INTO nuke_files(formname,isbn,filename)VALUES('".$form_name."','".$isbn."','".$file_name."')");
}
