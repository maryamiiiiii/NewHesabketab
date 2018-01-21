<?php
include_once('../../../cfurl.php');
if($_POST['form_name']!= "" && $_POST['removeId'] != ""){
    echo $removeid = $_POST['removeId'];
    Query("DELETE FROM nuke_".$_POST['form_name']." WHERE ".$_POST['form_name']."_id=$removeid");
}
function serialization($formserialized1,$tablename,$method){
    $formserialized = array_slice($formserialized1,0,count($formserialized1)-2); 
    if($method == '0'){
        $keys = array_keys($formserialized);
        $keysString = implode(',',$keys);
        $values = array_values($formserialized);
        foreach($values as $value){
            
            if(is_array($value)){
                $valuesString .= "'" .implode(',', $value). "',";
            }
            else{
                $valuesString .= "'" . $value . "',";
            }
        }
        $valuesString2  = substr($valuesString,0,strlen($valuesString)-1);
//        return "INSERT INTO nuke_".$tablename."(".$keysString.")VALUES(".$valuesString2.")";
        $lastid = Lastid("INSERT INTO nuke_".$tablename."(".$keysString.")VALUES(".$valuesString2.")");
        return $lastid;
    }else if($method == '1'){
        $keys = array_keys($formserialized);
        $values = array_values($formserialized);
        $query = "UPDATE nuke_".$tablename." SET ";
        foreach($formserialized as $keys=>$values){
            if(substr($keys,0,3)=="up_"){
                $condition = $keys;
                $conditionvalue = $values;
            }else{  
                if(is_array($values)){
                    $values = implode(',',$values);
                    "$keys = '$values', ";
                }
                $query .= "$keys = '$values', "; 
            }
            
        }
        $querywithoutcomma = substr($query,0,strlen($query)-2);
        $condition_cut = substr($condition,3);
        $querywithoutcomma .= " WHERE $condition_cut = $conditionvalue";
        //return $querywithoutcomma;
        Query($querywithoutcomma);
        return 'updated'; 
    }
}
if($_POST['formname']){
$id = $_POST;
//print_r($_POST);
$formname= $_POST['formname'];
$methodname= $_POST['methodname'];
print_r(serialization($id,$formname,$methodname));
}

