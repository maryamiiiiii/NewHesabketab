<?php
include_once('../../../cfurl.php');
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//validate whether paid or not
$nationalcode = isset($_POST['nationalcode']) ? $_POST['nationalcode'] : "";
if($nationalcode!=""){
    $res=Query('SELECT * FROM nuke_booksellers_person_offer WHERE codemeli="'.$_POST['nationalcode'].'"');
    $row = mysqli_fetch_array($res);
    $sumdiscountprice =100000;
    if ( $sumdiscountprice  >= 200000)
    {
      echo 'false';

    }else{
        $row_sumdiscountprice['row']=$row;
        $row_sumdiscountprice['sumdiscountprice']=$sumdiscountprice;
        echo json_encode($row_sumdiscountprice);
    }

}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//search on database based on ISBN
$isbn = isset($_POST['isbn']) ? $_POST['isbn'] : "";
if($isbn!=""){
   $res=Query('SELECT * FROM nuke_booksellers_booklist WHERE isbn="'.$isbn.'"');
   $row = mysqli_fetch_array($res);
   echo json_encode($row);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
$myTableArray = isset($_POST['myTableArray']) ? $_POST['myTableArray'] : "";
if($myTableArray!=""){
    $data = explode(',',$myTableArray);
    var_dump($data);
    $isbn = $data[1];
    $bookname=$data[2];
    $price=$data[3];
    $value=$data[4];
    $totalprice=$data[5];
    $discountshop=$data[6];
    $discount = $data[7];
    $amount = $data[8];
    $nationalcode=$data[10];
    $family = $data[11];
    $mobile=$data[12];
    $sumtotalprice = $data[14];
    $sumdiscountshop = $data[15];
    $sumdiscount = $data[16];
    $sumamount=$data[17];
}
//print_r($data);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
$mobile=isset($_POST['mobile']) ? $_POST['mobile'] : "";
if($mobile!=""){
//    $res=Query('SELECT ');
    $countmoblie=4;
    if($countmoblie > 3){
        echo 'null';
    }
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
$total_cost=isset($_POST['total_cost']) ? $_POST['total_cost'] : "";
$num = isset($_POST['num']) ? $_POST['num'] : "";
$quantity=isset($_POST['quantity']) ? $_POST['quantity'] :"";
$checkbox  = isset($_POST['checkbox']) ? $_POST['checkbox'] : "";
$message = isset($_POST['message']) ? $_POST['message'] : "";
if($total_cost!="" && $num!="" &&  $quantity!="" &&  $total_cost!="" && $checkbox!=""){
    Query('INSERT INTO smspanel(sender,number,smstext,smscost,recivers)VALUES(1,"'.$num.'","'.$message.'","'.$total_cost.'","'.$checkbox.'")');
    echo 'success';
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//print_r($_POST);

$f_lname=isset($_POST['f_lname']) ? $_POST['f_lname'] :"";
$startdate = isset($_POST['startdate']) ? $_POST['startdate'] :"";
$enddate = isset($_POST['enddate']) ? $_POST['enddate'] : "";
$choose = isset($_POST['choose']) ? $_POST['choose'] : "";
//print_r($_POST);
$pagenumber = isset($_POST['pagenumber']) ? $_POST['pagenumber'] : 1;
if($f_lname != ""){
    $limit =10;
    $start = ($pagenumber-1) * $limit;
    function f_lnameFunction($f_lname,$startdate,$enddate,$choose){
        $report_query = 'SELECT * FROM nuke_booksellers_booklist WHERE ';
    //    return $report_query;
        if($f_lname==""){
            $query = $report_query." 1 "; 
        }else{
            $query = $report_query.' bookname LIKE "%'.$f_lname.'%"';
        }
        return chooseFunction($query,$startdate,$enddate,$choose);
    }

    function chooseFunction($query,$startdate,$enddate,$choose){
        if($choose ==""){
            $query = $query;
        }else{
            $query = $query.' AND salecount="'.$choose.'"';
        }
        return startdate($query,$startdate,$enddate);
    }
    function startdate($query,$startdate,$enddate){
        if($startdate == "" && $enddate == ""){
            $query = $query;
        }elseif($startdate !="" && $enddate==""){
            $query .= ' selldate= "'.$startdate.'"';
        }elseif($startdate =="" && $enddate !=""){
            $query .= ' selldate= "'.$enddate.'"';
        }else{
            $query .= ' selldate BETWEEN "'.$startdate.'" AND "'.$enddate.'"';
        }
        return $query;
    }
    $query = f_lnameFunction($f_lname,$startdate,$enddate,$choose);
    $query .= " LIMIT $start,$limit";
    $res = Query($query);
    //echo mysqli_num_rows($res);
    $row2 = array();
    while($row=mysqli_fetch_array($res)){
        array_push($row2,$row);
    }
    echo json_encode($row2);
}

print_r($_POST);



